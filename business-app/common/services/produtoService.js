(function(){

	angular
		.module("common.services")
		.factory("produtoService", produtoService);

	function produtoService() {

		function calcularMargemPorcentagem(preco, custo) {
			var margem = 0;
			if (preco && custo) {
				margem = (100 * (preco - custo)) / preco;
			}
			margem = Math.round(margem);
			return margem;
		}

		function calcularMargemLucro(preco, custo) {
			var margem = 0;
			if(preco && custo) {
				margem = preco - custo;
			}
			return margem;
		}

		function calcularPrecoPorPorcentagem(custo, porcentagem) {
			var preco = custo;
			if(custo && porcentagem) {
				preco = custo + (custo * porcentagem / 100);
				preco = (Math.round(preco * 100)) / 100;
			}
			return preco;
		}

		function calcularPrecoPorLucro(custo, lucro) {
			var preco = custo;
			if(custo && lucro) {
				preco = custo + lucro;
				preco = (Math.round(preco * 100))/ 100;
			}
			return preco;
		}

		return {
			calcularMargemPorcentagem: calcularMargemPorcentagem,
			calcularMargemLucro: calcularMargemLucro,
			calcularPrecoPorPorcentagem: calcularPrecoPorPorcentagem,
			calcularPrecoPorLucro: calcularPrecoPorLucro
		}
	}

}());