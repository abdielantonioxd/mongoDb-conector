plugdo.integration("get-customer", (message, send) => {
 let response = {};
 DataTransfer = {
 update : {
    id_Curso : 266745}
 }
//  console.log(message)
 plugdo.collect("mongodbTest").get(DataTransfer,function(data,err){
   if(err){
     send({},err)
   }else{
     response.result = data ; 
     send(response)
   }
 })

});
