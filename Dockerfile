FROM node:14 AS rssbot
COPY package*.json ./server/
RUN cd server && npm install
COPY ./ ./server/

WORKDIR /server

CMD ["npm", "start"]