FROM node:13.5.0

EXPOSE 3000

WORKDIR /spa

COPY package*.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "run", "start"]