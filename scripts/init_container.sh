#!/usr/bin/env bash
set -x
set -eo pipefail

# Check if PSQL is installed.
if ! [ -x "$(command -v psql)" ]; then
  echo >&2 "Error: psql is not installed."
  exit 1
fi

# Check if a custom user has been set, otherwise default to 'root'
DB_USER=${POSTGRES_USER:=root}
# Check if a custom password has been set, otherwise default to 'password'
DB_PASSWORD="${POSTGRES_PASSWORD:=password}"
# Check if a custom database name has been set, otherwise default to 'default'
DB_NAME="${POSTGRES_DB:=default}"
# Check if a custom port has been set, otherwise default to '5432'
DB_PORT="${POSTGRES_PORT:=5432}"
# Check if a custom container name has been set, otherwise default to 'postgres_container'
CONTAINER_NAME=${POSTGRES_CONTAINER_NAME:=postgres_container}

# Allow to skip Docker if a dockerized Postgres database is already running
if [[ -z "${SKIP_DOCKER}" ]]; then
  # Launch postgres using Docker
  docker run \
    --name "${CONTAINER_NAME}" \
    -e POSTGRES_USER="${DB_USER}" \
    -e POSTGRES_PASSWORD="${DB_PASSWORD}" \
    -e POSTGRES_DB="${DB_NAME}" \
    -p "${DB_PORT}":5432 \
    -d postgres:16 \
    postgres -N 1000
  # ^ Increased maximum number of connections for testing purposes
fi

# Keep pinging Postgres until it is ready to accept commands
export PGPASSWORD="${DB_PASSWORD}"
until psql -h "localhost" -U "${DB_USER}" -p "${DB_PORT}" -d "postgres" -c '\q'; do
  echo >&2 "Postgres is still unavailable - sleeping"
  sleep 1
done

echo >&2 "Postgres is up and running on port ${DB_PORT}!"
