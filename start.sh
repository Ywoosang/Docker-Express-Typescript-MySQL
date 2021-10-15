#!/bin/bash
sleep 5
cd /usr/server
npm i
chmod +x /usr/server/node_modules/.bin/nodemon 
npm run dev