sudo echo '
[Unit]
Description=Central logging system for all requests to alizz islamic bank middleware.
Documentation=https://gitlab.com/it/node/central-logging
After=network.target

[Service]
WorkingDirectory=/home/node/central-logging-0.9.0
User=node
ExecStart=/usr/bin/node server.js
StandardOutput=syslog
StandardError=syslog
Restart=always

[Install]
WantedBy=multi-user.target

' > /lib/systemd/system/central-logging.service

sudo systemctl daemon-reload

sudo systemctl disable central-logging

sudo systemctl restart central-logging

sudo systemctl stop central-logging

sudo rm /lib/systemd/system/central-logging.service

sudo rm -rf .
