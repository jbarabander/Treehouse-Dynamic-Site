var Profile = require('./profile.js');

//Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {

	//if url === '/' && GET
	if (request.url === '/') {
		//show search
		response.writeHead(200, {'Content-Type': 'text/plain'});
  		response.write('Header\n');
  		response.write('Search\n');
  		response.end('Footer\n');
	}
	//if url ==== '/' && POST 
		//redirect to /:username
}
	

//Handle HTTP route Get /:username i.e. /jbarabander
function user(request, response) {
	//if url == '/....' 
	var userName = 	request.url.replace('/', '');
	if (userName.length > 0){
		response.writeHead(200, {'Content-Type': 'text/plain'});
  		response.write('Header\n');

  		//get json from Treehouse
  		var studentProfile = new Profile(userName);
  		//on 'end'
  		studentProfile.on('end', function(profileJSON){
			//show profile

			//Store the values  which we need
			var values = {
				avatarUrl: profileJSON.gravatar_url,
				userName: profileJSON.profile_name,
				badges: profileJSON.badges.length,
				javascriptPoints: profileJSON.points.JavaScript
			};
			//Simple Response
			response.write(values.userName + ' has ' + values.badges + ' badge(s)\n');
			response.end('Footer\n')
  		});

  		//on 'error'
  		studentProfile.on('error', function(error){
			response.write(error.message + '\n');
			response.end('Footer\n');
  		});
	}
}

module.exports.home = home;
module.exports.user = user;