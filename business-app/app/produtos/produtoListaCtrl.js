(function(){

	angular
		.module("gestaoProdutos")
		.controller("ProdutoListaCtrl", ["$scope", "produtoResource", ProdutoListaCtrl]);

	function ProdutoListaCtrl($scope, produtoResource) {		
		
		produtoResource.query(function(data){
			$scope.produtos = data;
		});

		$scope.mostrarImagem = false;

		$scope.toggleImagem = function() {
			$scope.mostrarImagem = !$scope.mostrarImagem;
		}
	}

}());