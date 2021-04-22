FROM node:12.18.0

COPY ./package.json ./

RUN npm install --production

COPY . .

CMD [ "npm", "start" ]
