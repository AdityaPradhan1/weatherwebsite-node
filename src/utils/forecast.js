const request =require('request')
const forecast=(latitude,logitude,callback)=>{
    const url='https://api.darksky.net/forecast/ca144d7da86e18cd413b10854978e42d/'+latitude +',' +logitude +'?units=si'
    request({url, json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to services',undefined)
        }else if(body.error){
            callback('Wrong location',undefined)
        }else{
            
            callback(undefined,"The temp now is ="+body.currently.temperature+" degrees celsius Humidity is="+body.currently.humidity)
        }
    })
}
module.exports=forecast