(function(){

	var app = angular.module("produtoResourceMock", ["ngMockE2E"]);

	//Usado para simular um backend nao disponivel no momento
	app.run(function($httpBackend) {

		var produtos = [
			{"id": 1,
			 "nome": "Prince of Thorns",
			 "codigo": "LIV-0001",
			 "dataLancamento": new Date("2014-10-30"),
			 "custo": 40.50,
			 "preco": 54.90,
			 "descricao": "Ainda criança, o príncipe Honório Jorg Ancrath testemunhou o brutal assassinato da Rainha mãe e de seu irmão caçula, William. Jorg não conseguiu defender sua família nem fugir do horror. Jogado à própria sorte num arbusto de roseira-brava, ele permaneceu imobilizado pelos espinhos que rasgavam profundamente sua pele, e sua alma. O príncipe dos espinhos se vê, então, obrigado a amadurecer para saciar o seu desejo de vingança e poder. Vagando pelas estradas do Império Destruído, Jorg Ancrath lidera uma irmandade de assassinos, e sua única intenção é vencer o jogo. O jogo que os espinhos lhe ensinaram.",
			 "imagemUrl": "http://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=5179959&qld=90&l=370&a=-1"
			},
			{"id": 2,
			 "nome": "King of Thorns",
			 "codigo": "LIV-0002",
			 "dataLancamento": new Date("2015-03-19"),
			 "custo": 50.90,
			 "preco": 64.90,
			 "descricao": "O jovem Jorg agora encara um inimigo carismático e poderoso – o Princípe de Arrow –, que parece destinado a reunir o Império Destruído. A ação salta entre o presente e o passado, e nos mostra como Jorg viajou pelo império e conseguiu reunir recursos e forças para enfrentar uma batalha aparentemente impossível de ser vencida. Acompanhamos também a história pelo ponto de vista de Katherine, a mulher que Jorg deseja mais do que ninguém, e que ele está destinado a não conquistar jamais.",
			 "imagemUrl": "http://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=7379531&qld=90&l=370&a=-1"
			},
			{"id": 3,
			 "nome": "Emperor of Thorns",
			 "codigo": "LIV-0003",
			 "dataLancamento": new Date("2015-09-15"),
			 "custo": 55.90,
			 "preco": 64.90,
			 "descricao": "A aclamada Trilogia dos Espinhos chega ao seu grande final, depois de termos acompanhado a dolorosa e supreendente infância e adolescência de Jorg Ancrath em Prince of Thorns e King of Thorns, com todo o brilhantismo, charme, violência extrema e total crueldade deste egomaníaco romântico. Conforme Jorg cresce, seu caráter muda e ele parece encontrar algum equilíbrio em suas tendências sociopatas. Em Emperor of Thorns, vamos novamente tomando contato com as atribulações de Jorg e sua fixação em conquistar o Império Destruído com saltos entre o presente e o passado, assim como Mark Lawrence já havia feito no volume anterior. Com isso, vamos descobrindo, desvendando e nos surpreendendo com o mundo onde a história se passa e com as saídas e escolhas nada tradicionais ou lógicas que Jorg se vê obrigado a tomar em seu caminho ao trono.",
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