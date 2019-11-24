plugdo.integration("test-connector", (message, send) => {
  let response = {};

  dataSave = {
    save: {
      id_Curso: 555992,
      nombre: "Marco",
      apellido: "Catillo"
    }
  }


  dataUpdate = {
    findupdate: {
      _id: "5dd899344c10f64a15523a25"
    },
    newData: {
      nombre: "Eduard",
      apellido: "Cortez"
    }
  }


  datafind = {
    find: {
      apellido: "Flores"
    }
  }

  dataDelete = {
    findByIdAndRemove: {
      _id: "5ddacf9f319c566842c4fb00"
    }
  }


  //  console.log(message)
  plugdo.collect("mongodbTest").get(dataSave, function (data, err) {
    if (err) {
      send({}, err)
    } else {
      response.result = data;
      send(response)
    }
  })

});