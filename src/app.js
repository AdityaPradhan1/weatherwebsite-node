const path=require('path')
const express = require('express')
const request=require('request')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const hbs=require('hbs')

const app=express()
const port=process.env.PORT || 3000
//Defining paths for express
const publicDirPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

//set up handlebar engine and view location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//setup static directory
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'TitlePage',
        name:'Aditya'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'AboutPage',
        name:'Aditya'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'HelpPage',
        name:'Aditya P'
    })
})
//main part
app.get('/weather',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide search'
        })
    }
    const address=req.query.search

    geocode(address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error:error
            })
        }
        // console.log('Error',error)
        // console.log('Data',data)
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                forecast:forecastdata,
                location,
                address
            })
        })
    })

})
//404 pages
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 Page',
        name:'Aditya ',
        errormsg:'Help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 Page',
        name:'Aditya P',
        errormsg:'Page not found'
    })
})
app.listen(port,()=>{
    console.log('Server is on port '+port)
})