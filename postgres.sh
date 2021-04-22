#!/bin/bash

docker exec -it $(docker ps -aqf "name=promscale_db_1") psql -U postgres -d timescale
