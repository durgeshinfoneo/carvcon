import { Meteor } from 'meteor/meteor';
import CarModels from '../carmodels';
import CarYears from '../../caryears/caryears';
import Makers from '../../makers/makers';
import CarClasses from '../../carclasses/carclasses';


Meteor.publish('carmodels.list', function carModelsPublication(filters = {}, skip = 0, limit = 0) {
  return CarModels.find(filters, { skip, limit });
});

Meteor.publish('carmodels.search', (searchValue, isClassic) => {
  // console.log('==========carmodels.search====searchValue=======: ', searchValue);
  // console.log('==========carmodels.search====isClassic=======: ', isClassic);
  if (isClassic) {
    return [
      Makers.find({ source: '28car.com' }),
      CarModels.find({}),
      CarClasses.find({}),
      CarYears.find({}),
    ];
  }
  if (!searchValue) {
    return [
      CarYears.find({}),
    ];
  }
  return [
    CarModels.find(
      {
        $text: { $search: `"${searchValue}"` },
      },
      {
        fields: {
          score: { $meta: 'textScore' },
        },
        // sort: {
        //   score: { $meta: 'textScore' },
        // },
        sort: {
          'image.url': 1,
        },
      },
    ),
    CarYears.find({}),
  ];
});
