const mongoose = require('mongoose');
const {Schema} = mongoose;

var configMongo = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

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
        model: "",
        queryType: "",
        schema: [],
        parameter: []
    },
    get: function (message, callback) {
        this.connect = function () {
            if (validateConnect(this.options) == true) {
                mongoose.connect(stringConnectionUrl(this.options), configMongo)
                    .then(() => this.connectSuccess())
                    .catch(err => {
                        throw err;
                    })
            } else {
                throw new Error("Mongodb Conection Failed");
            }
        }

        this.connectSuccess = function () {
            if (this.options.model != "" && this.options.model != undefined) {
              var Model = mongoose.Schema(this.options.schema[0], {
                    collection: this.options.collection
                })
            } else {
                throw new Error("The  models is undefined ");
            }

            MongoCommands[this.options.queryType]({
                collection: this.options.collection,
                model: Model,
                message: message
            }, callback);
        }

        this.connect()
    }
}

var MongoCommands = {
    "save": new MongoActions().save,
    "find": new MongoActions().find,
    "updateOne": new MongoActions().updateOne,
    "findByIdAndRemove": new MongoActions().findByIdAndRemove,
    "count": new MongoActions().count,
    "countDocument": new MongoActions().countDocument
}


function MongoActions() {

    this.save = function (options, send) {
        var modelMongodbSave = mongoose.model(options.collection, options.model);
        let SaveMongo = new modelMongodbSave(options.message.save);
        SaveMongo.save( function (err, save) {
            console.log(save)
            if (err) {
                send({},err);
            } else {
                send({
                    ok: true,
                    result: save
                });
            }
        });
    }

    this.find = function (options, send) {
        modelMongodbFind = mongoose.model(options.collection, options.model);
        modelMongodbFind.find(options.message.find).exec((err, find) => {
            if (err) {
                send({
                    ok: false
                }, err);
            }
            send({
                ok: true,
                result: find
            });
        });
    }


    this.updateOne = function (options, send) {
        modelMongodbUpdate = mongoose.model(options.collection, options.model);
        var FindId = {
            _id: options.message.findupdate
        };

        var newValues = {
            $set: options.message.newData
        };

        modelMongodbUpdate.updateOne(FindId, newValues, {}, (err, update) => {
            if (err) {
                send({
                    ok: false,
                }, err);
            }
            send({
                ok: true,
                result: update
            });
        });
    }

    this.findByIdAndRemove = function (options, send) {
        modelMongodbDelete = mongoose.model(options.collection, options.model);
        var valueDelete = options.message.findByIdAndRemove._id;
        modelMongodbDelete.findByIdAndRemove(valueDelete, (err, deleteData) => {
            if (err) {
                send({}, err);
            }
            send({
                ok: true,
                result: deleteData
            });
        });
    }

    this.count = function (options,send){
        modelMongodbCount = mongoose.model(options.collection, options.model);
        modelMongodbCount.find(options.message.find).count().exec((err, find) => {
            if (err) {
                send({
                    ok: false
                }, err);
            }
            send({
                ok: true,
                result: find
            });
        });
    }

    this.countDocument = function (options,send){
        modelMongodbCountDocument = mongoose.model(options.collection, options.model);
        modelMongodbCountDocument.countDocuments(options.message.find).exec((err, find) => {
            if (err) {
                send({
                    ok: false
                }, err);
            }
            send({
                ok: true,
                result: find
            });
        });
    }

}

var stringConnectionUrl = function (ConnectionStringDB) {
    if (ConnectionStringDB.mode === "" || ConnectionStringDB.mode === "prod") {
        var conectionString = `mongodb+srv://${ConnectionStringDB.server.user}:${ConnectionStringDB.server.password}@${ConnectionStringDB.server.host}/${ConnectionStringDB.server.db}?${ConnectionStringDB.server.options}`;
        return conectionString;
    } else {
        var conectionString = ConnectionStringDB.server.host + "/" + ConnectionStringDB.server.db;
        return conectionString;
    }

}

var validateConnect = function (validate) {
    if (validate.mode === "dev" && validate.mode != "" && validate.mode != "prod") {
        if (validate.server.host != "" && validate.server.db != "") {
            return true;
        } else {
            return false;
        }
    }
    if (validate.server.user != "" && validate.server.password != "" && validate.server.host != "" && validate.server.db != "") {
        return true;
    } else {
        return false;
    }
}

exports.mongodb = function () {
    return mongodb;
};