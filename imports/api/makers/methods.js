import { Meteor } from 'meteor/meteor';
import Makers from './makers';
import CarComCrawler from '../../lib/carcomcrawler';
import { importMaker } from '../../helpers/importCsv';

Meteor.methods({
  'makers.insert'(maker) {
    const MakerSchema = Makers.simpleSchema();
    // check(maker, MakerSchema);
    const validationContext = MakerSchema.newContext();
    validationContext.validate(maker);
    if (validationContext.isValid()) {
      Makers.insert(maker);
    }
  },
  'makers.crawlBrand'() {
    const carComCrawler = new CarComCrawler('https://car.price.com.hk/product/list', 0);
    carComCrawler.getAllBrand();
  },
  'makers.import'() {
    importMaker();
  },
});
