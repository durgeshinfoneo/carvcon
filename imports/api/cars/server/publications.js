import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Cars from '../cars';
import Makers from '../../makers/makers';
import CarModels from '../../carmodels/carmodels';
import CarClasses from '../../carclasses/carclasses';
import CarYears from '../../caryears/caryears';

Meteor.publish('cars.list', () => [
  Cars.find({}, { sort: { updatedAt: -1 } }),
  Makers.find({ source: '28car.com' }),
  CarModels.find({}),
  CarClasses.find({}),
  CarYears.find({}),
]);

Meteor.publish('cars.single', (carId) => {
  check(carId, String);
  return Cars.find({ _id: carId });
});
