(function(){

	angular
		.module("gestaoProdutos")
		.controller("ProdutoEditCtrl", ["$scope", "produto", "$state", ProdutoEditCtrl]);

	function ProdutoEditCtrl($scope, produto, $state) {

		$scope.produto = produto;

		if($scope.produto && $scope.produto.id) {
			$scope.titulo = "Editar: " + $scope.produto.nome;
		}
		else {
			$scope.titulo = "Novo Produto";
		}
		
		//Usado para abrir o calendario ao clicar no botao	
		 $scope.open = function() {
		    $scope.popup.opened = true;
  		};

  		$scope.popup = {
    		opened: false
  		};
		
		$scope.submit = function(valido) {
			if(valido) {
				$scope.produto.$save(function(data){
					toastr.success("Salvo com sucesso!");
				});
			}
			else
			{
				toastr.error("Verifique o preenchimento.");
			}			
		};

		$scope.cancelar = function() {
			$state.go("produtoLista");
		};
	}

}());