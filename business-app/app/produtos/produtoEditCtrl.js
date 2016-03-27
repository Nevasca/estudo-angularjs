(function(){

	angular
		.module("gestaoProdutos")
		.controller("ProdutoEditCtrl", ["$scope", "produto", ProdutoEditCtrl]);

	function ProdutoEditCtrl($scope, produto) {

		$scope.produto = produto;

		if($scope.produto && $scope.produto.id) {
			$scope.titulo = "Editar: " + $scope.produto.nome;
		}
		else {
			$scope.titulo = "Novo Produto";
		}
	}

}());