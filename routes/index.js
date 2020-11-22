var conn = require('./../inc/db');
var express = require('express');
var menus = require('./../inc/menus');
var reservations = require('./../inc/reservations');
var contacts = require('./../inc/contacts');
var emails = require('./../inc/emails');
var router = express.Router();

module.exports = function(io){
	
	/* GET home page. */
	router.get('/', function(req, res, next) {

	  menus.getMenus().then(results => {

		res.render('index', { 
		  title: 'Restaurante Saboroso!',
		  menus: results,
		  isHome: true
		});

	  });

	});

	router.get('/contacts', function(req, res, next) {

	  contacts.render(req,res);

	});

	router.post('/contacts', function(req, res, next) {

	  if (!req.body.name) {
		contacts.render(req,res,'Digite o nome');
	  } else if (!req.body.email) {
		contacts.render(req,res,'Digite o email');
	  } else if (!req.body.message) {
		contacts.render(req,res,'Digite a sua mensagem');
	  } else {
		//res.send(req.body); //req.body => corpo dos dados que foram enviados pela requisição
		contacts.save(req.body).then(results =>{
			
			req.body = {}; //limpar os campos
			
			io.emit("dashboard update");
			
			contacts.render(req,res,null, "Mensagem enviada com sucesso!");
			
		}).catch(err=>{
			contacts.render(req, res, err.message);
		});
	  }

	});

	router.get('/menus', function(req, res, next) {

	  menus.getMenus().then(results => {

		res.render('menus', { 
		  title: 'Menus - Restaurante Saboroso!',
		  background: 'images/img_bg_1.jpg',
		  h1: 'Saboreie nosso menu!',
		  menus: results
		});

	  });
	  
	});

	router.get('/reservations', function(req, res, next) {

	  reservations.render(req,res);

	});

	router.post('/reservations', function(req, res, next) {

	  if (!req.body.name) {
		reservations.render(req,res,'Digite o nome');
	  } else if (!req.body.email) {
		reservations.render(req,res,'Digite o email');
	  } else if (!req.body.people) {
		reservations.render(req,res,'Selecione o número de pessoas');
	  } else if (!req.body.date) {
		reservations.render(req,res,'Selecione a data');
	  } else if (!req.body.time) {
		reservations.render(req,res,'Selecione a hora');
	  } else {
		//res.send(req.body); //req.body => corpo dos dados que foram enviados pela requisição
		reservations.save(req.body).then(results =>{
			
			req.body = {}; //limpar os campos
			
			io.emit("dashboard update");
			
			reservations.render(req,res,null, "Reserva realizada com sucesso!");
			
		}).catch(err=>{
			reservations.render(req, res, err.message);
		});
	  }

	});

	router.get('/services', function(req, res, next) {

	  res.render('services', { 
		title: 'Serviços - Restaurante Saboroso!',
		background: 'images/img_bg_1.jpg',
		h1: 'É um prazer poder servir!'
	  });

	});

	router.post('/subscribe', function(req, res, next) {
		
		emails.save(req).then(results=>{
			
			res.send(results); 
			
		}).catch(err=>{
			
			res.send(err);
			
		});
		
	});
	
	return router;
	
};
