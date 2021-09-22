import { Meteor } from 'meteor/meteor';
import {TradableCars} from '../tradableCars';


Meteor.publish('listAllTradableCars',function(){
    
    return TradableCars.find({});//,{fields:{carBrand:1,model:1}});
})