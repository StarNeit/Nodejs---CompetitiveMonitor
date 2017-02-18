/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  	res.render('home', {
		title: 'Search Company',
		companies: ''
	});
};		


/**
 * POST /
 * Post Search Term.
 */
exports.searchCompany = (req, res, next) => {
	console.log('searchCompany');
	req.assert('search_term', 'Search term cannot be blank').notEmpty();
	req.assert('_csrf', 'Your session is ended, please login again.').notEmpty();

	const errors = req.validationErrors();

	if (errors) {
		req.flash('errors', errors);
		return res.redirect('/');
	}
	search_term = req.body.search_term;
	//page_number = req.body.page_number;
	page_number = 1;

	console.log('search_term:' + search_term);
	console.log('page_number:' + page_number);

	//Get Company information from OpenCorporates.com
  	var http = require('http');
  	http.get({
	    host: 'api.opencorporates.com',
	    path: '/v0.4/companies/search?q=' + search_term + '&page=' + page_number
	}, function(response) 
	{
	    var body = '';
	    // get all data from the stream
	    response.on('data', function(data) {
	    	body += data;
	    });

	    response.on('end', function() {
	        // all data received
	       var jsonObject = JSON.parse(body);

	       var total_count = jsonObject.total_count;
	       var total_pages = jsonObject.total_pages;
	       var per_page = jsonObject.per_page;

	       /*console.log(jsonObject.results.companies);
	       console.log(jsonObject.results.companies.length);
	       for (var i = 0 ; i < jsonObject.results.companies.length; i ++)
	       		console.log(jsonObject.results.companies[i].company.name);*/


	       	var oc_companies = jsonObject.results.companies;

	       	//Get Company information from Crunchbase.com
	       	http.get({
	       		host: 'api.crunchbase.com',
	       		path: '/v/3/odm-organizations?user_key=a1043dc7fb668947c17bb46d5bfeb991&query=' + search_term + '&page=' + page_number
	       	}, function(response2)
	       	{
	       		var body2 = '';
	       		response2.on('data', function(data){
	       			body2 += data;
	       		});
	       		response2.on('end', function(){
	       			var jsonObject2 = JSON.parse(body2);
	       			//console.log(jsonObject2.data.items);
	       			var cr_companies = jsonObject2.data.items;

			       	res.render('home', {
						title: 'Search Company',
						search_term: search_term,
						oc_companies: oc_companies,
						cr_companies: cr_companies
					})
	       		});
	       	});
	    });
	});
};
