(function(){
	
	var app = angular.module("gestaoProdutos", ["common.services", "ui.router", "produtoResourceMock"]); 
	//Quando nao for mais usar o falso webservice, retirar a dependencia de 'produtoResourceMock'	

	app.config(["$stateProvider", "$urlRouterProvider",
		function($stateProvider, $urlRouterProvider){
			$urlRouterProvider.otherwise("/");

			$stateProvider
				.state("home", {
					url: "/",
					templateUrl: "app/homeView.html"
				})
				.state("produtoLista", {
					url: "/produtos",
					templateUrl: "app/produtos/produtoListaView.html",
					controller: "ProdutoListaCtrl"
				})
				.state("produtoEdit", {
					url: "/produtos/edit/:id",
					templateUrl: "app/produtos/produtoEditView.html",
					controller: "ProdutoEditCtrl"
				});
		}]
	);
}());