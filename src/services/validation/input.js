const Joi = require('joi');

const schema = Joi.object({
  numeroDoDocumento: Joi.alternatives()
    .try(
      Joi.string().pattern(/^\d{11}$/, 'cpf'),
      Joi.string().pattern(/^\d{14}$/, 'cnpj'),
    ).required()
    .messages({
      'alternatives.match': '"numeroDoDocumento" does not match "cpf" or "cnpj"',
      'any.required': '"numeroDoDocumento" is required',
    }),
  tipoDeConexao: Joi.string()
    .valid('monofasico', 'bifasico', 'trifasico')
    .required()
    .messages({
      'string.base': '"tipoDeConexao" should be a "string"',
      'string.empty': '"tipoDeConexao" cannot be an empty field',
      'any.required': '"tipoDeConexao" is required',
    }),
  classeDeConsumo: Joi.string()
    .valid(
      'residencial',
      'industrial',
      'comercial',
      'rural',
      'poderPublico',
    ).required()
    .messages({
      'string.base': '"classeDeConsumo" should be a "string"',
      'string.empty': '"classeDeConsumo" cannot be an empty field',
      'any.required': '"classeDeConsumo" is required',
    }),
  modalidadeTarifaria: Joi.string()
    .valid('azul', 'branca', 'verde', 'convencional')
    .required()
    .messages({
      'string.base': '"modalidadeTarifaria" should be a "string"',
      'string.empty': '"modalidadeTarifaria" cannot be an empty field',
      'any.required': '"modalidadeTarifaria" is required',
    }),
  historicoDeConsumo: Joi.array()
    .required()
    .min(3)
    .max(12)
    .items(Joi.number()
      .integer()
      .max(9999)
      .min(0)),
});

module.exports = (obj) => schema.validate(obj);
