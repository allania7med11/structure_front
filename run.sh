#!/bin/sh
echo "envs $ENVIRONMENT $PORT"
if [ "$COLLECTSTATIC" = "True" ]; then
    npm run generate && echo "Generation completed successfully"
fi
if [ "$ENVIRONMENT" = "debug" ]; then
    sleep infinity
elif [ "$ENVIRONMENT" = "dev" ]; then
    npm run dev -- --port $PORT
elif [ "$ENVIRONMENT" = "prod" ]; then
    npm run build
    npm run start -p $PORT
fi
