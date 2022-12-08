import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;


describe('Tesstes da camada service do team', () => {
  let chaiHttpResponse: Response;

  it('findTeams', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams');

    expect(chaiHttpResponse.body.length).to.be.equal(16);
  })

  it('findOneTeam', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams/1');

    expect(chaiHttpResponse.body.id).to.equal(1);
    expect(chaiHttpResponse.body.teamName).to.equal("Avaí/Kindermann");
  })
})