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

const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjY5NzUyODQ0fQ.U6RVsKBqZBstVdIRq4piWlu7P5ITBTjLeNSYopa4RPs"
const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJwYXNzd29yZCI6InNlY3JldF91c2VyIiwiaWF0IjoxNjY5NzU5Mjk5fQ.Iqwq79rrv4sFS0gP1I45A0UwkwZ_4SBJDQnCFhTjjas"

describe('Tesstes da camada service do login', () => {
  let chaiHttpResponse: Response;
  
  it('login route success', async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin'});
      
    expect(chaiHttpResponse.status).to.be.equal(200)
  })
  
  it('login route success', async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({ email: 'email invalido', password: 'senha invalida'});
      
    expect(chaiHttpResponse.status).to.be.equal(401)
  })

  it('Role Admin', async () => {
    chaiHttpResponse = await chai.request(app)
      .get('/login/validate')
      .set('Authorization', adminToken)
      
    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body.role).to.be.equal("admin")
  })

  it('Role user', async () => {
    chaiHttpResponse = await chai.request(app)
      .get('/login/validate')
      .set('Authorization', userToken)
      
    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body.role).to.be.equal("user")
  })

  it('Role error', async () => {
    chaiHttpResponse = await chai.request(app)
      .get('/login/validate')
      .set('Authorization', 'wrong token')
      
    expect(chaiHttpResponse.status).to.be.equal(401)
    expect(chaiHttpResponse.body.message).to.be.equal("Token Invalido")
  })
})