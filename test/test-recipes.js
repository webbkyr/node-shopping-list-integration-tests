'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('recipes', function() {
  
  before(function() {
    return runServer();
  });

  after(function(){
    return closeServer();
  });

  it('should list all recipes for GET requests'), function() {
    return chai.request(app)
      .get('/recipes')
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json();
        res.body.should.be.a('array');
        res.body.length.should.be.at.least(1);

        const expectedKeys = ['name', 'id', 'ingredients'];
        res.body.forEach(item => {
          item.should.be.a('object');
          item.should.include.keys(expectedKeys);
        }); 

      });
  };
});
