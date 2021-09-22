/* eslint-disable import/prefer-default-export */
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import CarYears from './caryears';

export const insert = new ValidatedMethod({
  name: 'caryears.insert',
  validate: new SimpleSchema({
    name: { type: String },
    car18Value: { type: String },
    carComValue: { type: String },
  }).validator(),
  run({ name, car18Value, carComValue }) {
   console.log('===== name, car18Value, carComValue  =====' , name);
	 console.log('===== name, car18Value, carComValue  =====' , car18Value);
	 console.log('===== name, car18Value, carComValue  =====' , carComValue);
    CarYears.insert({
      name,
      car18Value,
      carComValue,
    });
  },
});
