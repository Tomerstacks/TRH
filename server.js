//jshint ejsversion:6

const express= require('express');
const app= express();
const bodyParser= require('body-parser');
const ejs= require('ejs');
const date = require(__dirname + "/date.js");
const day = date.getDate();
const mongoose= require('mongoose');
const mongooseEncrypt=require('mongoose-encryption')
const lodash= require('lodash')
// 

const { v4: ucode } = require('uuid');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));

app.set('view engine', 'ejs');



var loggedInUser=''
var loggedInUserName=''

// console.log(process.browser)

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
    resp.render('info', {date: day})
})
app.get("/security", function(req, resp){
    resp.render('security', {date: day})
})
app.get('/app', function(req, resp){
    resp.render('app', {debt: '', property: '', status:'', tenant: '', date: day})
})

// =====================================
let loggedInAgentName=''


app.get('/acare', function(req, resp){
    resp.render('acare', {agentFname: loggedInAgentName, date: day})
})

app.get('/ainfo', function(req, resp){
    resp.render('ainfo', {agentFname: loggedInAgentName, date: day})
})
app.get('/security', function(req, resp){
    resp.render('asecurity', {agentFname: loggedInAgentName, date: day})
})
app.get('/averify', function(req, resp){
    resp.render('averify', {agentFname: loggedInAgentName, date: day}) 
})
app.get('/adashboard', function(req, resp){
    resp.render('adashboard', {agentFname: loggedInAgentName, date: day})
})

