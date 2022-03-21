const { expect } = require('chai');
const sinon = require('sinon');

const elegibilityController = require('../../controllers/elegibility');
const elegibilityService = require('../../services/elegibility');
const { input, output } = require('../mocks');

describe('O controller da rota POST/elegibility', () => {
  const response = {};
  const request = {};
  let next;

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    next = sinon.stub().returns();
  });
  
  describe('responde com uma negativa de elegibilidade quando', () => {
    describe('a classe de consumo é inválida', () => {
      before(async () => {
        sinon.stub(elegibilityService, 'check').returns(output.classeDeConsumoInvalid);
        request.body = input.errorClasseDeConsumo;
        await elegibilityController.check(request, response, next);
      });
  
      after(async () => {
        await elegibilityService.check.restore();
        request.body = undefined;
      });
  
      it('a função res.status é chamada com o código 200', () => {
        expect(response.status.calledWith(200)).to.be.true;
      });

      it('res.json é chamado com o objeto esperado', () => {
        expect(response.json.calledWith(output.classeDeConsumoInvalid)).to.be.true;
      });
    });

    describe('a modalidade tarifária é inválida', () => {
      before(async () => {
        sinon.stub(elegibilityService, 'check').returns(output.modalidadeTarifariaInvalid);
        request.body = input.errorModalidadeTarifaria;
        await elegibilityController.check(request, response, next);
      });
  
      after(async () => {
        await elegibilityService.check.restore();
        request.body = undefined;
      });
  
      it('a função res.status é chamada com o código 200', () => {
        expect(response.status.calledWith(200)).to.be.true;
      });

      it('res.json é chamado com o objeto esperado', () => {
        expect(response.json.calledWith(output.modalidadeTarifariaInvalid)).to.be.true;
      });
    });

    describe('a média de consumo é inadequada', () => {
      before(async () => {
        sinon.stub(elegibilityService, 'check').returns(output.historicoDeConsumoInvalid);
        request.body = input.errorHistoricoDeConsumo;
        await elegibilityController.check(request, response, next);
      });
  
      after(async () => {
        await elegibilityService.check.restore();
        request.body = undefined;
      });
  
      it('a função res.status é chamada com o código 200', () => {
        expect(response.status.calledWith(200)).to.be.true;
      });

      it('res.json é chamado com o objeto esperado', () => {
        expect(response.json.calledWith(output.historicoDeConsumoInvalid)).to.be.true;
      });
    });

    describe('a classe de consumo e a modalidade são inválidas', () => {
      before(async () => {
        sinon.stub(elegibilityService, 'check').returns(output.classeAndModalidadeInvalid);
        request.body = input.ineligible;
        await elegibilityController.check(request, response, next);
      });
  
      after(async () => {
        await elegibilityService.check.restore();
        request.body = undefined;
      });
  
      it('a função res.status é chamada com o código 200', () => {
        expect(response.status.calledWith(200)).to.be.true;
      });

      it('res.json é chamado com o objeto esperado', () => {
        expect(response.json.calledWith(output.classeAndModalidadeInvalid)).to.be.true;
      });
    });

    describe('a modalidade tarifária e a média de consumo são inválidas', () => {
      before(async () => {
        sinon.stub(elegibilityService, 'check').returns(output.modalidadeAndHistoricoInvalid);
        request.body = {
          tipoDeConexao: 'bifasica',
          classeDeConsumo: 'comercial',
          modalidadeTarifaria: 'azul',
          historicoDeConsumo: [500, 300, 200],
        };
        await elegibilityController.check(request, response, next);
      });
  
      after(async () => {
        await elegibilityService.check.restore();
        request.body = undefined;
      });
  
      it('a função res.status é chamada com o código 200', () => {
        expect(response.status.calledWith(200)).to.be.true;
      });

      it('res.json é chamado com o objeto esperado', () => {
        expect(response.json.calledWith(output.modalidadeAndHistoricoInvalid)).to.be.true;
      });
    });
  });

  describe('quando response confirmando a elegibilidade', () => {
    before(async () => {
      sinon.stub(elegibilityService, 'check').returns(output.valid);
      request.body = input.elegible;
      await elegibilityController.check(request, response, next);
    });

    after(async () => {
      await elegibilityService.check.restore();
      request.body = undefined;
    });

    it('res.status é chamada com o código 200', () => {
      expect(response.status.calledWith(200)).to.be.true;
    });

    it('res.json é chamado com o token', () => {
      expect(response.json.calledWith(output.valid)).to.be.true;
    });
  });
});