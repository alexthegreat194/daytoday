FROM node:14-alpine
WORKDIR /app
COPY package.json /app
RUN npm install --loglevel verbose
COPY . /app
RUN npx prisma migrate deploy
CMD ['npm', 'start']