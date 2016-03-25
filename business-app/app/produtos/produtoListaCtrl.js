(function(){

	angular
		.module("gestaoProdutos")
		.controller("ProdutoListaCtrl", ProdutoListaCtrl);

	function ProdutoListaCtrl($scope) {
		$scope.produtos = [
			{"nome": "Prince of Thorns",
			 "codigo": "LIVRO-0001",
			 "dataLancamento": "30/10/2014",
			 "preco": 54.90,
			 "imagemUrl": "http://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=5179959&qld=90&l=370&a=-1"
			},
			{"nome": "King of Thorns",
			 "codigo": "LIVRO-0002",
			 "dataLancamento": "15/03/2015",
			 "preco": 64.90,
			 "imagemUrl": "http://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=7379531&qld=90&l=370&a=-1"
			}
		];

		$scope.mostrarImagem = false;

		$scope.toggleImagem = function() {
			$scope.mostrarImagem = !$scope.mostrarImagem;
		}
	}

}());