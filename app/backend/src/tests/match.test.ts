import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Tesstes da camada service da match', () => {
  let chaiHttpResponse: Response;

  it('findAllMatchs', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches');

    expect(chaiHttpResponse.body.length).to.be.equal(48);
  })

  it('findAllMatchs in progress', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');

    expect(chaiHttpResponse.body.length).to.be.equal(8);
  })
  it('findAllMatchs Finished', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');

    expect(chaiHttpResponse.body.length).to.be.equal(40);
  })
})