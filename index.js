const bodyParser = require("body-parser");
const express = require("express");
const flash = require("express-flash");
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//esse valor aleatorio vai ser usado como base pra gerar os cookies de validação 
app.use(cookieParser("jcmdkljkldsjfldck"));



app.use(session({
    secret:'Keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{maxAge: 60000} //60000 define em quanto tempo o cokies expira eu coloquei uma hora pq isso e um form de teste 
}))






app.use(flash())

app.get('/',(req,res)=>{

   var emailError = req.flash('emailError');
   var pontosError = req.flash('pontosError'); 
   var nomeError = req.flash('nomeError');
   var email = req.flash('email');


   emailError  = (emailError   == undefined   || emailError.length  == 0)? undefined: emailError;
   email = (email == undefined || email.length == 0) ? "" : email;
   pontosError = (pontosError  == undefined   || pontosError.length == 0)? undefined: pontosError;
   nomeError   = (nomeError    == undefined   || nomeError.length   == 0)? undefined: nomeError;

 

   res.render("index",{emailError,pontosError,nomeError,email: email});

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
        //Para que as mensagens de erro possam ser lidas pelo cliente 
        //quando o erro aocntecer elas precisam ser enviadas para o formulario 
        //junto com a rota de redirecionamento
        //pra isso eu uso a função flash da classe de requisição 
        
        req.flash('emailError', emailError);
        req.flash('pontosError', pontosError);
        req.flash('nomeError', nomeError);

        res.redirect("/");

    }else{

        res.send("SHOW DE BOLA ESSE FORM!")
    }

})


app.listen(5678,()=>{
    console.log('servidor rodando')
})