FROM node:10.16.3
RUN mkdir  /client
WORKDIR /client
COPY . /client
RUN npm install
EXPOSE 3000
