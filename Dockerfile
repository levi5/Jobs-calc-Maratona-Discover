FROM node:15

WORKDIR /usr/app

COPY package*.json ./
COPY . .
RUN npm install

CMD ["node", "./src/server.js"]
