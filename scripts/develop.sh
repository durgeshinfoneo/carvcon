#!/bin/sh

export METEOR_SETTINGS="$(cat settings/settings.prod.json)"
echo $METEOR_SETTINGS
# if eval $(docker-machine env carvcon-dev); then
	# env | grep DOCKER
	docker-compose -f docker-compose.dev.yml stop
	docker-compose -f docker-compose.dev.yml build
	docker-compose -f docker-compose.dev.yml up -d
	docker-compose -f docker-compose.dev.yml logs -f
	# docker-compose -f docker-compose.dev.yml exec node meteor npm install bcrypt
# fi

