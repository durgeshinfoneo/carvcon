/* eslint-disable no-param-reassign */
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Accounts, STATES } from 'meteor/std:accounts-ui';

class LoginForm extends Accounts.ui.LoginForm {
  fields() {
    const { formState } = this.state;
    if (formState === STATES.SIGN_UP) {
      return {
        firstname: {
          id: 'firstname',
          hint: 'Enter firstname',
          label: 'firstname',
          onChange: this.handleChange.bind(this, 'firstname'),
        },
        ...super.fields(),
      };
    }
    return super.fields();
  }

  translate(text) {
    // Here you specify your own translation function, e.g.
    return this.props.t(text);
  }

  signUp(options = {}) {
    const { firstname = null } = this.state;
    if (firstname !== null) {
      options.profile = Object.assign(options.profile || {}, {
        firstname,
      });
    }
    super.signUp(options);
  }
}

export default withTracker(() => {
  // Listen for the user to login/logout and the services list to the user.
  Meteor.subscribe('servicesList');
  return ({
    user: Accounts.user(),
  });
})(LoginForm);

