//jshint ejsversion:6

const express= require('express');
const app= express();
const bodyParser= require('body-parser');
const ejs= require('ejs');

const mongoose= require('mongoose');
const mongooseEncrypt=require('mongoose-encryption')
const lodash= require('lodash')
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));

app.set('view engine', 'ejs');







app.get('/', function(req, resp){
    resp.render('home')
})
app.get('/tlogin', function(req, resp){
    resp.render('tlogin')
})
app.get('/tsignup', function(req, resp){
    resp.render('tsignup')
})
app.get('/alogin', function(req, resp){
    resp.render('alogin')
})
app.get('/asignup', function(req, resp){
    resp.render('asignup')
})
app.listen(3400, function(){
    console.log('Server started on port 3400');
})
app.get("/info", function(req, resp){
    resp.render('info')
})
app.get("/security", function(req, resp){
    resp.render('security')
})


//routes for hyper links
app.get('/#about', function(req, resp){
    resp.render('home/#about')
})
app.get('/#contact', function(req, resp){
    resp.render('home/#contact')
})
app.get('/#services', function(req, resp){
    resp.render('home/#services')
})

///================================
app.get('/tpass', function(req, resp){
    resp.render('tpass')
})
app.get('/apass', function(req, resp){
    resp.render('apass')
})

//==================================
app.get('/tpass#about', function(req, resp){
    resp.render('home/#about')
})
app.get('/tpass#contact', function(req, resp){
    resp.render('home/#contact')
})
app.get('/tpass#services', function(req, resp){
    resp.render('home/#services')
})
app.get('/tpass/#', function(req, resp){
    resp.render('home/#')
})
app.get('/apass#about', function(req, resp){
    resp.render('home/#about')
})
app.get('/apass#contact', function(req, resp){
    resp.render('home/#contact')
})
app.get('/apass#services', function(req, resp){
    resp.render('home/#services')
})
app.get('/apass/#', function(req, resp){
    resp.render('home/#')
})

// Dashboard Side

app.get("/care", function(req, resp){

    resp.render("care")

})



const tenantSchema= new mongoose.Schema({
    firstName: String,
    lastName: String,
    phone:String,
    email: String,
    password: String
})
const agentSchema= new mongoose.Schema({
    firstName: String,
    lastName: String,
    phone:String,
    email: String,
    password: String
})

// var secret= "THis is jusa anoterhe secreite I used ...using mongoose encryption"
// tenantSchema.plugin(mongooseEncrypt, {secret: secret, encryptedFields: ['password']})
// agentSchema.plugin(mongooseEncrypt, {secret: secret, encryptedFields: ['password']})

const tenant= new mongoose.model('tenant', tenantSchema)
const agent= new mongoose.model('agent',agentSchema)

//===================POST=============================
app.post('/tsignup', function(req, resp){
    const tenantFirstName= req.body.firstName
    const tenantLastName= req.body.lastName
    const tenantPhone= req.body.phone
    const tenantEmail= req.body.email
    const tenantPass= req.body.password



    async function signUpTenant(){

            try{
                    await mongoose.connect('mongodb://127.0.0.1:27017/tofunmiDB');

                    const foundUser= await tenant.findOne({email:tenantEmail })

                    if(!foundUser){
                            const newTenant= new tenant({
                                firstName: tenantFirstName,
                                lastName: tenantLastName,
                                phone: tenantPhone,
                                email: tenantEmail,
                                password: tenantPass
                            }) 
                    
                            await newTenant.save();
                            

                          


                            resp.redirect("/tdashboard")
                            app.get("/tdashboard", function(req, resp){
                                resp.render('tdashboard')
                            })
                            console.log("New Tenant Registered")
        
                    }else{
                        console.log('User already exists')
                        resp.redirect('/tsignup')
                    }
            


            }catch(err){
                    console.log(err)
            }finally{
                await mongoose.connection.close()
            }

    }

    signUpTenant()
})

app.post('/asignup', function(req, resp){
    const agentFirstName= req.body.firstName
    const agentLastName= req.body.lastName
    const AgentPhone= req.body.phone
    const agentEmail= req.body.email
    const agentPass= req.body.password



    async function signUpAgent(){

            try{
                    await mongoose.connect('mongodb://127.0.0.1:27017/tofunmiDB');

                    const foundUser= await agent.findOne({email: agentEmail})

                    if (!foundUser){

                            const newAgent= new agent({
                                firstName: agentFirstName,
                                lastName: agentLastName,
                                phone: AgentPhone,
                                email: agentEmail,
                                password: agentPass
                            }) 
                    
                            await newAgent.save();
                        
                            resp.render('adashboard')
                            console.log("New Agent Registered")
    

                    }else{
                        console.log("User already exists")
                        resp.redirect('/asignup')
                    }
                


            }catch(err){
                    console.log(err)
            }finally{
                await mongoose.connection.close()
            }

    }

    signUpAgent()
})

//======================================POST FOR  LOGIN
let foundUserPass=''
let foundUserEmail=''
let logginPass=''
let logginEmail=''

app.post('/tlogin', function(req, resp){
    const tenantEmail= req.body.tenantEmail
    logginEmail=tenantEmail
    
    async function loginTenant(){

            try{
                    await mongoose.connect('mongodb://127.0.0.1:27017/tofunmiDB');

               
                    const foundUser= await tenant.findOne({email: tenantEmail})
                    console.log(foundUser)
                    console.log('User exits')

                    foundUserEmail=foundUser.email
                    foundUserPass=foundUser.password

                    if(foundUser){
                        resp.redirect('/tpass') 

                        app.post('/tpass', function(req, resp){

                            logginPass=req.body.tenantPassword

                            if(logginPass===foundUserPass){
                                console.log('user authenticated')
                                resp.render('tdashboard')
                            }else{
                                console.log("there's something wrong with your password")
                            }
                        })
                        
                    }else{
                        console.log("User not registered")
                        resp.redirect('/tlogin')
                    }
   
                    



            }catch(err){
                    console.log(err)
            }finally{
                await mongoose.connection.close()
            }

    }

    loginTenant()
})



app.post('/alogin', function(req, resp){
    const agentEmail= req.body.agentEmail
    logginEmail=agentEmail
    console.log(agentEmail)
    
    async function loginAgent(){

            try{
                    await mongoose.connect('mongodb://127.0.0.1:27017/tofunmiDB');

               
                    const foundUser= await agent.findOne({email: agentEmail})

                    foundUserEmail=foundUser.email
                    foundUserPass=foundUser.password
                    
                    if(foundUser){
                        console.log("User found")
                        resp.render('apass') 

                        app.post('/apass', function(req, resp){

                            logginPass=req.body.agentPassword   
                            
                            console.log(logginPass)
                            console.log(foundUser.password)
                            if(logginPass===foundUserPass){
                                console.log("Agent authenticated")
                                resp.render('adashboard')
                            }else{
                                console.log("THere's something wrong with your password")
                            }
                            

                        })
                    }else{
                        console.log("User not registered")
                    }
   
                    



            }catch(err){
                    console.log(err)
            }finally{
                await mongoose.connection.close()
            }

    }

    loginAgent()
})