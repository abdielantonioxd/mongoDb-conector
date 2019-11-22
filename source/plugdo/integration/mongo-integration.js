plugdo.integration("get-customer", (message, send) => {
 let response = {};
 DataTransfer = {
   id : 1
 }
 plugdo.collect("mongodbTest").get(DataTransfer,function(data,err){
   if(err){
     send({},err)
   }else{
     response.result = data ; 
     send(response)
   }
 })

});
