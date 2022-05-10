FROM node

WORKDIR /app

COPY package.json /app

RUN yarn

COPY . .

EXPOSE 3000

CMD ["node", "./dist/index.js"]
