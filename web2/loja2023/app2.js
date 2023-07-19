const express = require('express')
const app = express()
const bodyParser = require("body-parser")
var urlencodedParser = bodyParser.urlencoded({extended:false})


const Sequelize = require('sequelize')
const sequelize = new Sequelize('lojinha','root','localroot',{
	host:'localhost',
	dialect:'mysql'
})
sequelize.authenticate().then(function(){
console.log("Conectado!!")
}).catch(function(erro){
console.log("Erro ao conectar: "+erro)
})

const port = 3000
app.use(express.static('public'));

app.get('/', (req, res) => {
 res.send('E aê!!');
})

app.post('/cadastroProduto',urlencodedParser, (req, res) => {
	var nome = req.body.nome;
	var precoMaximo = req.body.precoMaximo;
	var marca = req.body.marca;
	
	res.send("<b>Nome:</b>"+nome+" <b>Preco Maximo</b>"+precoMaximo+" <b>Marca:</b> "+marca);
})



app.get("/produtos",(req,res)=>{
	var codigoQueVeio = req.query.codigo;
	var nomeProduto = req.query.nome;
	console.log("O codigo enviado foi "+codigoQueVeio);
	console.log("O nome enviado foi "+nomeProduto);
	
	var todosProdutos = "";
	for(var i = 0; i < produtos.length; i++){
		todosProdutos+="<p> <b>Nome:</b> "+produtos[i].nome+" <b>Preço:</b>"+produtos[i].preco;+"</p>";
	}
	
	res.send(todosProdutos);
})



app.listen(port, () => {
 console.log('Esta aplicação está escutando a porta '+port)
})