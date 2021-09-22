/* eslint-disable consistent-return */
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Cars from './cars';

const CarSchema = Cars.simpleSchema();
Meteor.methods({
  'cars.insert'(car) {
    // console.log("===============car insert", car);
    const obj = car;
    obj.updatedAt = new Date(car.updatedAt);
    // check(car, CarSchema);
    const validationContext = CarSchema.newContext();
    validationContext.validate(obj);

    // console.log(validationContext.isValid());
    // console.log(validationContext.validationErrors());

    if (validationContext.isValid()) {
      const carModel = Cars.findOne({ numbering: car.numbering });
      if (!carModel) {
        return Cars.insert(car);
      }
      return Cars.update(carModel._id, { $set: { yearsId: car.yearsId, makerId: car.makerId } });
    }
  },
  'cars.remove'(carId) {
    check(carId, String);

    const car = Cars.findOne(carId);

    if (!car) {
      throw new Meteor.Error('car-not-exists',
        'Car not exists');
    }

    Cars.remove(carId);
  },
  'cars.removeFilter'(filter) {
    check(filter, Object);
    // console.log('=======filter======: ', filter);
    Cars.remove(filter);
  },
});
