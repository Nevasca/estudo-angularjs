(function(){
	
	var app = angular.module("gestaoProdutos", ["common.services", "ui.router", "ui.mask", "ui.bootstrap", "ngMessages", "produtoResourceMock"]); 
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
					abstract: true,
					url: "/produtos/edit/:id",
					templateUrl: "app/produtos/produtoEditView.html",
					controller: "ProdutoEditCtrl",
					resolve: { //Usado para pegar dados antes de carregar a pagina/route
						produtoResource: "produtoResource", //Informa dependencia do produtoResource para fazer a chamada

						produto: function(produtoResource, $stateParams) {
							var id = $stateParams.id;
							return produtoResource.get({id: id}).$promise;
						}
					}
				})
				.state("produtoEdit.info", {
					url: "/info",
					templateUrl: "app/produtos/produtoEditInfoView.html"
				})
				.state("produtoEdit.preco", {
					url: "/preco",
					templateUrl: "app/produtos/produtoEditPrecoView.html"
				})
				//.state("produtoEdit.tags", {
				//	url: "/tags",
				//	templateUrl: "app/produtos/produtoEditTagsView.html"
				//})
				.state("produtoDetalhes", {
					url: "/produtos/:id",
					templateUrl: "app/produtos/produtoDetalhesView.html",
					controller: "ProdutoDetalhesCtrl",
					resolve: { 
						produtoResource: "produtoResource", 

						produto: function(produtoResource, $stateParams) {
							var id = $stateParams.id;
							return produtoResource.get({id: id}).$promise;
						}
					}
				});
		}]
	);

}());