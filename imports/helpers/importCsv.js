import { Meteor } from 'meteor/meteor';
import csv from 'fast-csv';
import fs from 'fs';
import path from 'path';

import Makers from '../api/makers/makers';
import CarClasses from '../api/carclasses/carclasses';
import CarModels from '../api/carmodels/carmodels';

export const importMaker = () => {
  const stream = fs.createReadStream(`${process.cwd()}/../web.browser/app/data/car-maker-list.csv`, 'utf8');
  const headers = ['serverKey', 'chineseName', 'englishName'];
  let i = 0;
  const options = {
    headers,
    delimiter: ',',
  };
  const csvStream = csv(options)
    .on('data', Meteor.bindEnvironment(function(data) {
      console.log('csv data: ', data);
      if (i !== 0) {
        const maker = {
          serverKey: parseInt(data.serverKey, 10),
          chineseName: data.chineseName,
          englishName: data.englishName,
          source: '28car.com',
        };
        const MakerSchema = Makers.simpleSchema();
        // check(maker, MakerSchema);
        const validationContext = MakerSchema.newContext();
        validationContext.validate(maker);
        console.log('validationContext: ', validationContext.isValid());
        if (validationContext.isValid()) {
          Makers.upsert({ serverKey: maker.serverKey }, {
            $set: {
              chineseName: data.chineseName,
              englishName: data.englishName,
              source: '28car.com',
            },
          });
        }
      }
      i = 1;
    }))
    .on('end', Meteor.bindEnvironment(function() {
      // console.log('done');
    }));
  stream.pipe(csvStream);
  // console.log('The END: ', process.cwd());
};

export const importClassCar = () => {
  const stream = fs.createReadStream(`${process.cwd()}/../web.browser/app/data/all-model-list.csv`, 'utf8');
  const headers = ['maker', 'id', 'makerServerKey', 'picture', 'chineseMaker', 'classCar',
    'modelCar', 'modelId', 'price', 'blank', 'englishName', 'serverKey', 'chineseName'];
  const options = {
    headers,
    delimiter: ',',
  };
  let i = 0;
  const results = [];
  const csvStream = csv(options)
    .on('data', Meteor.bindEnvironment(function(data) {
      results.push(data);
    }))
    .on('end', Meteor.bindEnvironment(function() {
      // console.log('done');
      for (i = 1; i < results.length; i++) {
        const data = results[i];
        console.log('csv data: ', data);
        const makerModel = Makers.findOne({
          serverKey: parseInt(data.makerServerKey.trim(), 10),
        });
        if (makerModel) {
          const classcarObj = {
            name: data.classCar.trim(),
            maker: {
              id: data.makerServerKey,
              chineseName: makerModel.chineseName,
              englishName: makerModel.englishName,
            },
          };
          const CarClassSchema = CarClasses.simpleSchema();
          const validationContext = CarClassSchema.newContext();
          validationContext.validate(classcarObj);
          if (validationContext.isValid()) {
            const CarClassesModel = CarClasses.find({
              name: classcarObj.name,
              'maker.id': data.makerServerKey,
            }).fetch();
              // console.log("CarClassesModel: ", CarClassesModel);
            if (CarClassesModel.length === 0) {
              //   console.log("CarClassesModel: not exist");
              CarClasses.insert(classcarObj);
            }
          } else {
            console.log(validationContext.validationErrors());
          }
        }
      }
    }));
  stream.pipe(csvStream);
  console.log('The END: ', process.cwd());
};

export const importCarModels = () => {
  const stream = fs.createReadStream(`${process.cwd()}/../web.browser/app/data/all-model-list.csv`, 'utf8');
  const headers = ['maker', 'id', 'makerServerKey', 'picture', 'chineseMaker', 'classCar',
    'modelCar', 'modelId', 'price', 'blank', 'englishName', 'serverKey', 'chineseName'];
  const options = {
    headers,
    delimiter: ',',
  };
  let i = 1;
  let referenceNumber = 1001;
  const results = [];
  const csvStream = csv(options)
    .on('data', Meteor.bindEnvironment(function(data) {
      console.log('csv data: ', data);
      results.push(data);
    }))
    .on('end', Meteor.bindEnvironment(function() {
      console.log('done');
      for (i = 1; i < results.length; i++) {
        const data = results[i];
        const carClassesModel = CarClasses.findOne({
          name: data.classCar.trim(),
          'maker.id': data.makerServerKey,
        });
        if (carClassesModel) {
          const name = data.modelCar.toUpperCase().trim();
          const englishName = carClassesModel.maker.englishName;
          const chineseName = carClassesModel.maker.chineseName;
          const carModelName = carClassesModel.name;
          const fullname = `${englishName} ${carClassesModel.name} ${name}`;
          const carmodel = {
            name,
            fullname,
            carclass: {
              id: carClassesModel._id,
              name: carModelName,
            },
            maker: {
              id: carClassesModel.maker.id,
              englishName,
              chineseName,
            },
            price: data.price.trim() !== '' ? Number(data.price.replace(/[^0-9.]+/g, '')) : 0,
            referenceNumberSell: `SC00${referenceNumber}`,
            referenceNumberBuy: `BC00${referenceNumber}`,
          };

          const imageUrl = `/models/${data.picture}.jpg`;
          const absolutePath = path.join(process.cwd(), '/../web.browser/app', imageUrl);
          console.log(`absolutePath: ${absolutePath}`);
          if (fs.existsSync(absolutePath)) {
            console.log('existed');
            carmodel.image = {
              url: `/models/${data.picture}.jpg`,
              feature: false,
            };
          }
          // check(carmodel, CarModelSchema);
          const CarModelSchema = CarModels.simpleSchema();
          const validationContext = CarModelSchema.newContext();
          validationContext.validate(carmodel);
          if (validationContext.isValid()) {
            CarModels.upsert({
              name,
              'carclass.id': carClassesModel._id,
            },
            carmodel,
            {
              bypassCollection2: true, // https://github.com/aldeed/meteor-simple-schema/issues/175
            });
          } else {
            console.log(validationContext.validationErrors());
          }
        }
        referenceNumber += 1;
      }
    }));
  stream.pipe(csvStream);
  console.log('The END: ', process.cwd());
};

