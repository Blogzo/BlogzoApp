FROM node:13.5.0

EXPOSE 8080

WORKDIR /web-app

COPY package*.json ./

RUN npm install

COPY src src

CMD ["npm", "run", "start"]