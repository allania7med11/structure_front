FROM node:14-alpine
RUN mkdir  /client
WORKDIR /client
COPY package.json package-lock.json /client/
RUN npm install
COPY . /client
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
CMD ["dev", "3000"]
