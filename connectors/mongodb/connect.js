const mongoose = require('mongoose');
const jr = require("./plugdo-json-reader.js").jsonReader();
const { Schema } = mongoose;
var ConnectionStringDB = "";
var model = "";
const mongodb = {
    callback: false,
    options: {
        server: {
            user: "",
            password: "",
            host: "",
            db: "",
            options: ""
        },
        collection: "",
        nameModel: "",
        actiondb: "",
        Schemadb: [],
        parameter: []
    },
    get: function (message, callback) {
        ConnectionStringDB = this.options.server;
        var model = this.options.nameModel;
        var conectionString = `mongodb+srv://${ConnectionStringDB.user}:${ConnectionStringDB.password}@${ConnectionStringDB.host}/${ConnectionStringDB.db}?${ConnectionStringDB.options}`;
        if (ConnectionStringDB.user != "" && ConnectionStringDB.password != "" && ConnectionStringDB.host != "" && ConnectionStringDB.db != "") {
            mongoose.connect(conectionString, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            })
                .then(() => this.connectSuccess())
                .catch(err => console.log(err));
        } else {
            throw Error("Mongodb Conection Failed  XX.")
        }

        this.connectSuccess = function () {
            let parameterData = [];
            this.options.parameter.forEach((element) => {
                if (element.indexOf(":") != -1) {
                    if (element.substring(0, 5) != "json:")
                        throw new Error("Error reading the json message, use 'json:propertyName'");
                    element = element.replace("json:", "");
                    let fixedStr = jr.read(element, message);
                    parameterData.push(fixedStr);
                }
                else {
                    parameterData.push(element);
                }
            });

            if (model != "") {
                model = mongoose.Schema(this.options.Schemadb[0], { collection: this.options.collection })
            } else {
                throw Error("The  models is important ");
            }
            // if (this.options.actiondb == "Insert") {
            //   Model = mongoose.model(`${this.options.collection}`, model);
            //   console.log(model)
            //   let SaveMongo = new Model({
            //     id_Curso: parameterData[0]
            //   });
            //   SaveMongo.save((err, SaveMongo) => {
            //     if (err) {
            //       callback({}, err);
            //     } else {
            //       callback({
            //         ok: true,
            //         message: false,
            //         save: SaveMongo
            //       });
            //     }
            //   });
            // }
        }
    }
}

exports.mongodb = function () {
    return mongodb;
};
