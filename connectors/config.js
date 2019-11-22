plugdo.collector("sqlserverGetInfo", {
  type: "db",
  action: "mongodb",
  server: {
      user: "abdiel",
      password: "1997",
      host: "cluster0-xg7r9.mongodb.net",
      db: "curso",
      options: "retryWrites=true&w=majority"
  }
});



module.exports =  plugdo ; 