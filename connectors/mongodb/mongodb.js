const mongoose = require('mongoose');
// const jr = require("./plugdo-json-reader.js").jsonReader();
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
        var model = this.options.nameModel;

        this.connect = function () {
            if (this.options.server.user != "" && this.options.server.password != "" && this.options.server.host != "" && this.options.server.db != "") {
                mongoose.connect(stringConnectionUrl(this.options.server), {
                    useNewUrlParser: true,
                    useCreateIndex: true,
                    useUnifiedTopology: true
                })
                    .then(() => this.connectSuccess())
                    .catch(err => {
                        throw err;
                    })
            } else {
                throw new Error("Mongodb Conection Failed  XX.");
            }
        }

        this.connectSuccess = function () {
            if (model != "" && model != undefined) {
                model = mongoose.Schema(this.options.Schemadb[0], { collection: this.options.collection })
            } else {
                throw new Error("The  models is important ");
            }

            MongoCommands[this.options.actiondb]({
                collection: this.options.collection,
                model: model,
                message: message
            }, callback);
        }


        this.connect()
    }
}

var MongoCommands = {
    "save": new MongoActions().save,
    "find": new MongoActions().getAll,
    "update": new MongoActions().update,
    "delete": new MongoActions().delete,

}


function MongoActions() {

    this.save = function (options, send) {
        var modelMongoDbSave = mongoose.model(options.collection, options.model);
        let SaveMongo = new modelMongoDbSave(options.message);
        SaveMongo.save((err, save) => {
            if (err) {
                send({ ok: false }, err);
            } else {
                send({
                    ok: true,
                    message: false,
                    result: save
                });
            }
        });
    }

    this.getAll = function (options, send) {
        modelMongoDbFind = mongoose.model(options.collection, options.model);
        modelMongoDbFind.find(options.message).exec((err, find) => {
            if (err) {
                send({ ok: false }, err);
            }
            send({
                ok: true,
                result: find
            });
        });
    }


    this.update = function (options, send) {
        // console.log(options);
        modelMongoDbUpdate = mongoose.model(options.collection, options.model);
        var myId = {
            _id: options
        };
        console.log(myId)
        var newvalues = {
            $set: options.message.update
        };
        // console.log(newvalues)

        // modelMongoDbUpdate.updateOne(myId, newvalues, {}, (err, update) => {
        //     if (err) {
        //         send({
        //             ok: false,
        //         }, err);
        //     }
        //     res.json({
        //         ok: true,
        //         result: update
        //     });
        // });
    }


}


var stringConnectionUrl = function (ConnectionStringDB) {
    var conectionString = `mongodb+srv://${ConnectionStringDB.user}:${ConnectionStringDB.password}@${ConnectionStringDB.host}/${ConnectionStringDB.db}?${ConnectionStringDB.options}`;

    return conectionString;
}

exports.mongodb = function () {
    return mongodb;
};
