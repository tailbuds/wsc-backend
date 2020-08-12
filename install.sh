
# cd /home/node/
# wget -O wsc-backend.tar.gz 'https://github.com/RevanthNemani/wsc-backend/archive/v0.9.0.tar.gz'
# tar -xzf wsc-backend.tar.gz

sudo echo '
########################################################################
## Project: wsc-backend                                               ##
## Description: alizz islamic bank                                    ##
##              wealth management scorecard backend.                  ##
## Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.        ##
## Author: Revanth Nemani <revanth.nemani@alizzislamic.com>           ##
########################################################################
#
# Node environment variable. Options: [development | test | production]
NODE_ENV=production
#
# Development Environment Variables
#
# Development Database setup
DEV_DB_USERNAME=alizz-wsc
DEV_DB_PASSWORD=Alizz2020
DEV_DB_DATABASE_AUTH=alizzWsc
DEV_DB_DATABASE=alizzWsc
DEV_DB_HOST=10.10.150.71
DEV_DB_PORT=27017
# Development server setup
DEV_APP_HOST=10.10.150.42
DEV_APP_PORT=6143
# Devlopment Reverse proxy information
DEV_SERVER_TYPE=http
DEV_SERVER_NAME=10.10.150.42
DEV_PROXY_PORT=6143
# Development x-api-key required for admin operations
DEV_SECRET_KEY=
#
# Test Environment Variables
#
# Test Database setup
TEST_DB_USERNAME=alizz-logs
TEST_DB_PASSWORD=Alizz2020
TEST_DB_DATABASE_AUTH=central_logs
TEST_DB_DATABASE=central_logs
TEST_DB_HOST=10.10.150.71
TEST_DB_PORT=27017
# Test server setup
TEST_APP_HOST=10.10.150.42
TEST_APP_PORT=6143
# Test Reverse proxy information
TEST_SERVER_TYPE=http
TEST_SERVER_NAME=10.10.150.42
TEST_PROXY_PORT=6143
# Test x-api-key required for admin operations
TEST_SECRET_KEY=
#
# Production Environment Variables
#
# Production Database setup
PROD_DB_USERNAME=alizz-logs
PROD_DB_PASSWORD=Alizz2020
PROD_DB_DATABASE_AUTH=central_logs
PROD_DB_DATABASE=central_logs
PROD_DB_HOST=10.10.150.71
PROD_DB_PORT=27017
# Production server setup
PROD_APP_HOST=10.10.150.42
PROD_APP_PORT=6143
# Production Reverse proxy information
PROD_SERVER_TYPE=http
PROD_SERVER_NAME=10.10.150.42
PROD_PROXY_PORT=6143
# Production x-api-key required for admin operations
PROD_SECRET_KEY=

' > ./.env

cd ./

npm install

npm prune

/usr/bin/node

sudo echo '
[Unit]
Description=alizz islamic bank wealth management scorecard backend.
Documentation=https://gitlab.com/it/node/wsc-backend
After=network.target

[Service]
WorkingDirectory=/home/node/wsc-backend-0.9.0
User=node
ExecStart=/usr/bin/node server.js
StandardOutput=syslog
StandardError=syslog
Restart=always

[Install]
WantedBy=multi-user.target

' > /lib/systemd/system/wsc-backend.service

sudo systemctl daemon-reload

sudo systemctl enable wsc-backend

sudo systemctl start wsc-backend

