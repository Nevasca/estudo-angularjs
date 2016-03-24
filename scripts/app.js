(function() {

	var app = angular.module("githubViewer", ["ngRoute"]);

	app.config(function($routeProvider) { //Inicia as configuracoes do Angular

		$routeProvider
			.when("/main", { //Quando a URL do navegador for .../main, sera identificado e trocara o template e a controller responssaveis
				templateUrl: "main.html";
				controller: "MainController"
			})
			.otherwise({redirectTo: "/main"}); //Se a URL for desconhecida, redirecionar para /main
	});

}());