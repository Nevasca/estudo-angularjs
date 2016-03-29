(function(){
	
	var app = angular.module("gestaoProdutos", ["common.services", 
												"ui.router", 
												"ui.mask", 
												"ui.bootstrap", 
												"ngMessages", 
												"angularCharts", 
												"produtoResourceMock"]); 
	//Quando nao for mais usar o falso webservice, retirar a dependencia de 'produtoResourceMock'	

	//Usado para dar uma mensagem de erro personalizada
	app.config(function ($provide) {
		$provide.decorator("$exceptionHandler", 
			["$delegate", 
				function($delegate) {
					return function(exception, cause) {
						exception.message = "Por favor, entre em contato com o Help Desk! \n Mensagem: " +
							exception.message;
						$delegate(exception, cause);
						alert(exception.message);
					};
				}]);
	});

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
				})
				.state("precoAnalises", {
					url: "/precoAnalises",
					templateUrl: "app/precos/precoAnalisesView.html",
					controller: "PrecoAnalisesCtrl",
					resolve: {
						produtoResource: "produtoResource",
						produtos: function(produtoResource) {
							return produtoResource.query(function(response) {
								//Nao e necessario implementar a funcao de sucesso
							},
							function(response) {
								if(response.status == 404) {
									alert("Erro ao acessar o servidor: " + response.config.method + " " + response.config.url);
								}
								else {
									alert(response.statusText);
								}
							}).$promise;
						}
					}					
				});
		}]
	);

}());