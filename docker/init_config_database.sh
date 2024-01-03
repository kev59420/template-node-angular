#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "postgres" --dbname "deboinvest" <<-EOSQL
  CREATE SCHEMA deboinvest;
	CREATE USER local_ro PASSWORD 'postgres';
  GRANT INSERT, SELECT, UPDATE, DELETE ON ALL TABLES IN SCHEMA deboinvest TO local_ro;
  GRANT USAGE on SCHEMA deboinvest to local_ro;
EOSQL