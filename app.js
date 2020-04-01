const express = require("express");
const bodyParser = require("body-parser");
const engines = require("consolidate");

var os = require('os');
const cirklepay = require("C://Users/Umer/Desktop/CirklePay-NODE_JAVASCRIPT_LIB/lib");

const app = express();

app.engine("ejs", engines.ejs);
app.set("views", "./views");
app.set("view engine", "ejs");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

//Serves all the request which includes /images in the url from Images folder
app.use('/images', express.static(__dirname + '/Images'));
app.use('/css', express.static(__dirname + '/Css'));
app.use('/js', express.static(__dirname + '/Js'));

cirklepay.Configuration.configure('CRKL5571582984432','5b906261fcac74330d9ea8d8c31c7609','http://localhost:3000/return');

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/cirklepay", (req, res) => {
    console.log(req.body)
    cirklepay.MainController.createTransaction(req.body.amount,
        req.body.firstName,req.body.email,req.body.phone,'TestOrder',cirklepay.Configuration).then((value)=>{
       res.render('form', { 'data':value });
       
    })
});

app.post("/return",(req,res)=>{
    var txnId= req.query.order_id;
    var response = req.body.status;
    console.log(txnId);
    if(response=="success"){
        res.send("success");
    }else{
        res.send("fail");
    }
       
});


app.listen(3000, '0.0.0.0', () => {
    console.log( "Server is up");
    console.log(os.hostname());
});
    