$(document).ready(function() {

  // Place JavaScript code here...
  console.log('ready!!!');

 //  $('#cr_checkbox2').on('ifChecked', function(event){
 //  		alert($('#cr_checkbox1').is(':checked'));	
	//   alert($('#cr_checkbox2').is(':checked'));
	// });
});

function onClickCompanyDetails(name, short_description, profile_image_url, domain, homepage_url, facebook_url, twitter_url, linkedin_url, city_name, region_name, country_code)
{
	 // console.log(name + "," + short_description + "," + profile_image_url + "," + domain + "," + homepage_url + "," + facebook_url + "," + twitter_url + "," + linkedin_url + "," + city_name + "," + region_name + "," + country_code);

	 if (name == 'null'){
	 	name = "";
	 }	 

	 if (short_description == 'null'){
	 	short_description = "";
	 }	 
	 
	 if (facebook_url == 'null'){
	 	facebook_url = "";
	 }	 
	 
	 if (domain == 'null'){
	 	domain = "";
	 }	 
	 
	 if (linkedin_url == 'null'){
	 	linkedin_url = "";
	 }	 
	 
	 if (city_name == 'null'){
	 	city_name = "";
	 }	 

	 if (region_name == 'null'){
	 	region_name = "";
	 }	 
	 
	 if (country_code == 'null'){
	 	country_code = "";
	 }	 
	 

	 if (twitter_url == 'null'){
	 	twitter_url = "";
	 }	 

	 if (homepage_url == 'null'){
	 	homepage_url = "";
	 }	 

	 var prev_text = "";
	 if (profile_image_url != 'null'){
	 	prev_text = "<center><img src="+ profile_image_url + "></center><br>";
	 }
	 
	 prev_text += "Company Name: <label>" + name + "</label><br>" + "Description: <label>" + short_description + "</label><br>" + "Domain: <label>" + domain + "</label><br>"
	 				+ "Homepage: <label>" + homepage_url + "</label><br>" + "Facebook: <label>" + facebook_url + "</label><br>" + "Twitter: <label>" + twitter_url + "</label><br>" + "Linkedin: <label>" + linkedin_url + "</label><br>" + "City: <label>" + city_name + "</label><br>" + "Region: <label>" + region_name + "</label><br>" + "Country: <label>" + country_code + "</label><br>";
	 console.log(prev_text);
	$('#preview').html(prev_text);
}

function onClickCompanyDetails2(name, company_type, registry_url, publisher, registered_address_in_full)
{
	// console.log(name + "," + company_type + "," + registry_url  + "," + publisher + "," + registered_address_in_full);

	if (name == 'null'){
		name = "";
	}

	if (company_type == 'null'){
		company_type = "";
	}

	if (registry_url == 'null'){
		registry_url = "";
	}

	if (publisher == 'null'){
		publisher = "";
	}

	if (registered_address_in_full == 'null'){
		registered_address_in_full = "";
	}

	var prev_text = "";
	prev_text = "Company Name: <label>" + name + "</label><br>" + "Company Type: <label>" + company_type + "</label><br>" + "Registry Url: <label>" + registry_url + "</label><br>" + "Publisher: <label>" + publisher + "</label><br>" + "Registered Address: <label>" + registered_address_in_full + "</label>";
	$('#preview').html(prev_text); 
}

function saveCompanies()
{
	var arrays = [];
	/*
	for (var i = 0; i < 10; i ++){
		var data = {};
		data.name = "name"+i;
		//data.url = "url"+i;
		//data.address = "address"+i;	
		arrays.push(data);
	}	
	console.log(JSON.stringify(arrays));
	*/

	for (var i = 0 ; i < $('#cr_size').val(); i ++)
	{
		//console.log($('#cr_checkbox'+i).is(':checked'));
		//console.log($('#cr_name'+i).val());
		if ($('#cr_checkbox'+i).is(':checked'))
		{
			var data = {};
			data.name = $('#cr_name'+i).val();
			arrays.push(data);
		}
	}

	for (var j = 0; j < $('#oc_size').val(); j ++)
	{
		if ($('#oc_checkbox'+j).is(':checked'))
		{
			var data = {};
			data.name = $('#oc_name'+j).val();
			arrays.push(data);
		}
	}

	if (arrays.length == 0)
	{
		alert('No companies selected');
	}else{
			$.ajax({
			type: 'GET',
			data: JSON.stringify(arrays),
	        contentType: 'application/json',
	        url: 'http://localhost:3000/add/companies',						
	        success: function(data) {
	            alert(data);
	        },
	        error  : function(xhr, status, error) { 
	        	console.log('error');
	        	alert(error);
	        }
	    });
	}	
}