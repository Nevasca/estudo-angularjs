(function(){
	angular
		.module("gestaoProdutos")
		.controller("PrecoAnalisesCtrl", ["$scope", "$filter", "produtos", "produtoService", PrecoAnalisesCtrl]);

	function PrecoAnalisesCtrl($scope, $filter, produtos, produtoService) {
		$scope.titulo = "Análise de Preços";

		for(var i = 0; i < produtos.length; i++) {
			produtos[i].marginPercent = produtoService.calcularMargemPorcentagem(produtos[i].preco, produtos[i].custo);
			produtos[i].marginAmount = produtoService.calcularMargemLucro(produtos[i].preco, produtos[i].custo);
		}

		var ordenadoProdutosAmount = $filter("orderBy")(produtos, "marginAmount");
		var filtradoProdutosAmount = $filter("limitTo")(ordenadoProdutosAmount, 5);

		//Gera os dados no formato necessario do angular-chars
		var chartDataAmount = [];
		for(var i = 0; i < filtradoProdutosAmount.length; i++) {
			chartDataAmount.push({
				x: filtradoProdutosAmount[i].nome,
				y: [filtradoProdutosAmount[i].custo,
					filtradoProdutosAmount[i].preco,
					filtradoProdutosAmount[i].marginAmount]
			});
		}
		$scope.dataAmount = {
			series: ["Custo", "Preço", "Margem Quantia"],
			data: chartDataAmount
		};

		//Configuracoes do grafico
		$scope.configAmount = {
			title: "Top $ Margem Produtos",
			tooltips: true,
			labels: false,
			mouseover: function(){},
			mouseout: function(){},
			click: function(){},
			legend: {
				display: true,
				position: 'right'
			}
		};

		var ordenadoProdutosPercent = $filter("orderBy")(produtos, "marginPercent");
		var filtradoProdutosPercent = $filter("limitTo")(ordenadoProdutosPercent, 5);

		//Gera os dados no formato necessario do angular-chars
		var chartDataPercent = [];
		for(var i = 0; i < filtradoProdutosPercent.length; i++) {
			chartDataPercent.push({
				x: filtradoProdutosPercent[i].nome,
				y: [filtradoProdutosPercent[i].marginPercent]
			});
		}
		$scope.dataPercent = {
			series: ["Margem %"],
			data: chartDataPercent
		};

		//Configuracoes do grafico
		$scope.configPercent = {
			title: "Top % Margem Produtos",
			tooltips: true,
			labels: false,
			mouseover: function(){},
			mouseout: function(){},
			click: function(){},
			legend: {
				display: true,
				position: 'right'
			}
		};
	}
}());