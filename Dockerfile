FROM node:latest
RUN mkdir -p /usr/src/my-apollo-server
WORKDIR /usr/src/my-apollo-server
COPY package*.json /usr/src/my-apollo-server/
RUN npm install
COPY . /usr/src/my-apollo-server
EXPOSE 8080 4000
CMD [ "npm", "start" ] 
# CMD [ "node", "server.js" ]