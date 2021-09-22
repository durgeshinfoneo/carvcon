/* eslint-disable meteor/audit-argument-checks, no-console */
import { Meteor } from 'meteor/meteor';

import CarClasses from './carclasses';
import { importClassCar } from '../../helpers/importCsv';

const CarClassSchema = CarClasses.simpleSchema();

Meteor.methods({
  'carclasses.insert'(classcar) {
    // check(classcar, CarClassSchema);
    const validationContext = CarClassSchema.newContext();
    validationContext.validate(classcar);
    if (validationContext.isValid()) {
      CarClasses.insert(classcar);
    }
  },
  'carclasses.import'() {
    importClassCar();
  },
});
