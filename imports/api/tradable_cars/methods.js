import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import TradableCars from './tradable_cars';

const TradableCarsSchema = TradableCars.simpleSchema();
Meteor.methods({

    'tradable_cars.insert'(tradable_cars) {

        tradable_cars.updatedAt = new Date(tradable_cars.updatedAt);
        const validationContext = TradableCarsSchema.newContext();
        validationContext.validate(tradable_cars);
        if(validationContext.isValid()){
            TradableCars.insert(tradable_cars);
        }

       
    },
});
//this is comment
