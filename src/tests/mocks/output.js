const classeDeConsumoInvalid = {
  "elegível": false,
	"razoesInelegibilidade": [
    "Classe de consumo não atendida",
  ]
};

const modalidadeTarifariaInvalid = {
  "elegível": false,
	"razoesInelegibilidade": [
    "Modalidade tarifária não aceita",
  ]
};

const historicoDeConsumoInvalid = {
  "elegível": false,
	"razoesInelegibilidade": [
    "Consumo muito baixo para tipo de conexão",
  ]
};

const classeAndModalidadeInvalid = {
  "elegível": false,
	"razoesInelegibilidade": [
    "Classe de consumo não atendida",
    "Modalidade tarifária não aceita",
  ]
};

const modalidadeAndHistoricoInvalid = {
  "elegível": false,
	"razoesInelegibilidade": [
    "Modalidade tarifária não aceita",
    "Consumo muito baixo para tipo de conexão",
  ]
};

const valid = {
  "elegível": true,
  "economiaAnualDeCO2": 5553.24,
};

module.exports = {
  classeDeConsumoInvalid,
  modalidadeTarifariaInvalid,
  historicoDeConsumoInvalid,
  classeAndModalidadeInvalid,
  modalidadeAndHistoricoInvalid,
  valid,
};
