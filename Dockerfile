FROM node:14-alpine
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh
RUN mkdir  /app
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
COPY . /app
# build necessary, even if no static files are needed,
# since it builds the server as well

# expose 5000 on container
EXPOSE 3000

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=3000

# start the app
ENTRYPOINT ["sh", "./run.sh"]