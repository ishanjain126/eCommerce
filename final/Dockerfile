FROM node:12
WORKDIR /backend
COPY /package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD [ "node", "app.js" ]  