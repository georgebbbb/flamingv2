const { get, post, list } = require('./service')

PREFIX = `/classes/:className`


function controller(app) {
  app.get(`${PREFIX}/:objectId`, get)
  app.get(PREFIX, list)
  app.post(PREFIX, post)
}

module.exports = {
  controller
}
