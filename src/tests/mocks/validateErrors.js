const numeroDoDocumentoRequired = {
  error: {
    message: '"numeroDoDocumento" is required',
  }
};

const tipoDeConexaoInvalid = {
  error: {
    message: '"tipoDeConexao" must be one of [monofasico, bifasico, trifasico]',
  }
};

const classeDeConsumoInvalid = {
  error: {
    message: '"classeDeConsumo" must be one of [residencial, industrial, comercial, rural, poderPublico]',
  }
};

const modalidadeTarifariaInvalid = {
  error: {
    message: '"modalidadeTarifaria" must be one of [azul, branca, verde, convencional]',
  }
};

const historicoDeConsumoInvalid = {
  error: {
    message: 'historicoDeConsumo" must contain less than or equal to 12 items',
  }
};

module.exports = {
  numeroDoDocumentoRequired,
  tipoDeConexaoInvalid,
  classeDeConsumoInvalid,
  modalidadeTarifariaInvalid,
  historicoDeConsumoInvalid,
};