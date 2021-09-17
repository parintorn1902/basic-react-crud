FROM node:12-alpine

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY .env /app/
COPY tsconfig.json /app/
COPY src /app/src

RUN npm run build

CMD ["node", "./dist/server.js"]