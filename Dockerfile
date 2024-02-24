FROM node:20

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app
COPY prisma /app/prisma

RUN npm install --loglevel verbose

COPY . /app