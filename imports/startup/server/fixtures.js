import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import PageActions from '../../api/pageactions/pageactions';
import CarYears from '../../api/caryears/caryears';
import TradeRequestConfig from '../../api/tradeRequestConfig/tradeRequestConfig';


const yearsJSON = [
  {
    name: '2020',
    value: '23',
  },
  {
    name: '2019',
    value: '24',
  },
  {
    name: '2018',
    value: '25',
  },
  {
    name: '2017',
    value: '26',
  },
  {
    name: '2016',
    value: '27',
  },
  {
    name: '2015',
    value: '28',
  },
  {
    name: '2014',
    value: '29',
  },
  {
    name: '2013',
    value: '30',
  },
  {
    name: '2012',
    value: '31',
  },
  {
    name: '2011',
    value: '32',
  },
  {
    name: '2010',
    value: '33',
  },
  {
    name: '2009',
    value: '34',
  },
  {
    name: '2008',
    value: '35',
  },
  {
    name: '2007',
    value: '36',
  },
  {
    name: '2006',
    value: '37',
  },
  {
    name: '2005',
    value: '38',
  },
  {
    name: '2004',
    value: '39',
  },
  {
    name: '2003',
    value: '40',
  },
  {
    name: '2002',
    value: '41',
  },
  {
    name: '2001',
    value: '42',
  },
  {
    name: '2000',
    value: '43',
  },
];


// if(!Meteor.isProduction){
const pageaction = {
  searchCount: 0,
  proxyIndex: 0,
};

if (PageActions.find().count() === 0) {
  PageActions.insert(pageaction);
}
/*
console.log('======CarYears.find().count() 1======', CarYears.find().count());
if (CarYears.find().count() === 8 ){
  CarYears.remove({});
}
*/

console.log('======CarYears.find().count() 2======', CarYears.find().count());
if (CarYears.find().count() === 0 ) { // === 0 < 21 ) {
console.log('======CarYears.find().count() 3======', CarYears.find().count());
  for (let i = 0; i < yearsJSON.length; i++) {
   console.log('======yearsJSON[i].value  ======', yearsJSON[i].value);

   console.log('======yearsJSON[i].name  ======', yearsJSON[i].name);

  
   console.log('======CarYears.find().count() B======', CarYears.find().count());
    CarYears.insert({
      name: yearsJSON[i].name,
      car28Value: yearsJSON[i].value,
      carComValue: yearsJSON[i].name,
    });
   
  }
}  
//console.log('======CarYears.find().count() 4======', CarYears.find().count());



const account = Accounts.findUserByUsername('admin');
if (!account) {
  const newAccount = Accounts.createUser({
    email: 'admin@carvcon.com',
    username: 'admin',
    password: 'admin@123',
    profile: {
      firstName: 'Admin',
      lastName: 'Admin',
      avatar: '/images/profiles/generic_avatar.png',
      age: '',
      phone: '',
    },
  });
  console.log('======new Account======', newAccount);
  Roles.addUsersToRoles(newAccount, ['admin']);
}

const tencheng = Accounts.findUserByUsername('tencheng929');
if (!tencheng) {
  const newAccount = Accounts.createUser({
    email: 'tencheng929@gmail.com',
    username: 'tencheng929',
    password: '123456',
    profile: {
      firstName: 'Ten',
      lastName: 'Cheng',
      avatar: '/images/profiles/generic_avatar.png',
      age: '',
      phone: '',
    },
  });
  console.log('======new Account======', newAccount);
  Roles.addUsersToRoles(newAccount, ['admin']);
}

const tradeRequestConfig = TradeRequestConfig.findOne();
if (!tradeRequestConfig) {
  TradeRequestConfig.insert({
    customerSupportEmail: 'Customer Support <no-reply@freegrapik.com>',
    noReplyEmail: 'No Replay <no-reply@freegrapik.com>',
    adminEmail: 'minhuyendo@gmail.com',
    acceptancePerDay: 10,
    tradeRequestLimit: 5,
    acceptanceCancellationLimit: 3,
  });
}

