const clone = require('lodash').clone
function getReutrnObject(origin) {
  const originId = origin['_id']
  delete origin['_id']
  origin.originId = originId
  return origin
}

module.exports = {
  getReutrnObject
}
