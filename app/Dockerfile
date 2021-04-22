FROM node:14.16.0

COPY ./package.json ./

RUN npm install --production

COPY . .

CMD [ "npm", "start" ]
