import { Meteor } from 'meteor/meteor';
// import SimpleSchema from 'simpl-schema';

import CarModels from './carmodels';
import { importCarModels } from '../../helpers/importCsv';

const CarModelSchema = CarModels.simpleSchema();

Meteor.methods({
  'carmodels.insert'(carmodel) {
    // check(carmodel, CarModelSchema);
    const validationContext = CarModelSchema.newContext();
    validationContext.validate(carmodel);
    if (validationContext.isValid()) {
      CarModels.insert(carmodel);
    }
    // CarModels.insert(carmodel);
  },

  'carmodels.import'() {
    importCarModels();
  },

  'carmodels.updatePhotos'(id, photos) {
    const validationContext = CarModelSchema.newContext();
    validationContext.validate({ photos }, { keys: ['photos'] });
    if (validationContext.isValid()) {
      CarModels.update(id, { $set: { photos } });
    }
  },
});
