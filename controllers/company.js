/**
 * GET /companies
 * List all companies.
 */
const Company = require('../models/Company.js');

exports.getCompanies = (req, res) => {
  Company.find((err, docs) => {
    res.render('companies', { 
    	title: "Saved Companies",
    	companies: docs
    });
  });
};

/**
 * Add /company
 * Add a company.
 */

 exports.addCompanies = (req, res) => {

 	var arr_companies = JSON.parse("["+Object.keys(req.query)[0]+"]");

 	console.log(arr_companies);

 	//console.log("length: " + companies.length);
 	 
	/*
		  var company = new Company({
		  	name: 'test company-hashplay.inc'
		  });

		  company.save((err) => {
		  	if (err) {return next(err);}
		  	res.redirect('/');
		  });
	*/
	for (var i = 0; i < arr_companies.length; i ++)
	{
		var company = new Company(arr_companies[i]);
		company.save();
	}
	if (arr_companies.length > 0)
	{
		res.send(JSON.stringify("Selected companies were added to databases"));	
		//res.redirect('/get/companies');
	}else{
		res.send(JSON.stringify("No companies were added to databases"));	
	}	
 };