FROM johnnyutahio/meteor-launchpad:latest

RUN mkdir $APP_BUNDLE_DIR/bundle/programs/web.browser/app/models
RUN chown -R node:node $APP_BUNDLE_DIR
RUN cd $APP_BUNDLE_DIR/bundle/programs/web.browser/app/ && chmod -R a+x models
