import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import TradableCars from './tradableCars';

const TradableCarsSchema = TradableCars.simpleSchema();
Meteor.methods({
    
    'tradableCars.insert'(tradableCars) {

        tradableCars.createdAt = new Date();
        tradableCars.updatedAt = new Date();
        //const validationContext = TradableCarsSchema.newContext();
        //validationContext.validate(tradableCars);
        //if(validationContext.isValid()){
            TradableCars.insert(tradableCars);
        //}

       
    },
    'tradableCars.remove'(id){
        TradableCars.remove(id);
    }
});
 