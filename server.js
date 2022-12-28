let bodyParser = require("body-parser");
let express = require("express");

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.set("view engine", "ejs");
app.listen(8080);
console.log("Serwer zostal uruchominy na porcie 8080");
let listaWpisow = [];

app.get("/", function(req,res){
    res.render("index", {dane : listaWpisow});
})
app.get("/dodaj", function(req,res){
    res.render("dodaj");
})
app.post("/dodaj", function(req,res){
    
    let opis = req.body['opis'];

    let obj = {
        tytul : req.body['tytul'],
        opis : req.body['opis'],
    }

    listaWpisow.push(obj);
    
    res.render("index", {dane : listaWpisow});
})
app.get("/usun/:id", function(req, res){
    
    let id = req.params.id;
    listaWpisow.splice(id,1);

    res.render("index", {dane : listaWpisow});
});
app.get("/edytuj/:id", function(req, res){
    
    let id = req.params.id;
    let tytul = listaWpisow[id].tytul;
    let opis = listaWpisow[id].opis;

    res.render("edytuj", {tytul : tytul, opis : opis, id : id});
});
app.post("/edytuj/:id", function(req, res){
    
    let id = req.params.id;

    let obj = {
        tytul : req.body['tytul'],
        opis : req.body['opis'],
    }

    listaWpisow[id] = obj;

    res.render("index", {dane : listaWpisow});
});
