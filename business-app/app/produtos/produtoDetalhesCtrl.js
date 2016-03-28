(function(){

	angular
		.module("gestaoProdutos")
		.controller("ProdutoDetalhesCtrl", ["$scope", "produto", "produtoService", ProdutoDetalhesCtrl]);

	function ProdutoDetalhesCtrl($scope, produto, produtoService) {

		$scope.produto = produto;
		/*$scope.produto = {"id": 1,
			 "nome": "Prince of Thorns",
			 "codigo": "LIVRO-0001",
			 "dataLancamento": "30/10/2014",
			 "preco": 54.90,
			 "imagemUrl": "http://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=5179959&qld=90&l=370&a=-1"
		};*/

		$scope.titulo = "Detalhes do Produto: " + $scope.produto.nome;
		$scope.margemPorcentagem = produtoService.calcularMargemPorcentagem($scope.produto.preco, $scope.produto.custo);

	}

}());