import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { ServiceConfiguration } from 'meteor/service-configuration';
import { Restivus } from 'meteor/nimble:restivus';
import '../imports/startup/server';
import CarModels from '../imports/api/carmodels/carmodels';
import {
  receivedAuthentication,
  receivedMessage,
  receivedDeliveryConfirmation,
  receivedPostback,
  receivedMessageRead,
  receivedAccountLink,
} from '../imports/helpers/fbbot';

ServiceConfiguration.configurations.upsert(
  {
    service: 'facebook',
  },
  {
    $set: {
      appId: Meteor.settings.facebook.appId,
      loginStyle: 'popup',
      secret: Meteor.settings.facebook.secret,
    },
  },
);

Accounts.onCreateUser(function (options, user) {
  let customizedUser = user;
  if (!user.services.facebook) {
    if (options.profile) {
      customizedUser.profile = options.profile;
      customizedUser.profile.avatar = '/images/profiles/generic_avatar.png';
    }
  } else {
    customizedUser = Object.assign({
      emails: [{ address: user.services.facebook.email }],
    }, user);

    // We still want the default hook's 'profile' behavior.
    if (options.profile) {
      customizedUser.profile = options.profile;
      customizedUser.profile.firstName = user.services.facebook.first_name;
      customizedUser.profile.lastName = user.services.facebook.last_name;
      customizedUser.profile.avatar = `https://graph.facebook.com/${user.services.facebook.id}/picture?type=large`;
    }
  }

  customizedUser.roles = ['user'];

  Meteor.setTimeout(function () {
    Roles.addUsersToRoles(user._id, ['user']);
  }, 10);

  return customizedUser;
});

const VALIDATION_TOKEN = 'TOKEN';

if (Meteor.isServer) {
  // Global API configuration
  const Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true,
  });

  Api.addCollection(CarModels);

  /*
  * Use your own validation token. Check that the token used in the Webhook
  * setup is the same token used here.
  *
  */
  Api.addRoute('webhook', {
    get() {
      if (this.queryParams['hub.mode'] === 'subscribe' &&
        this.queryParams['hub.verify_token'] === VALIDATION_TOKEN) {
        console.log('Validating hook');
        this.response.write(this.queryParams['hub.challenge']);
        this.done();
      } else {
        console.error('Failed validation. Make sure the validation tokens match.');
        this.response.statusCode = 403;
        this.done();
      }
    },
    post() {
      const data = this.bodyParams;

      // Make sure this is a page subscription
      if (data.object === 'page') {
        // Iterate over each entry
        // There may be multiple if batched
        data.entry.forEach(function(pageEntry) {
          const pageID = pageEntry.id;
          const timeOfEvent = pageEntry.time;

          // Iterate over each messaging event
          pageEntry.messaging.forEach(function(messagingEvent) {
            if (messagingEvent.optin) {
              receivedAuthentication(messagingEvent);
            } else if (messagingEvent.message) {
              receivedMessage(messagingEvent);
            } else if (messagingEvent.delivery) {
              receivedDeliveryConfirmation(messagingEvent);
            } else if (messagingEvent.postback) {
              receivedPostback(messagingEvent);
            } else if (messagingEvent.read) {
              receivedMessageRead(messagingEvent);
            } else if (messagingEvent.account_linking) {
              receivedAccountLink(messagingEvent);
            } else {
              console.log('Webhook received unknown messagingEvent: ', messagingEvent);
            }
          });
        });

        // Assume all went well.
        //
        // You must send back a 200, within 20 seconds, to let us know you've
        // successfully received the callback. Otherwise, the request will time out.
        this.done();
      }
    },
  });

  /*
  * This path is used for account linking. The account linking call-to-action
  * (sendAccountLinking) is pointed to this URL.
  *
  */
  Api.addRoute('authorize', {
    get() {
      const accountLinkingToken = this.queryParams.account_linking_token;
      const redirectURI = this.queryParams.redirect_uri;

      // Authorization Code should be generated per user by the developer. This will
      // be passed to the Account Linking callback.
      const authCode = '1234567890';
      
      // Redirect users to this URI on successful login
      const redirectURISuccess = `${redirectURI}&authorization_code=${authCode}`;
      
      return {
        statusCode: 302,
        headers: {
          'Content-Type': 'application/json',
          Location: 'https://carvcon.localtunnel.me/api/authorize',
        },
        body: {
          accountLinkingToken,
          redirectURI,
          redirectURISuccess,
        },
      };
    },
  });
}
 
Meteor.startup(() => {
  // code to run on server at startup
});
