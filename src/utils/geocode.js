const request=require('request')
const geocode= (address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiY2FuZGxlYmxvd2VyIiwiYSI6ImNrN2cwd2xtaTAwaWQza28zbXgxZGd5NXAifQ.jkWlUyW3FGATifOXzLDH0A&limit=1'
    request({url:url,'json':true},(error,response)=>{
        if(error){
            callback('unable to connect to services',undefined)
        }else if(response.body.features.length==0){
            callback('Wrong location',undefined)
        }else{
            const data= {
                'latitude': response.body.features[0].center[1],
                'longitude':response.body.features[0].center[0],
                'location':response.body.features[0].place_name
            }
            callback(undefined,data)
        }
    })
}
module.exports=geocode