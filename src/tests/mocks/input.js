const elegible = {
  "numeroDoDocumento": "14041737706",
  "tipoDeConexao": "bifasico",
  "classeDeConsumo": "comercial",
  "modalidadeTarifaria": "convencional",
  "historicoDeConsumo": [
    3878,
    9760, 
    5976, 
    2797, 
    2481, 
    5731, 
    7538, 
    4392, 
    7859, 
    4160, 
    6941, 
    4597  
  ],
};

const ineligible = {
  "numeroDoDocumento": "14041737706",
  "tipoDeConexao": "bifasico",
  "classeDeConsumo": "rural",
  "modalidadeTarifaria": "verde",
  "historicoDeConsumo": [
    3878,
    9760,
    5976,
    2797,
    2481,
    5731,
    7538,
    4392,
    7859,
    4160,
  ],
};

const errorNumeroDoDocumento = {
  "tipoDeConexao": "bifasico",
  "classeDeConsumo": "comercial",
  "modalidadeTarifaria": "convencional",
  "historicoDeConsumo": [
    3878,
    9760, 
    5976, 
    2797, 
    2481, 
    5731, 
    7538, 
    4392, 
    7859, 
    4160, 
    6941, 
    4597  
  ],
};

const errorTipoDeConexao = {
  "numeroDoDocumento": "14041737706",
  "tipoDeConexao": "errado",
  "classeDeConsumo": "comercial",
  "modalidadeTarifaria": "convencional",
  "historicoDeConsumo": [
    3878,
    9760, 
    5976, 
    2797, 
    2481, 
    5731, 
    7538, 
    4392, 
    7859, 
    4160, 
    6941, 
    4597  
  ],
};

const errorClasseDeConsumo = {
  "numeroDoDocumento": "14041737706",
  "tipoDeConexao": "bifasico",
  "classeDeConsumo": "rural",
  "modalidadeTarifaria": "convencional",
  "historicoDeConsumo": [
    3878,
    9760, 
    5976, 
    2797, 
    2481, 
    5731, 
    7538, 
    4392, 
    7859, 
    4160, 
    6941, 
    4597  
  ],
};

const errorModalidadeTarifaria = {
  "numeroDoDocumento": "14041737706",
  "tipoDeConexao": "bifasico",
  "classeDeConsumo": "comercial",
  "modalidadeTarifaria": "azul",
  "historicoDeConsumo": [
    3878,
    9760, 
    5976, 
    2797, 
    2481, 
    5731, 
    7538, 
    4392, 
    7859, 
    4160, 
    6941, 
    4597  
  ],
};

const errorHistoricoDeConsumo = {
  "numeroDoDocumento": "14041737706",
  "tipoDeConexao": "bifasico",
  "classeDeConsumo": "comercial",
  "modalidadeTarifaria": "convencional",
  "historicoDeConsumo": [
    200,
    200, 
    200, 
    200, 
    200, 
    200, 
    200, 
    200, 
    200, 
    200, 
    200, 
    200,
    200,
  ],
};

module.exports = {
  elegible,
  ineligible,
  errorNumeroDoDocumento,
  errorTipoDeConexao,
  errorClasseDeConsumo,
  errorModalidadeTarifaria,
  errorHistoricoDeConsumo,
};
