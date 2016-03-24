(function() {

	var github = function($http) {

		//Retorna um usuario com o username informado
		var getUser = function(username) {
			return $http.get("https://api.github.com/users/" + username)
				.then(function(response) {
					return response.data;
				});
		};

		//Retorna o array de repositorios de um usuario
		var getRepos = function(user) {
			return $http.get(user.repos_url)
					.then(function(response) {
						return response.data;
					});
		};

		//Retorna os detalhes de um repositorio especifico
		var getReposDetails = function(username, reposName) {
			return $http.get("https://api.github.com/repos/" + username + "/" + reposName)
				.then(function(response) {
					return response.data;
				});
		};

		//Retorna o array de contribuidores de um repositorio especifico
		var getReposContributors = function(repos) {
			return $http.get(repos.contributors_url)
				.then(function(response) {
					return response.data;
				});
		};

		return {
			getUser: getUser,
			getRepos: getRepos,
			getReposDetails: getReposDetails,
			getReposContributors: getReposContributors
		};

	};

	var module = angular.module("githubViewer"); //Pega a referência de um module existente
	module.factory("github", github);

}());