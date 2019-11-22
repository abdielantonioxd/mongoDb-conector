
var serverConnect =  {
  user: "abdiel",
  password: "1997",
  host: "cluster0-xg7r9.mongodb.net",
  db: "curso",
  options: "retryWrites=true&w=majority"
} 


plugdo.collector("mongodbTest", {
  type: "db",
  action: "mongodb",
  server: serverConnect,
  collection: "Plugdo",
  nameModel :"modelPlugdo",
  actiondb: "update",
  Schemadb: [{
    id_Curso: { type: String, require: true }
  }],
  parameter : []
});