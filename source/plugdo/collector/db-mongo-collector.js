
var serverConnect =  {
  user: "abdiel",
  password: "1997",
  host: "cluster0-xg7r9.mongodb.net",
  db: "curso",
  options: "retryWrites=true&w=majority"
} 

var serverConnectdev =  {
  user: "",
  password: "",
  host: "mongodb://localhost:27017",
  db: "Plugdo",
  options: ""
} 
plugdo.collector("mongodbTest", {
  type: "db",
  action: "mongodb",
  server: serverConnectdev,
  collection: "test2Plugdo",
  model :"modelPlugdo2",
  queryType: "save",
  mode:"dev",
  schema: [{
    id_Curso: { type: String, require: true },
    nombre: { type: String, require: true },
    apellido: { type: String, require: true }
  }],
  parameter : []
});


