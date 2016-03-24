(function() {

	var app = angular.module("githubViewer"); //Pega a referencia do modulo criado em app.js

	var UserController = function($scope, github, $routeParams) {

		var onUserComplete = function(data) {
			$scope.user = data; //O Angular converte automaticamente JSON para objeto javascript
			$scope.error = "";
			github.getRepos($scope.user).then(onRepos, onError);
		};

		var onRepos = function(data) {
			$scope.repos = data;
			//$location.hash("userDetails");
			//$anchorScroll();
		};

		var onError = function(reason) {
			$scope.error = "Não foi possível consultar os dados.";
		};

		$scope.username = $routeParams.username; //Pega o parametro na url, caso informado, com o mesmo nome da propriedade	
		$scope.reposOrderBy = "-stargazers_count";
		github.getUser($scope.username).then(onUserComplete, onError);
	};

	app.controller("UserController", UserController); //Informa o nome de um controller e a função dele

}());