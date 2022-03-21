const validClasseDeConsumo = ['comercial', 'residencial', 'industrial'];
const validModalidadeTarifaria = ['convencional', 'branca'];

const validateHistoricoDeConsumo = (input) => {
  const minUsage = {
    monofasico: 400,
    bifasico: 500,
    trifasico: 750,
  };
  const { tipoDeConexao, historicoDeConsumo } = input;

  const sumUsage = historicoDeConsumo.reduce((acc, curr) => acc + curr, 0);
  const averageUsage = sumUsage / historicoDeConsumo.length;

  return averageUsage > minUsage[tipoDeConexao];
};

module.exports = (input) => {
  const razoesInelegibilidade = [];

  if (!validClasseDeConsumo.includes(input.classeDeConsumo)) {
    razoesInelegibilidade.push('Classe de consumo não atendida');
  }
  if (!validModalidadeTarifaria.includes(input.modalidadeTarifaria)) {
    razoesInelegibilidade.push('Modalidade tarifária não aceita');
  }
  if (!validateHistoricoDeConsumo(input)) {
    razoesInelegibilidade.push('Consumo muito baixo para tipo de conexão');
  }

  if (razoesInelegibilidade.length > 0) {
    return { elegível: false, razoesInelegibilidade };
  }

  const economiaAnualDeCO2 = (input.historicoDeConsumo
    .reduce((acc, curr) => acc + curr, 0) / 1000) * 84;

  return { elegível: true, economiaAnualDeCO2 };
};
