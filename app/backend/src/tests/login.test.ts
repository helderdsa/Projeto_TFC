import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Tesstes da camada service do login', () => {
  let chaiHttpResponse: Response;
  
  it('login route success', async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin'});
      console.log(chaiHttpResponse);
      
    expect(chaiHttpResponse.status).to.be.equal(200)
  })
  
  it('login route success', async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({ email: 'email invalido', password: 'senha invalida'});
      console.log(chaiHttpResponse);
      
    expect(chaiHttpResponse.status).to.be.equal(401)
  })

})