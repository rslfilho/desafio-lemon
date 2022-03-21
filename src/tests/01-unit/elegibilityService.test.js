const { expect } = require('chai');
const sinon = require('sinon');

const elegibilityService = require('../../services/elegibility');
const { input, output } = require('../mocks');

describe('O serviço da rota POST/elegibility', () => {
  describe('retorna negando a elegibilidade quando', () => {
    describe('a classe de consumo é inválida', () => {
      let response;

      before(() => {
        response = elegibilityService.check(input.errorClasseDeConsumo);
      });

      it('o retorno é um objeto', async () => {
        expect(response).to.be.an('object');
      });

      it('o objeto tem as chaves "elegível" e "razoesInelegibilidade"', () => {
        expect(response).to.have.all.keys('elegível', 'razoesInelegibilidade');
      });

      it('o objeto é o esperado', () => {
        expect(response).to.deep.equals(output.classeDeConsumoInvalid);
      });
    });

    describe('a modalidade tarifária é inválida', () => {
      let response;

      before(() => {
        response = elegibilityService.check(input.errorClasseDeConsumo);
      });

      it('o retorno é um objeto', async () => {
        expect(response).to.be.an('object');
      });

      it('o objeto tem as chaves "elegível" e "razoesInelegibilidade"', () => {
        expect(response).to.have.all.keys('elegível', 'razoesInelegibilidade');
      });

      it('o objeto é o esperado', () => {
        expect(response).to.deep.equals(output.classeDeConsumoInvalid);
      });
    });

    describe('a média de consumo é inadequada', () => {
      let response;

      before(() => {
        response = elegibilityService.check(input.errorHistoricoDeConsumo);
      });

      it('o retorno é um objeto', async () => {
        expect(response).to.be.an('object');
      });

      it('o objeto tem as chaves "elegível" e "razoesInelegibilidade"', () => {
        expect(response).to.have.all.keys('elegível', 'razoesInelegibilidade');
      });

      it('o objeto é o esperado', () => {
        expect(response).to.deep.equals(output.historicoDeConsumoInvalid);
      });
    });

    describe('a classe de consumo e a modalidade são inválidas', () => {
      let response;

      before(() => {
        response = elegibilityService.check(input.ineligible);
      });

      it('o retorno é um objeto', async () => {
        expect(response).to.be.an('object');
      });

      it('o objeto tem as chaves "elegível" e "razoesInelegibilidade"', () => {
        expect(response).to.have.all.keys('elegível', 'razoesInelegibilidade');
      });

      it('o objeto é o esperado', () => {
        expect(response).to.deep.equals(output.classeAndModalidadeInvalid);
      });
    });

    describe('a modalidade tarifária e a média de consumo são inválidas', () => {
      let response;

      before(() => {
        response = elegibilityService.check({
          tipoDeConexao: 'bifasica',
          classeDeConsumo: 'comercial',
          modalidadeTarifaria: 'azul',
          historicoDeConsumo: [500, 300, 200],
        });
      });

      it('o retorno é um objeto', async () => {
        expect(response).to.be.an('object');
      });

      it('o objeto tem as chaves "elegível" e "razoesInelegibilidade"', () => {
        expect(response).to.have.all.keys('elegível', 'razoesInelegibilidade');
      });

      it('o objeto é o esperado', () => {
        expect(response).to.deep.equals(output.modalidadeAndHistoricoInvalid);
      });
    });
  });

  describe('quando retorna confirmando a elegibilidade', () => {
    let response;
  
    before(() => {
      response = elegibilityService.check(input.elegible);
    });
  
    it('o retorno é um objeto', async () => {
      expect(response).to.be.an('object');
    });

    it('o objeto tem as chaves "elegível" e "economiaAnualDeCO2"', () => {
      expect(response).to.have.all.keys('elegível', 'economiaAnualDeCO2');
    });

    it('o objeto é o esperado', () => {
      expect(response).to.deep.equals(output.valid);
    });
  });
});