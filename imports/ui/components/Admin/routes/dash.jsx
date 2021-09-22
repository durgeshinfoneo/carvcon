import RegularForms from '../views/Forms/RegularForms.jsx';
import ExtendedForms from '../views/Forms/ExtendedForms.jsx';
import ValidationForms from '../views/Forms/ValidationForms.jsx';
import Wizard from '../views/Forms/Wizard/Wizard.jsx';
// import SimplePage from '../../../pages/admin/SimplePage';
import TradeRequestConfigPage from '../../../pages/admin/TradeRequestConfigPage';
import UserListPage from '../../../pages/admin/users/UserListPage';
import DealerListPage from '../../../pages/admin/dealers/DealerListPage';
import CustomerListPage from '../../../pages/admin/customers/CustomerListPage';
import UserPage from '../../../pages/admin/users/UserPage';
import CustomerPage from '../../../pages/admin/customers/CustomerPage';
import DealerPage from '../../../pages/admin/dealers/DealerPage';
// import MakerListPage from '../../../pages/admin/makers/MakerList';
// import ClassListPage from '../../../pages/admin/classes/ClassList';
// import ModelListPage from '../../../pages/admin/models/ModelList';
import TradeRequestListPage from '../../../pages/admin/tradeRequests/TradeRequestList';
import TradeRequestPage from '../../../pages/admin/tradeRequests/TradeRequest';

const dashRoutes = [
  {
    path: '/admin/users',
    name: 'Users',
    icon: 'pe-7s-users',
    component: UserListPage,
    exact: true,
  },
  {
    path: '/admin/users/add',
    name: 'Customers',
    icon: 'pe-7s-users',
    component: UserPage,
    hidden: true,
    exact: true,
  },
  {
    path: '/admin/users/:id',
    name: 'Customers',
    icon: 'pe-7s-users',
    component: UserPage,
    hidden: true,
    exact: true,
  },
  // { path: '/admin/makers', name: 'Makers', icon: 'pe-7s-rocket', component: MakerListPage },
  // { pa
  {
    path: '/admin/customers',
    name: 'Customers',
    icon: 'pe-7s-users',
    component: CustomerListPage,
    exact: true,
  },
  {
    path: '/admin/customers/add',
    name: 'Customers',
    icon: 'pe-7s-users',
    component: CustomerPage,
    hidden: true,
    exact: true,
  },
  {
    path: '/admin/customers/:id',
    name: 'Customers',
    icon: 'pe-7s-users',
    component: CustomerPage,
    hidden: true,
    exact: true,
  },
  // { path: '/admin/makers', name: 'Makers', icon: 'pe-7s-rocket', component: MakerListPage },
  // { path: '/admin/classes', name: 'Class', icon: 'pe-7s-target', component: ClassListPage },
  // { path: '/admin/models', name: 'Model', icon: 'pe-7s-car', component: ModelListPage },
  {
    path: '/admin/traderequests',
    name: 'Trade Request',
    icon: 'pe-7s-cash',
    component: TradeRequestListPage,
    exact: true,
  },
  {
    path: '/admin/traderequests/add',
    name: 'Trade Request',
    icon: 'pe-7s-cash',
    component: TradeRequestPage,
    hidden: true,
    exact: true,
  },
  {
    path: '/admin/traderequests/:id',
    name: 'Trade Request',
    icon: 'pe-7s-cash',
    component: TradeRequestPage,
    hidden: true,
    exact: true,
  },
  {
    path: '/admin/dealers',
    name: 'Dealers',
    icon: 'pe-7s-star',
    component: DealerListPage,
    exact: true,
  },
  {
    path: '/admin/dealers/add',
    name: 'Dealers',
    icon: 'pe-7s-users',
    component: DealerPage,
    hidden: true,
    exact: true,
  },
  {
    path: '/admin/dealers/:id',
    name: 'Dealers',
    icon: 'pe-7s-users',
    component: DealerPage,
    hidden: true,
    exact: true,
  },
  {
    path: '/admin/config',
    name: 'Trade Request Config',
    icon: 'pe-7s-note2',
    component: TradeRequestConfigPage,
  },
  { redirect: true, path: '/admin', pathTo: '/admin/users', name: 'Users' },
  // {
  //   collapse: true,
  //   path: '/forms',
  //   name: 'Forms',
  //   state: 'openForms',
  //   icon: 'pe-7s-note2',
  //   views:
  //     [{ path: '/admin/forms/regular-forms', name: 'Regular Forms', mini: 'RF', component: RegularForms },
  //       { path: '/admin/forms/extended-forms', name: 'Extended Forms', mini: 'EF', component: ExtendedForms },
  //       { path: '/admin/forms/validation-forms', name: 'Validation Forms', mini: 'VF', component: ValidationForms },
  //       { path: '/admin/forms/wizard', name: 'Wizard', mini: 'W', component: Wizard }],
  // },
];

export default dashRoutes;
