(function(){

	var app = angular.module("produtoResourceMock", ["ngMockE2E"]);

	//Usado para simular um backend nao disponivel no momento
	app.run(function($httpBackend) {

		var produtos = [
			{"id": 1,
			 "nome": "Prince of Thorns",
			 "codigo": "LIVRO-0001",
			 "dataLancamento": "30/10/2014",
			 "preco": 54.90,
			 "imagemUrl": "http://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=5179959&qld=90&l=370&a=-1"
			},
			{"id": 2,
			 "nome": "King of Thorns",
			 "codigo": "LIVRO-0002",
			 "dataLancamento": "15/03/2015",
			 "preco": 64.90,
			 "imagemUrl": "http://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=7379531&qld=90&l=370&a=-1"
			},
			{"id": 3,
			 "nome": "Emperor of Thorns",
			 "codigo": "LIVRO-0003",
			 "dataLancamento": "15/09/2015",
			 "preco": 64.90,
			 "imagemUrl": "http://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=8246767&qld=90&l=370&a=-1"
			}
		];

		//Url de chamada que vai interceptar
		var produtoUrl = "/api/produtos";

		//Quando receber uma chamada GET, responder com a lista de produtos
		$httpBackend.whenGET(produtoUrl).respond(produtos);

		var editingRegex = new RegExp(produtoUrl + "/[0-9][0-9]*", ''); //Expressao regular

		//Usado para retornar um unico produto, de acordo com o id
		$httpBackend.whenGET(editingRegex).respond(function (method, url, data) {
			var produto = {"id": 0};
			var parametros = url.split('/'); //Quebra a url em arrays divididos pelo '/'
			var tamanho = parametros.length;
			var id = parametros[tamanho - 1]; //O id estara no ultimo elemento do array

			if(id > 0) {
				for (var i = 0; i < produtos.length; i++) {
					if(produtos[i].id == id) {
						produto = produtos[i];
						break;
					}
				}
			}
			//Retorna o codigo 200 (sucesso) e o produto
			return [200, produto, {}];
		});

		$httpBackend.whenPOST(produtoUrl).respond(function(method, url, data) {
			var produto = angular.fromJson(data);
			//Se o produto enviado nao possuir id, significa que e um novo produto
			if(!produto.id) {
				produto.id = produtos[produtos.length - 1].id + 1; //Pega o id do ultimo produto cadastrado e acrescenta 1
				produtos.push(produto);
			}
			else //Caso contrario, atualiza as informacoes do produto existente
			{
				for(var i = 0; i < produtos.length; i++) {
					if(produtos[i].id == produto.id) {
						produtos[i] = produto;
						break;
					}
				}
			}

			return [200, produto, {}];
		});

		//Ignora requisicao de arquivos da aplicacao
		$httpBackend.whenGET(/app/).passThrough();
	});

}());