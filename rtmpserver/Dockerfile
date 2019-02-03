FROM node:alpine
WORKDIR "/app"
COPY ./package.json ./
RUN npm install
COPY . .
EXPOSE 1935
CMD ["npm", "run", "start"]
