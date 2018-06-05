/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Lim Cheng Qing
 * Email: limche@oregonstate.edu
 */

	var path = require('path');
	var express = require('express');
	var exphbs = require('express-handlebars');
	var fs = require('fs');
	var app = express();

	app.engine('handlebars', exphbs({defaultLayout: 'main'}));
	app.set('view engine', 'handlebars');

	var port = process.env.PORT || 3000;

	var rawData = fs.readFileSync('./twitData.json');
	var twitData = JSON.parse(rawData); //get the tweet data (text/authors)


	app.get('/', function (req, res) {
	  res.status(200).render('newView', {
		  data: twitData, 
		  index: 1
	  }); 
	});

	app.get('/twits/%3C:twit%3E', function (req, res){
    	var twitId = req.params.twit;
		console.log(twitId);
		var singleTwitArray = [];
		if((twitId >= twitData.length) || (twitId < 0)){ 
			res.status(404).render('error');
		}
    		else if (typeof twitId == "string") {
            		res.status(404).render('error');
		}
		else{ 
            console.log(twitId);
			singleTwitArray.push(twitData[twitId]); 
			res.status(200).render('newView', {data: singleTwitArray, index: 0}); 
		}
	});

	app.use(express.static('public'));

	app.get('*', function (req, res) {
	  res.status(404).render('error');
	});

	app.listen(port, function () {
	  console.log("Server is listening on port ", port);
	});
