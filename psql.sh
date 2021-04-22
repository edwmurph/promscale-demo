#!/bin/bash

docker exec -it $(docker ps -aqf "name=promscale-demo_db_1") psql -U postgres -d timescale
