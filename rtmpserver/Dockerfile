FROM node:alpine
WORKDIR "/app"
COPY ./package.json ./
RUN npm install
COPY . .
# EXPOSE 1935
# EXPOSE 8000
CMD ["npm", "run", "start"]
