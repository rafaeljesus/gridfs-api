## GridFS API

[ ![Codeship Status for rafaeljesus/gridfs-api](https://codeship.com/projects/79578d40-8337-0133-c7cc-2e117485f168/status?branch=master)](https://codeship.com/projects/121751)
[![Docker Image Size](https://img.shields.io/imagelayers/image-size/rafaeljesus/gridfs-api/latest.svg)](https://hub.docker.com/r/rafaeljesus/gridfs-api/)
[![Docker Image Pulls](https://img.shields.io/docker/pulls/rafaeljesus/gridfs-api.svg)](https://hub.docker.com/r/rafaeljesus/gridfs-api/)
[![bitHound Overall Score](https://www.bithound.io/github/rafaeljesus/gridfs-api/badges/score.svg)](https://www.bithound.io/github/rafaeljesus/gridfs-api)
[![bitHound Dependencies](https://www.bithound.io/github/rafaeljesus/gridfs-api/badges/dependencies.svg)](https://www.bithound.io/github/rafaeljesus/gridfs-api/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/rafaeljesus/gridfs-api/badges/devDependencies.svg)](https://www.bithound.io/github/rafaeljesus/gridfs-api/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/rafaeljesus/gridfs-api/badges/code.svg)](https://www.bithound.io/github/rafaeljesus/gridfs-api)

* Exposes a REST API for MongoDB GridFS

## Installation
```bash
npm install -g gridfs-api
```

## Running tests
To run a suite tests execute:
```bash
npm test
```

## Built with
- [nodejs](https://https://nodejs.org) Backend is a node-v.5.3.0.
- [koa](http://koajs.com) API is a KOA app. It respond to requests RESTfully in JSON.
- [Mongodb](https://www.mongodb.com) Mongodb as a data store.

## Docker
This repository has automated image builds on hub.docker.com.

Use [docker-mongodb](https://github.com/rafaeljesus/docker-mongodb) and run command described there

Finally run:
```
$ docker-machine start default
$ eval $(docker-machine env default)
$ docker run -it -e "NODE_ENV=development" -v "$(pwd)":/data --link mongo:mongo -w /data -p 3000:3000 rafaeljesus/gridfs-api
$ curl `docker-machine ip default`:3000
```

## API documentation
We use source code comments to add documentation.

You can browse an HTML documenation at [docs](http://gridfs-api.herokuapp.com/apidoc/index.html)

## Contributing
- Fork it
- Create your feature branch (`git checkout -b my-new-feature`)
- Commit your changes (`git commit -am 'Add some feature'`)
- Push to the branch (`git push origin my-new-feature`)
- Create new Pull Request

### Maintaners

* [Rafael Jesus](https://github.com/rafaeljesus)
