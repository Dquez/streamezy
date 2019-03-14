FROM node:11.10-alpine as builder
WORKDIR "/app"
COPY ./package.json ./
RUN npm install
COPY . .
CMD ["npm" "run" "build"]
