#!/bin/sh
if eval $(docker-machine env carvcon-dev); then
	env | grep DOCKER
	docker-compose -f docker-compose.prod.yml stop
	docker-compose -f docker-compose.prod.yml build
	docker-compose -f docker-compose.prod.yml up -d
	docker-compose -f docker-compose.prod.yml logs -f
fi
