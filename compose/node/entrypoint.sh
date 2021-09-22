#!/bin/bash
set -e
cmd="$@"

CURRENT=`pwd`
BASENAME=`basename "$CURRENT"`

echo "$BASENAME" 

if [ -e settings/settings.prod.json ]; then
  export METEOR_SETTINGS=`cat settings/settings.prod.json`
fi

exec $cmd