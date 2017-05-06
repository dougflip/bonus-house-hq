Example systemd unit file for enabling the server on start up.
Keeping this here so I can version it:
 
```
[Unit]
Description=Bonus House HQ Server
After=network.target

[Service]
User=pi
Environment=NODE_ENV=production
WorkingDirectory=/home/pi/code/bonus-house-hq-master
ExecStart=/home/pi/.nvm/versions/node/v6.10.3/bin/node src/main.js
Restart=always
RestartSec=500ms
StartLimitInterval=0

[Install]
WantedBy=multi-user.target
```
