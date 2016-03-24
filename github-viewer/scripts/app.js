(function() {

	var app = angular.module("githubViewer", ["ngRoute"]);

	app.config(function($routeProvider) { //Inicia as configuracoes do modulo

		$routeProvider
			.when("/main", { //Quando a URL do navegador for .../main, sera identificado e trocara o template e a controller responssaveis
				templateUrl: "main.html",
				controller: "MainController"
			})
			.when("/user/:username", { //Registra mais um novo route, com o parametro username na url (usar ":" para dizer que sera um parametro)
				templateUrl: "user.html",
				controller: "UserController"
			})
			.when("/repo/:username/:reponame", {
				templateUrl: "repo.html",
				controller: "RepoController"
			})
			.otherwise({redirectTo: "/main"}); //Se a URL for desconhecida, redirecionar para /main
	});

}());