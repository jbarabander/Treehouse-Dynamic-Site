fs = require('fs');

function mergeValues(values, content) {
	//Cycle over the keys of these values
	//Replace all {{key}} with the values from the values object
	for(var prop in values){
		if(values.hasOwnProperty(prop)){
			content = content.replace('{{' + prop + '}}', values[prop]);
		}
	}
	return content;
}

function view(templateName, values, response) {
	//Read from the template files
	var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding: 'utf8'});
	//Insert values into the content
	fileContents = mergeValues(values, fileContents);

	//Write out to the conents to the response
	response.write(fileContents);
}

module.exports.view = view;