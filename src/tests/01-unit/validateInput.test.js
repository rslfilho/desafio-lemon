const { expect } = require('chai');
const sinon = require('sinon');

const { validateInput } = require('../../middlewares');
const validationService = require('../../services/validation');
const { validateErrors, input } = require('../mocks');

const getErrorFromMessage = (message) => ({
  statusCode: 400,
  code: 'bad_request',
  message,
});

describe('O middleware de validação do input', () => {
  const response = {};
  const request = {};
  let next;

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    next = sinon.stub().returns();
  });

  describe('quando acontece um erro', () => {
    describe('pois "numeroDoDocumento" não foi enviado na requisição', () => {
      const validateReturn = validateErrors.numeroDoDocumentoRequired;
      const { error } = validateReturn;

      before(() => {
        sinon.stub(validationService, 'input').returns(validateReturn);
        request.body = input.errorNumeroDoDocumento;
      });
  
      after(async () => {
        await validationService.input.restore();
        request.body = undefined;
      });

      it('a função next é chamada com o parâmetro esperado', async () => {
        await validateInput(request, response, next);
        expect(next.calledWith(getErrorFromMessage(error.message))).to.be.true;
      });
    });

    describe('pois o "tipoDeConexao" é inválido', () => {
      const validateReturn = validateErrors.tipoDeConexaoInvalid;
      const { error } = validateReturn;

      before(() => {
        sinon.stub(validationService, 'input').returns(validateReturn);
        request.body = input.errorTipoDeConexao;
      });
  
      after(async () => {
        await validationService.input.restore();
        request.body = undefined;
      });

      it('a função next é chamada com o parâmetro esperado', async () => {
        await validateInput(request, response, next);
        expect(next.calledWith(getErrorFromMessage(error.message))).to.be.true;
      });
    });

    describe('pois a "classeDeConsumo" é inválida', () => {
      const validateReturn = validateErrors.classeDeConsumoInvalid;
      const { error } = validateReturn;

      before(() => {
        sinon.stub(validationService, 'input').returns(validateReturn);
        request.body = input.errorClasseDeConsumo;
      });
  
      after(async () => {
        await validationService.input.restore();
        request.body = undefined;
      });

      it('a função next é chamada com o parâmetro esperado', async () => {
        await validateInput(request, response, next);
        expect(next.calledWith(getErrorFromMessage(error.message))).to.be.true;
      });
    });

    describe('pois a "modalidadeTarifaria" é inválida', () => {
      const validateReturn = validateErrors.modalidadeTarifariaInvalid;
      const { error } = validateReturn;

      before(() => {
        sinon.stub(validationService, 'input').returns(validateReturn);
        request.body = input.errorModalidadeTarifaria;
      });
  
      after(async () => {
        await validationService.input.restore();
        request.body = undefined;
      });

      it('a função next é chamada com o parâmetro esperado', async () => {
        await validateInput(request, response, next);
        expect(next.calledWith(getErrorFromMessage(error.message))).to.be.true;
      });
    });

    describe('pois o "historicoDeConsumo" é inválido', () => {
      const validateReturn = validateErrors.historicoDeConsumoInvalid;
      const { error } = validateReturn;

      before(() => {
        sinon.stub(validationService, 'input').returns(validateReturn);
        request.body = input.errorHistoricoDeConsumo;
      });
  
      after(async () => {
        await validationService.input.restore();
        request.body = undefined;
      });

      it('a função next é chamada com o parâmetro esperado', async () => {
        await validateInput(request, response, next);
        expect(next.calledWith(getErrorFromMessage(error.message))).to.be.true;
      });
    });
  });

  describe('quando os dados são válidos', () => {
    before(() => {
      sinon.stub(validationService, 'input').returns({ value: true });
      request.body = input.elegible;
    });

    after(async () => {
      await validationService.input.restore();
      request.body = undefined;
    });

    it('a função next é chamada sem parâmetros', async () => {
      await validateInput(request, response, next);
      expect(next.called).to.be.true;
    });
  });
});