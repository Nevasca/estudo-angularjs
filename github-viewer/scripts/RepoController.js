(function(){
	
	var app = angular.module("githubViewer");

	var RepoController = function($scope, github, $routeParams) {

		var onRepoComplete = function(data) {
			$scope.repos = data;
			github.getReposContributors($scope.repos).then(onContributors, onError);
		};

		var onContributors = function(data) {
			$scope.contributors = data;
		};

		var onError = function(reason) {
			$scope.error = "Não foi possível consultar os dados";
		};

		$scope.username = $routeParams.username;
		$scope.reponame = $routeParams.reponame;
		//Chama o metodo do servico github para obter os detalhes do repositorio, usando os parametros da url
		github.getReposDetails($scope.username, $scope.reponame).then(onRepoComplete, onError);

	};

	app.controller("RepoController", RepoController);

}());