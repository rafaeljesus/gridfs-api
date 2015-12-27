FROM node:5

ADD . /gridfs-api

WORKDIR /gridfs-api

RUN npm i

CMD ["npm", "start"]
