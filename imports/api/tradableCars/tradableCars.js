import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const TradableCars = new Mongo.Collection('tradable_cars');

const ImageSchema = new SimpleSchema({
    url: {
      type: String,
    },
    feature: {
      type: Boolean,
      optional: true,
    },
  });
const TradableCarsSchema = new SimpleSchema({
  carBrand:{type:String},
  model: {type:String},
  sellingPrice:{type:Number},
  cc:{type:Number},
  year:{type:Number},
  hands:{type:Number},
  transmission:{type:String},
  mainPhoto:{type:String},
  shortDescription:{type:String},
  likes:{type:Number},
  favorite:{type:Boolean,optional:true,defaultValue:false},
 // images:{type:Array,minCount:1},
  //'images.$':{type:ImageSchema},
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  status:{type:String,optional:true, defaultValue:'availableforsale'}
});

TradableCars.attachSchema(TradableCarsSchema);
export default TradableCars;