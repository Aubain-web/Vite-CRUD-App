FROM node:18.16.0-alpine3.17


RUN mkdir /app
WORKDIR /app
COPY package.json .
COPY server.js .
COPY books.js .
COPY app.js .
RUN npm install
ENTRYPOINT ["node", "server.js"]
EXPOSE 3001