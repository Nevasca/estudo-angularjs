(function(){

	angular
		.module("gestaoProdutos")
		.controller("ProdutoEditCtrl", ["$scope", "produto", "$state", "produtoService", ProdutoEditCtrl]);

	function ProdutoEditCtrl($scope, produto, $state, produtoService) {

		$scope.produto = produto;	
		$scope.formulario = {};
		$scope.formulario.precoOpcao = "percent";		
		

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

		$scope.calcularPreco = function() {
			var preco = 0;
			//console.log("Valor do amount: " + $scope.margemAmount);
			//console.log("Valor do percent: " + $scope.margemPorcentagem);
			//console.log("Valor do custo: " + $scope.produto.custo);

			if($scope.formulario.precoOpcao == "amount") {					
				preco = produtoService.calcularPrecoPorLucro($scope.produto.custo, $scope.formulario.margemAmount);
			}
			if($scope.formulario.precoOpcao == "percent") {
				preco = produtoService.calcularPrecoPorPorcentagem($scope.produto.custo, $scope.formulario.margemPorcentagem);
			}			
			$scope.produto.preco = preco;
		};

		$scope.getMargemPorcentagem = function() {			
			return produtoService.calcularMargemPorcentagem($scope.produto.preco, $scope.produto.custo);
		};
	}

}());