//routes for hyper links
app.get('/#about', function(req, resp){
    resp.render('home/#about', )
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

app.get('/tdashboard', function(req, resp){
    resp.render('tdashboard', {tenantFname: loggedInUserName, date: day})
})
app.get('/logout', function(req, resp){
    resp.redirect('/')
})

app.get('/security', function(req, resp){
    resp.render('security', {tenantFname: loggedInUserName, date: day})
})
app.get('/info', function(req, resp){
    resp.render('info', {tenantFname: loggedInUserName, date: day} )
})


//===========================================================
const tenantFormASchema= new mongoose.Schema({
    surname: String,
    otherNames:String,
    address: String,
    nationality: String,
    localgvt: String,
    stateOfOrigin: String,
    passportNo: String,
    townVilla: String,
    sex: String,
    maritalStatus: String
})
const tenantFormBSchema= new mongoose.Schema({
    age: String,
    phone:String,
    email: String,
    noOfChildren: String,
    occupation: String,
    position: String,
    officeAddr: String,
    townVilla: String,
    identityForm: String,
    officialEmail: String,
    kinName: String,
    kinAddr: String,
    kinPhone: String,
    kinRelate: String,
    kinEmail: String,
    kinWorkAddr: String
})
const tenantFormB2Schema= new mongoose.Schema({
    desire: String,
    influenceFactor:String,
    pets: String,
    petKind: String,
    vehicles: String,
    salaryAnnual: String,
    budget: String,
    sponsor: String,
    currentResAddr: String,
    kinName: String,
    kinAddr: String,
    kinPhone: String,
    kinRelate: String,
    kinEmail: String,
    kinWorkAddr: String
})
const tenantFormB3Schema= new mongoose.Schema({
    intendedOccupants: String,
    religion:String,
    otherReligion: String,
    pastorImamName: String,
    placeOfWorship: String,
    swiftPossession: String,
    prevLandlordName: String,
    prevLandlordAddr: String,
    reasonsForLeaving: String,
    debtsOwed: String,
    debtsAmount: String,
    evidence:String,
    RemarksPrevPlace: String
})
const tenantFormB4Schema= new mongoose.Schema({
    guarantor1Name: String,
    guarantor1Phone:String,
    guarantor1Addr: String,
    guarantor1WorkAddr: String,
    guarantor1Job: String,
    guarantor1Position: String,
    guarantor1MaritalStatus: String,
    guarantor1Email: String,
    guarantor2Name: String,
    guarantor2Phone:String,
    guarantor2Addr: String,
    guarantor2WorkAddr: String,
    guarantor2Job: String,
    guarantor2Position: String,
    guarantor2MaritalStatus: String,
    guarantor2Email: String
  
})

// ====================================================
const tenantSchema= new mongoose.Schema({
    firstName: String,
    lastName: String,
    phone:String,
    email: String,
    password: String,
    verificationForm1: tenantFormASchema,
    verificationForm2: tenantFormBSchema,
    verificationForm3: tenantFormB2Schema,
    verificationForm4: tenantFormB3Schema,
    verificationForm5: tenantFormB4Schema,
    utc: String
})
// ========================================================
const agentSchema= new mongoose.Schema({
    firstName: String,
    lastName: String,
    phone:String,
    email: String,
    password: String
})

const agentVerificationSchema= new mongoose.Schema({
    tenantName: String,
    utc:String,
    properyName:String,
    maritalStatus: String,
    addressofPlace:String,
    leaveReason: String,
    occupants:String,
    owingDebts:String,
    debtAmount: String,
    evidence: String,
    landlordName: String,
    landlordPhone: String,
    landlordRemarks: String

})
// var secret= "THis is jusa anoterhe secreite I used ...using mongoose encryption"
// tenantSchema.plugin(mongooseEncrypt, {secret: secret, encryptedFields: ['password']})
// agentSchema.plugin(mongooseEncrypt, {secret: secret, encryptedFields: ['password']})

const tenant= new mongoose.model('tenant', tenantSchema)
const agent= new mongoose.model('agent',agentSchema)
const investigation= new mongoose.model('investigation', agentVerificationSchema)

//===================POST=============================
app.post('/tsignup', function(req, resp){
    const tenantFirstName= req.body.firstName
    const tenantLastName= req.body.lastName
    const tenantPhone= req.body.phone
    const tenantEmail= req.body.email
    const tenantPass= req.body.password



    async function signUpTenant(){

            try{
                    await mongoose.connect('mongodb+srv://samueltomiloba:bXY7NI8XK5cXddAl@prodcluster.nfnp8jp.mongodb.net/tofunmiDB');

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





                            
                            loggedInUser=newTenant.email
                            loggedInUserName=newTenant.firstName
                            resp.redirect('/tdashboard')


                            console.log("New Tenant Registered")
                            // console.log(newTenant.firstName)


                            app.get('/tverify', function(req, resp){
                                resp.render('tverify', {tenantFname: newTenant.firstName, date: day})
                            })
                                     // Submitting the form
                                    var formDataA={}
                                    app.post('/tverify', function(req, resp){

                                        formDataA={

                                            surname: req.body.surnameInput,
                                            otherNames:req.body.namesInput,
                                            address: req.body.addressInput,
                                            nationality: req.body.nationalityInput,
                                            localgvt: req.body.lgvtInput,
                                            stateOfOrigin: req.body.soriginInput,
                                            passportNo: req.body.passnoInput,
                                            townVilla: req.body.townInput,
                                            sex: req.body.sexInput,
                                            maritalStatus: req.body.maritalStatus

                                        }

                                        async function updateTenantForm1(){
                                            await mongoose.connect('mongodb+srv://samueltomiloba:bXY7NI8XK5cXddAl@prodcluster.nfnp8jp.mongodb.net/tofunmiDB');

                                            try{

                                                await tenant.updateOne({email: newTenant.email}, {verificationForm1: formDataA})
                                                console.log('updated Form 1 successfully')
                                                resp.redirect('/tverify2')

                                            }catch(err){
                                                console.log(err)
                                            }

                                        }
                                        updateTenantForm1()
                                        
                                    })

                                    // ===============================================
                                    app.get('/tverify2', function(req, resp){
                                        resp.render('tverify2', {tenantFname: newTenant.firstName,date: day})



                                        app.post('/tverify2', function(req, resp){

                                                const formDataB={
        
                                                    age: req.body.ageInput,
                                                    phone:req.body.phoneInput,
                                                    email: req.body.emailInput,
                                                    noOfChildren: req.body.childInput,
                                                    occupation: req.body.professionInput,
                                                    position: req.body.positionInput,
                                                    officeAddr: req.body.busaddrInput,
                                                    townVilla: req.body.townInput,
                                                    identityForm: req.body.identFormInput,
                                                    officialEmail: req.body.busEmailInput,
                                                    kinName: req.body.kinNameInput,
                                                    kinAddr: req.body.kinHomeAddrInput,
                                                    kinPhone: req.body.kinPhoneInput,
                                                    kinRelate: req.body.kinRelInput,
                                                    kinEmail: req.body.kinEmailInput,
                                                    kinWorkAddr: req.body.kinBusAddrInput
        
                                                }

                                                async function updateTenantForm2(){
                                                    await mongoose.connect('mongodb+srv://samueltomiloba:bXY7NI8XK5cXddAl@prodcluster.nfnp8jp.mongodb.net/tofunmiDB');
        
                                                    try{
        
                                                        await tenant.updateOne({email: newTenant.email}, {verificationForm2: formDataB})
                                                        console.log('updated Form 2 successfully')
                                                        resp.redirect('/tverify3')
        
                                                    }catch(err){
                                                        console.log(err)
                                                    }
        
                                                }
                                                updateTenantForm2()
    
                                        })
                                    })
                                    app.get('/tverify3', function(req, resp){
                                        resp.render('tverify3', {tenantFname: newTenant.firstName, date: day})




                                        app.post('/tverify3', function(req, resp){

                                            const formDataC={
    
                                                desire: req.body.desireInput,
                                                influenceFactor:req.body.factorInput,
                                                pets: req.body.petsInput,
                                                petKind: req.body.petKindInput,
                                                vehicles: req.body.vehiclesInput,
                                                salaryAnnual: req.body.salaryInput,
                                                budget: req.body.budgetInput,
                                                sponsor: req.body.sponsorInput,
                                                currentResAddr: req.body.currentResaddrInput
    
                                            }

                                            async function updateTenantForm3(){
                                                await mongoose.connect('mongodb+srv://samueltomiloba:bXY7NI8XK5cXddAl@prodcluster.nfnp8jp.mongodb.net/tofunmiDB');
    
                                                try{
    
                                                    await tenant.updateOne({email: newTenant.email}, {verificationForm3: formDataC})
                                                    console.log('updated Form 3 successfully')
                                                    resp.redirect('/tverify4')
    
                                                }catch(err){
                                                    console.log(err)
                                                }
    
                                            }
                                            updateTenantForm3()

                                        })
                                    })
                                    
                                    
                                    app.get('/tverify4', function(req, resp){
                                        resp.render('tverify4', {tenantFname: newTenant.firstName, date: day})

                                        app.post('/tverify4', function(req, resp){

                                            const formDataD={
    
                                                intendedOccupants: req.body.occupantsInput,
                                                religion:req.body.religionInput,
                                                otherReligion: req.body.otherReligionInput,
                                                pastorImamName: req.body.leaderInput,
                                                placeOfWorship: req.body.worshipAddrInput,
                                                swiftPossession: req.body.possessionInput,
                                                prevLandlordName: req.body.landlordNameInput,
                                                prevLandlordAddr: req.body.landlordAddrInput,
                                                reasonsForLeaving: req.body.leaveReasonInput,
                                                debtsOwed: req.body.debstOwedInput,
                                                debtsAmount: req.body.debtsOwedAmount,
                                                evidence:req.body.evidence,
                                                RemarksPrevPlace: req.body.remarksPrevious
    
                                            }
                                            async function updateTenantForm4(){
                                                await mongoose.connect('mongodb+srv://samueltomiloba:bXY7NI8XK5cXddAl@prodcluster.nfnp8jp.mongodb.net/tofunmiDB');
    
                                                try{
    
                                                    await tenant.updateOne({email: newTenant.email}, {verificationForm4: formDataD})
                                                    console.log('updated Form 4 successfully')
                                                    resp.redirect('/tverify5')
    
                                                }catch(err){
                                                    console.log(err)
                                                }
    
                                            }
                                            updateTenantForm4()

                                        })
                                    })

                                    app.get('/tverify5', function(req, resp){
                                        resp.render('tverify5', {tenantFname: newTenant.firstName, date: day})

                                        app.post('/tverify5', function(req, resp){


                                            const formDataE={
    
                                                guarantor1Name: req.body.guarantNameInput,
                                                guarantor1Phone:req.body.guarantPhoneInput,
                                                guarantor1Addr: req.body.guarantAddrInput,
                                                guarantor1WorkAddr: req.body.guarantBusaddrInput,
                                                guarantor1Job: req.body.guarantJobInput,
                                                guarantor1Position: req.body.guarantPositionInput,
                                                guarantor1MaritalStatus: req.body.guarantMarriageInput,
                                                guarantor1Email: req.body.guarantEmailInput,
                                                guarantor2Name: req.body.guarantNameInput2,
                                                guarantor2Phone:req.body.guarantPhoneInput2,
                                                guarantor2Addr: req.body.guarantAddrInput2,
                                                guarantor2WorkAddr: req.body.guarantBusaddrInput2,
                                                guarantor2Job: req.body.guarantJobInput2,
                                                guarantor2Position: req.body.guarantPositionInput2,
                                                guarantor2MaritalStatus: req.body.guarantMarriageInput2,
                                                guarantor2Email: req.body.guarantEmailInput2

                                            }
                                            async function updateTenantForm5(){
                                                await mongoose.connect('mongodb+srv://samueltomiloba:bXY7NI8XK5cXddAl@prodcluster.nfnp8jp.mongodb.net/tofunmiDB');
                                                uniqueTenantCode=ucode()
                                                try{
    
                                                    await tenant.updateOne({email: newTenant.email}, {verificationForm5: formDataE})
                                                    await tenant.updateOne({email: newTenant.email}, {utc: uniqueTenantCode})

                                                    console.log('updated Form 5 successfully')
                                                    resp.redirect('/tdashboard')
    
                                                }catch(err){
                                                    console.log(err)
                                                }
    
                                            }
                                            updateTenantForm5()

                                        })
                                        
                                            

                                    })


                                    app.get('/uniquepage', function(req, resp){
                                    
                                   

                                        async function obtainCode(){
                                            let uniqueTenantCode=''
                                            await mongoose.connect('mongodb+srv://samueltomiloba:bXY7NI8XK5cXddAl@prodcluster.nfnp8jp.mongodb.net/tofunmiDB');
                                           
                                            try{
    
                                                let checkingUser= await tenant.findOne({email: newTenant.email})
    
                                                console.log(checkingUser.verificationForm5)
                                                if(!checkingUser.verificationForm5){
                                    
                                                    uniqueTenantCode= 'You have not not been verified. Fill in the verification forms to obtain your uniqe tenant code'
    
                                                }else{
                                                    uniqueTenantCode=checkingUser.utc
                                                    await tenant.updateOne({email: checkingUser.email}, {utc: uniqueTenantCode})
                                                }
                                                resp.render('uniquepage', {tenantFname: newTenant.firstName, uniqueCode: uniqueTenantCode, date: day})
    
                                            }catch(err){
                                                console.log(err)
                                            }
    
                                            
    
                                        }
                                        obtainCode()
    
    
                                    })

                                    app.get("/care", function(req, resp){

                                        resp.render("care", {tenantFname: newTenant.firstName, date: day})
                                    
                                    })


                                    
                    




        
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
                    await mongoose.connect('mongodb+srv://samueltomiloba:bXY7NI8XK5cXddAl@prodcluster.nfnp8jp.mongodb.net/tofunmiDB');

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
                            console.log(newAgent.firstName)
                            loggedInAgentName=newAgent.firstName
                            resp.render('adashboard', {agentFname: newAgent.firstName, date:day})
                            app.get('/averify', function(req, resp){
                                resp.redirect('/averify')
                            })
                            
                            console.log("New Agent Registered")
                            console.log(loggedInAgentName)


                            app.post('/averify', function(req, resp){

                                async function agentInvestigation(){

                                    await mongoose.connect('mongodb+srv://samueltomiloba:bXY7NI8XK5cXddAl@prodcluster.nfnp8jp.mongodb.net/tofunmiDB');
                                    try{

                                        let targetInvestigation= new investigation({

                                            tenantName: req.body.tenantNameInput,
                                            utc:req.body.utcInput,
                                            properyName:req.body.propertyNameInput,
                                            maritalStatus: req.body.marriageInput,
                                            addressofPlace:req.body.addressInput,
                                            leaveReason: req.body.reasonInput,
                                            occupants:req.body.occupantsInput,
                                            owingDebts:req.body.debtsInput,
                                            debtAmount: req.body.debtAmountInput,
                                            evidence: req.body.evidence,
                                            landlordName: req.body.landlordNameInput,
                                            landlordPhone: req.body.landlordPhoneInput,
                                            landlordRemarks: req.body.remarksInput


                                        })
                                        targetInvestigation.save()
                                        resp.redirect('/adashboard')
                                        console.log('form data saved successfully')

                                    }catch(err){
                                        console.log(err)
                                    }
                                }
                                agentInvestigation()
                            })


        
                            // =============================
                            
    

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
                    await mongoose.connect('mongodb+srv://samueltomiloba:bXY7NI8XK5cXddAl@prodcluster.nfnp8jp.mongodb.net/tofunmiDB');

               
                    const foundUser= await tenant.findOne({email: tenantEmail})
                    // console.log(foundUser)
                    console.log('User exists')

                    foundUserEmail=foundUser.email
                    foundUserPass=foundUser.password

                    if(foundUser){
                        resp.redirect('/tpass') 
                        

                        app.post('/tpass', function(req, resp){

                            logginPass=req.body.tenantPassword

                            if(logginPass===foundUserPass){
                                console.log('user authenticated')


                                loggedInUser=foundUser.email
                                loggedInUserName=foundUser.firstName
                                resp.redirect('/tdashboard')


                                app.get('/tverify', function(req, resp){
                                    resp.render('tverify', {tenantFname: foundUser.firstName, date: day})
                                    console.log('The tenant opened the form')


                                    // Submitting the form
                                    var formDataA={}
                                    app.post('/tverify', function(req, resp){

                                        formDataA={

                                            surname: req.body.surnameInput,
                                            otherNames:req.body.namesInput,
                                            address: req.body.addressInput,
                                            nationality: req.body.nationalityInput,
                                            localgvt: req.body.lgvtInput,
                                            stateOfOrigin: req.body.soriginInput,
                                            passportNo: req.body.passnoInput,
                                            townVilla: req.body.townInput,
                                            sex: req.body.sexInput,
                                            maritalStatus: req.body.maritalStatus

                                        }

                                        async function updateTenantForm1(){
                                            await mongoose.connect('mongodb+srv://samueltomiloba:bXY7NI8XK5cXddAl@prodcluster.nfnp8jp.mongodb.net/tofunmiDB');

                                            try{

                                                await tenant.updateOne({email: foundUser.email}, {verificationForm1: formDataA})
                                                console.log('updated Form 1 successfully')
                                                resp.redirect('/tverify2')

                                            }catch(err){
                                                console.log(err)
                                            }

                                        }
                                        updateTenantForm1()
                                        
                                    })

                                    // ===============================================
                                    app.get('/tverify2', function(req, resp){
                                        resp.render('tverify2', {tenantFname: foundUser.firstName, date:day})



                                        app.post('/tverify2', function(req, resp){

                                                const formDataB={
        
                                                    age: req.body.ageInput,
                                                    phone:req.body.phoneInput,
                                                    email: req.body.emailInput,
                                                    noOfChildren: req.body.childInput,
                                                    occupation: req.body.professionInput,
                                                    position: req.body.positionInput,
                                                    officeAddr: req.body.busaddrInput,
                                                    townVilla: req.body.townInput,
                                                    identityForm: req.body.identFormInput,
                                                    officialEmail: req.body.busEmailInput,
                                                    kinName: req.body.kinNameInput,
                                                    kinAddr: req.body.kinHomeAddrInput,
                                                    kinPhone: req.body.kinPhoneInput,
                                                    kinRelate: req.body.kinRelInput,
                                                    kinEmail: req.body.kinEmailInput,
                                                    kinWorkAddr: req.body.kinBusAddrInput
        
                                                }

                                                async function updateTenantForm2(){
                                                    await mongoose.connect('mongodb+srv://samueltomiloba:bXY7NI8XK5cXddAl@prodcluster.nfnp8jp.mongodb.net/tofunmiDB');
        
                                                    try{
        
                                                        await tenant.updateOne({email: foundUser.email}, {verificationForm2: formDataB})
                                                        console.log('updated Form 2 successfully')
                                                        resp.redirect('/tverify3')
        
                                                    }catch(err){
                                                        console.log(err)
                                                    }
        
                                                }
                                                updateTenantForm2()
    
                                        })
                                    })
                                    app.get('/tverify3', function(req, resp){
                                        resp.render('tverify3', {tenantFname: foundUser.firstName, date: day})




                                        app.post('/tverify3', function(req, resp){

                                            const formDataC={
    
                                                desire: req.body.desireInput,
                                                influenceFactor:req.body.factorInput,
                                                pets: req.body.petsInput,
                                                petKind: req.body.petKindInput,
                                                vehicles: req.body.vehiclesInput,
                                                salaryAnnual: req.body.salaryInput,
                                                budget: req.body.budgetInput,
                                                sponsor: req.body.sponsorInput,
                                                currentResAddr: req.body.currentResaddrInput
    
                                            }

                                            async function updateTenantForm3(){
                                                await mongoose.connect('mongodb+srv://samueltomiloba:bXY7NI8XK5cXddAl@prodcluster.nfnp8jp.mongodb.net/tofunmiDB');
    
                                                try{
    
                                                    await tenant.updateOne({email: foundUser.email}, {verificationForm3: formDataC})
                                                    console.log('updated Form 3 successfully')
                                                    resp.redirect('/tverify4')
    
                                                }catch(err){
                                                    console.log(err)
                                                }
    
                                            }
                                            updateTenantForm3()

                                        })
                                    })
                                    
                                    
                                    app.get('/tverify4', function(req, resp){
                                        resp.render('tverify4', {tenantFname: foundUser.firstName, date:day})

                                        app.post('/tverify4', function(req, resp){

                                            const formDataD={
    
                                                intendedOccupants: req.body.occupantsInput,
                                                religion:req.body.religionInput,
                                                otherReligion: req.body.otherReligionInput,
                                                pastorImamName: req.body.leaderInput,
                                                placeOfWorship: req.body.worshipAddrInput,
                                                swiftPossession: req.body.possessionInput,
                                                prevLandlordName: req.body.landlordNameInput,
                                                prevLandlordAddr: req.body.landlordAddrInput,
                                                reasonsForLeaving: req.body.leaveReasonInput,
                                                debtsOwed: req.body.debstOwedInput,
                                                debtsAmount: req.body.debtsOwedAmount,
                                                evidence:req.body.evidence,
                                                RemarksPrevPlace: req.body.remarksPrevious
    
                                            }
                                            async function updateTenantForm4(){
                                                await mongoose.connect('mongodb+srv://samueltomiloba:bXY7NI8XK5cXddAl@prodcluster.nfnp8jp.mongodb.net/tofunmiDB');
    
                                                try{
    
                                                    await tenant.updateOne({email: foundUser.email}, {verificationForm4: formDataD})
                                                    console.log('updated Form 4 successfully')
                                                    resp.redirect('/tverify5')
    
                                                }catch(err){
                                                    console.log(err)
                                                }
    
                                            }
                                            updateTenantForm4()

                                        })
                                    })

                                    app.get('/tverify5', function(req, resp){
                                        resp.render('tverify5', {tenantFname: foundUser.firstName, date:day})

                                        app.post('/tverify5', function(req, resp){


                                            const formDataE={
    
                                                guarantor1Name: req.body.guarantNameInput,
                                                guarantor1Phone:req.body.guarantPhoneInput,
                                                guarantor1Addr: req.body.guarantAddrInput,
                                                guarantor1WorkAddr: req.body.guarantBusaddrInput,
                                                guarantor1Job: req.body.guarantJobInput,
                                                guarantor1Position: req.body.guarantPositionInput,
                                                guarantor1MaritalStatus: req.body.guarantMarriageInput,
                                                guarantor1Email: req.body.guarantEmailInput,
                                                guarantor2Name: req.body.guarantNameInput2,
                                                guarantor2Phone:req.body.guarantPhoneInput2,
                                                guarantor2Addr: req.body.guarantAddrInput2,
                                                guarantor2WorkAddr: req.body.guarantBusaddrInput2,
                                                guarantor2Job: req.body.guarantJobInput2,
                                                guarantor2Position: req.body.guarantPositionInput2,
                                                guarantor2MaritalStatus: req.body.guarantMarriageInput2,
                                                guarantor2Email: req.body.guarantEmailInput2

                                            }
                                            async function updateTenantForm5(){
                                                await mongoose.connect('mongodb+srv://samueltomiloba:bXY7NI8XK5cXddAl@prodcluster.nfnp8jp.mongodb.net/tofunmiDB');
                                                uniqueTenantCode=ucode()

                                                try{
    
                                                    await tenant.updateOne({email: foundUser.email}, {verificationForm5: formDataE})
                                                    await tenant.updateOne({email: foundUser.email}, {utc: uniqueTenantCode})
                                                    console.log('updated Form 5 successfully')
                                                    resp.redirect('/tdashboard')
    
                                                }catch(err){
                                                    console.log(err)
                                                }
    
                                            }
                                            updateTenantForm5()

                                        })
                                    })

                                })

                                app.get('/uniquepage', function(req, resp){
                                    
                                   

                                    async function obtainCode(){
                                        let uniqueTenantCode=''
                                        await mongoose.connect('mongodb+srv://samueltomiloba:bXY7NI8XK5cXddAl@prodcluster.nfnp8jp.mongodb.net/tofunmiDB');

                                        try{

                                            let checkingUser= await tenant.findOne({email: foundUser.email})

                                            console.log(checkingUser.verificationForm5)
                                            if(!checkingUser.verificationForm5){
                                
                                                uniqueTenantCode= 'You have not not been verified. Fill in the verification forms to obtain your uniqe tenant code'

                                            }else{
                                                uniqueTenantCode=checkingUser.utc
                                                await tenant.updateOne({email: checkingUser.email}, {utc: uniqueTenantCode})
                                            }
                                            resp.render('uniquepage', {tenantFname: foundUser.firstName, uniqueCode: uniqueTenantCode, date:day})

                                        }catch(err){
                                            console.log(err)
                                        }

                                        

                                    }
                                    obtainCode()



                                })

                                app.get("/care", function(req, resp){

                                    resp.render("care", {tenantFname: foundUser.firstName, date:day})
                                
                                })

                            }else{
                                console.log("there's something wrong with your password")
                                resp.redirect('/tlogin')
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
                    await mongoose.connect('mongodb+srv://samueltomiloba:bXY7NI8XK5cXddAl@prodcluster.nfnp8jp.mongodb.net/tofunmiDB');

                    const foundUser= await agent.findOne({email: agentEmail})

                    foundUserEmail=foundUser.email
                    foundUserPass=foundUser.password
                    
                    if(foundUser){
                        console.log("User found")
                        resp.render('apass') 
                        loggedInAgentName=foundUser.firstName
                        console.log(foundUser)
                        app.post('/apass', function(req, resp){

                            logginPass=req.body.agentPassword    
                            // console.log(logginPass)
                            if(logginPass===foundUserPass){
                                console.log("Agent authenticated")
                
                                resp.render('adashboard', {agentFname: foundUser.firstName, date:day})


                                app.get('/averify', function(req, resp){
                                    resp.redirect('/averify')
                                })
                                app.get('/acare', function(req, resp){
                                    resp.redirect('/acare')
                                })
                                app.get('/ainfo', function(req, resp){
                                    resp.redirect('/ainfo')
                                })
                                app.get('/asecurity', function(req, resp){
                                    resp.redirect('/asecurity')
                                })


                                app.post('/averify', function(req, resp){

                                    async function agentInvestigation(){

                                        await mongoose.connect('mongodb+srv://samueltomiloba:bXY7NI8XK5cXddAl@prodcluster.nfnp8jp.mongodb.net/tofunmiDB');
                                        try{

                                            let targetInvestigation= new investigation({

                                                tenantName: req.body.tenantNameInput,
                                                utc:req.body.utcInput,
                                                properyName:req.body.propertyNameInput,
                                                maritalStatus: req.body.marriageInput,
                                                addressofPlace:req.body.addressInput,
                                                leaveReason: req.body.reasonInput,
                                                occupants:req.body.occupantsInput,
                                                owingDebts:req.body.debtsInput,
                                                debtAmount: req.body.debtAmountInput,
                                                evidence: req.body.evidence,
                                                landlordName: req.body.landlordNameInput,
                                                landlordPhone: req.body.landlordPhoneInput,
                                                landlordRemarks: req.body.remarksInput


                                            })
                                            targetInvestigation.save()
                                            resp.redirect('/adashboard')
                                            console.log('form data saved successfully')

                                        }catch(err){
                                            console.log(err)
                                        }
                                    }
                                    agentInvestigation()
                                })
                            }else{
                                console.log("THere's something wrong with your password")
                                resp.redirect('/alogin')
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

app.post('/app', function(req, resp){
  
    const targetUtc= req.body.utcInput

    async function validateTenant(){

        await mongoose.connect('mongodb+srv://samueltomiloba:bXY7NI8XK5cXddAl@prodcluster.nfnp8jp.mongodb.net/tofunmiDB');

        try{
            
            let clientSide= await tenant.findOne({utc: targetUtc})
            let agentSide= await investigation.findOne({utc: targetUtc})
            console.log(clientSide)
            console.log(agentSide)

            if(clientSide.verificationForm4.debtAmount === agentSide.debtAmount){
                console.log('Cleared')
                // req.body.utcInput= targetUtc
                resp.render('app', {debt: 'Nothing', tenant: agentSide.tenantName, status: 'Cleared', date:day})
            }else{
                console.log('Not Cleared');

                // req.body.utcInput= targetUtc
                resp.render('app', {debt: agentSide.debtAmount, tenant: agentSide.tenantName, status: 'Not Cleared', date:day})
            }
        }catch(err){
            console.log(err)
        }

    }  
    validateTenant()  
    
})

app.get('/logout', function(req, resp){
    resp.redirect('/')
})