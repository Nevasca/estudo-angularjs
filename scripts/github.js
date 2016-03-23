(function() {

	var github = function($http) {

		var getUser = function(username) {
			return $http.get("https://api.github.com/users/" + username)
				.then(function(response) {
					return response.data;
				});
		};

		var getRepos = function(user) {
			$http.get($scope.user.repos_url)
				.then(function(response) {
					return response.data;
				});
		};

		return {
			getUser: getUser,
			getRepos: getRepos
		};

	};

	var module = angular.module("githubViewer"); //Pega a referência de um module existente
	module.factory("github", github);

}());