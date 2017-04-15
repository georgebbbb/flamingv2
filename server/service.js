const { MongoClient, ObjectId } = require("mongodb")
const errorCode = require('./constants/errorCode')
const getReutrnObject = require('./transforms').getReutrnObject
const port = process.env.MONGODB_PORT_27017_TCP_PORT || '27017';
const addr = process.env.MONGODB_PORT_27017_TCP_ADDR || 'localhost';
const instance = process.env.MONGODB_INSTANCE_NAME || 'mocha';
const password = process.env.MONGODB_PASSWORD
const username = process.env.MONGODB_USERNAME
const connect  = MongoClient.connect(getUrl(port, addr, instance, password, username))

function get(req, res) {
  const { className, objectId } = req.params
  connect
  .then(db => db.collection(className).findOne({'_id': new ObjectId(objectId)}))
  .then(data => getReutrnObject(data))
  .then(data => res.json(data))
}

function post(req, res) {

}

function list(req, res) {
  const className = req.params.className
  const skip = +req.query.skip || 0
  const limit = +req.query.limit || 50
  let where
  try {
   where = req.query.where && JSON.parse(req.query.where)
 } catch (e) {
   res.json(errorCode.malformedJsonObject)
   return
 }

  connect
  .then(db => db.collection(className).find(where).skip(skip).limit(limit).toArray())
  .then(datas => datas.map(data => getReutrnObject(data)))
  .then(datas => res.json(datas))
}



module.exports = {
  get,
  list,
  post
}

function getUrl(port, addr, instance, password, username){
  url = 'mongodb://'
  if(username && password){
    url =  url + username + ':' + password +'@' + addr + ':' + port + '/' + instance
  }else {
    url = url + addr + ':' + port + '/' + instance
  }
  return url
}
