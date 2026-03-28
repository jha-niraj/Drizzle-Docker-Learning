FROM node:22

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3004

CMD ["npm", "run", "start"]