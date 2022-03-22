const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('../../api/app');
const elegibilityService = require('../../services/elegibility');
const { input } = require('../mocks');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST/elegibility', () => {
  describe('Em caso de erro interno', () => {
    let response;

    before(async () => {
      sinon.stub(elegibilityService, 'check').throws();

      response = await chai.request(app)
        .post('/elegibility')
        .send(input.elegible);

      await elegibilityService.check.restore();
    });

    it('retorna o código de status 500', () => {
      expect(response).to.have.status(500);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" possui o texto "Internal Error"', () => {
      expect(response.body.message).to.be.equal('Internal Error');
    });
  });

  describe('Não é possível checar elegibilidade', () => {
    describe('com "numedoDoDocumento faltando no corpo da requisição', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .post('/elegibility')
          .send(input.errorNumeroDoDocumento);
      });

      it('retorna o código de status 400', () => {
        expect(response).to.have.status(400);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto ""numeroDoDocumento" is required"', () => {
        expect(response.body.message).to.be.equal('"numeroDoDocumento" is required');
      });
    });

    describe('com "tipoDeConexao inválida', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .post('/elegibility')
          .send(input.errorTipoDeConexao);
      });

      it('retorna o código de status 400', () => {
        expect(response).to.have.status(400);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto ""tipoDeConexao" must be one of [monofasico, bifasico, trifasico]"', () => {
        expect(response.body.message).to.be.equal('"tipoDeConexao" must be one of [monofasico, bifasico, trifasico]');
      });
    });

    describe('com historicoDeConsumo inválido', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .post('/elegibility')
          .send(input.errorHistoricoDeConsumo);
      });

      it('retorna o código de status 400', () => {
        expect(response).to.have.status(400);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto ""historicoDeConsumo" must contain less than or equal to 12 items', () => {
        expect(response.body.message).to.be.equal('"historicoDeConsumo" must contain less than or equal to 12 items');
      });
    });
  });

  describe('É possível checar elegibilidade', () => {
    describe('com classeDeConsumo inelegível', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .post('/elegibility')
          .send(input.errorClasseDeConsumo);
      });

      it('retorna o código de status 200', () => {
        expect(response).to.have.status(200);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto possui as propriedades "elegível" e "razoesInelegibilidade"', () => {
        expect(response.body).to.have.all.keys('elegível', 'razoesInelegibilidade');
      });

      it('a propriedade "razoesInelegibilidade" possui o texto "Classe de consumo não atendida"', () => {
        expect(response.body.razoesInelegibilidade).to.includes('Classe de consumo não atendida');
      });
    });
    
    describe('com modalidadeTarifaria inelegível', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .post('/elegibility')
          .send(input.errorModalidadeTarifaria);
      });

      it('retorna o código de status 200', () => {
        expect(response).to.have.status(200);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto possui as propriedades "elegível" e "razoesInelegibilidade"', () => {
        expect(response.body).to.have.all.keys('elegível', 'razoesInelegibilidade');
      });

      it('a propriedade "razoesInelegibilidade" possui o texto "Modalidade tarifária não aceita"', () => {
        expect(response.body.razoesInelegibilidade).to.includes('Modalidade tarifária não aceita');
      });
    });

    describe('Com dados elegíveis', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .post('/elegibility')
          .send(input.elegible);
      });
      
      it('retorna o código de status 200', () => {
        expect(response).to.have.status(200);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto possui as propriedades "elegível" e "economiaAnualDeCO2"', () => {
        expect(response.body).to.have.all.keys('elegível', 'economiaAnualDeCO2');
      });

      it('a propriedade "economiaAnualDeCO2" possui o valor 5553.24', () => {
        expect(response.body.economiaAnualDeCO2).to.equals(5553.24);
      });
    });
  });  
});