const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const Produto = require ('./model/Produto')
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');
app.set('views', './views');



const port = 3000
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/cadastroProduto', urlencodedParser, (req, res) => {
    var valorRecebido = req.body.valor;
    var nomeRecebido = req.body.nome;
    var fotoRecebida = req.body.foto;
    var qtdEstoqueRecebido = req.body.qtdEstoque;
    var detalhesRecebido = req.body.detalhes;

Produto.insereProduto(valorRecebido,nomeRecebido,fotoRecebida,qtdEstoqueRecebido,detalhesRecebido);
    
});

app.post('/cadastroProduto', urlencodedParser, (req, res) => {
    var nome = req.body.nome;
    var precoMaximo = req.body.precoMaximo;
    console.log(nome);
    console.log(precoMaximo);
    res.send('Muito caro!');
});

app.get("/produtos/:codigo", (req, res) => {
    var codigoQueVeio = req.params.codigo;
    console.log("Codigo enviado:" + codigoQueVeio)

    var todosProdutos = "";
    for (var i = 0; i < produtos.length; i++) {
        todosProdutos += "<p>  <b> Nome: " + produtos[i].nome + "<br> " + "Preço:" + produtos[i].preco; +"</p>"
    }
    res.send(todosProdutos);
})

app.get("/produtos", (req, res) => {
    var todosProdutos = "";
    for (var i = 0; i < produtos.length; i++) {
        todosProdutos += "<p> <b> Nome: " + produtos[i].nome + "<br> " + "Preço:" + produtos[i].preco; +"</p>"
    }
    res.send(todosProdutos);
})


app.get("/buscaprodutos", (req,res)=>{
   // var codigoProcurado = req.query.codigo;


    var nomeProduto=req.query.nome
    var valorProduto=parseFloat(req.query.valor);

    Produto.Produto.findAll({
    where:{[Op.and]: [{nome:nomeProduto}, {valor:valorProduto}]
    }
}
    ).
    then(function (produtos) {
        console.log(produtos);
        var tabela= "";
        for(var i = 0; i< produtos.length; i++){
        tabela +="Id:" + produtos[i]["id"];
        tabela +="Nome:" + produtos[i]["nome"];
        tabela +="Valor:" + produtos[i]["valor"];
        tabela+="<br>";
        }
        console.log(tabela);
        res.send(tabela);
      })
      .catch(function(erro) {
        console.log("Erro na busca: " + erro);
        res.send("Erro na busca")
      });
})


app.post('/atualizarProduto', urlencodedParser,(req, res)=>{

    var valorAtual=req.body.valor;
    var idProduto=req.body.id;


    Produto.Produto.update({valor:valorAtual},{

        where:{
            id:idProduto
        }
    }).then(function(){
console.log("alteração realizada com sucesso !!")
res.send("Alteração realizada com sucesso !! ")
    }).catch(function(erro){

        console.log("erro na alteração"+erro);
        res.end("Houve erro na alteração ")
    })


    })

app.post('/excluiProduto',urlencodedParser,(req,res) => {
   var idProduto =req.body.id;
   Produto.Produto.destroy({
    where:{
       id:idProduto

    }
}).then(function(){
    console.log("Exclusão realizada com sucesso !!")
    res.send("Exclusão realizada com sucesso !!")
}).catch(function(erro){
    console.log("erro na exclusão "+erro);
    res.send("Houve erro na exclusão");
})
})



app.listen(port, () => {
    console.log(`Esta aplicação está escutando a porta ${port}`)
})