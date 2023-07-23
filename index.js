const bodyParser = require("body-parser");
const express = require("express");
const flash = require("express-flash");
const app = express();
const session = require('express-session');

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use(session({
    secret:'Keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{secure: true }
}))


app.use(flash())

app.get('/',(req,res)=>{

  res.render("index");

})

app.post('/form',(req,res)=>{

    var {nome,email,pontos} = req.body;

    var emailError;
    var pontosError;
    var nomeError;

    if(email == undefined || email == ""){
        emailError = "O e-mail não pode ser vazio";
    }

    if(pontos == undefined || pontos < 20){
        pontosError = "Você não pode ter menos de 20 pontos "
    }

    if(nome == undefined || nome == "" || nome.length < 4){

        nomeError == "O nome não pode ser vazio "
     }

     if(nome.length < 4){

        nomeError = "O nome deve ser maior que 4 caracteres "

     }

    if(emailError != undefined || pontosError != undefined || nomeError != undefined){
        
        res.redirect("/");

    }else{

        res.send("SHOW DE BOLA ESSE FORM!")
    }

})


app.listen(5678,()=>{
    console.log('servidor rodando')
})