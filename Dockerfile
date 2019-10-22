FROM node:10.16.3
RUN mkdir  /client
WORKDIR /client
COPY package.json package-lock.json /client/
RUN npm install
COPY . /client
EXPOSE 3000
