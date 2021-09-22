# Carvcon

Car Trading

### Prerequisites

- [Docker (at least 1.10)](https://www.docker.com/)
- [Docker-compose (at least 1.6)](https://docs.docker.com/compose/install/)
- [Meteor (at least 1.6)](https://www.meteor.com/install)

## Getting Started

To get up and running on local, simply do the following:

    $ git clone http://206.189.44.10:3000/Appsia/carvcon.git
    $ cd carvcon
    # build docker images
    $ docker-compose build
    $ docker-compose up

## Deployment

ssh to server

    $ su carvcon
    $ cd ~/carvcon
    $ git pull origin develop
    $ export METEOR_SETTINGS="$(cat settings/settings.prod.json)"
    $ docker-compose -f docker-compose.dev.yml build
    $ docker-compose -f docker-compose.dev.yml up -d
