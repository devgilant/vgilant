var konfig = require('konfig')();
var Step = require('step');

var vgilant_default_config = konfig.vgilant;
var vgilant_app_config = vgilant_default_config;

var vgilant_app_name = process.env.VGILANT_APP;
if (vgilant_app_name && konfig[vgilant_app_name.toLowerCase()])
{
	var temp_config = konfig[vgilant_app_name.toLowerCase()];
	Object.keys(temp_config).forEach(function(key){
		vgilant_app_config[key] = temp_config[key];
	});
}

var configResolveCount = (vgilant_app_config.dnsResolveVars ? 
	vgilant_app_config.dnsResolveVars.length : 0);

Object.keys(vgilant_app_config).map(function(key) { 
	// override configuration which overlaps ENV vars
	if (process.env[key])
		vgilant_app_config[key] = process.env[key];
	// konfig converts array to object. convert "array-like" objects back to array
	if (vgilant_app_config[key].constructor === Object) {
		if (vgilant_app_config[key][0]) {
			vgilant_app_config[key] = Object.keys(vgilant_app_config[key]).map(function(j) { 
				return vgilant_app_config[key][j] 
			});
		}
	}
	// resolve DNS issues, as neo4j isn't using dns.lookup (= doesn't rely on OS for DNS resolution)
	if (vgilant_app_config.dnsResolveVars && 
		vgilant_app_config.dnsResolveVars.indexOf(key) >= 0)
	{
		require('dns').lookup(vgilant_app_config[key], function(err, address, family){
			if (!err)				
			{
				console.log('Vgilant configuration: '+key+' resolved from '+
					vgilant_app_config[key]+ ' to '+ address);
				vgilant_app_config[key+'_RESOLVED'] = address;
			}
			configResolveCount--;
		});
	}
});

console.log('Vgilant config loaded for app '+
	(vgilant_app_name? vgilant_app_name : 'default')+
	' and environment '+
	(process.env.NODE_ENV? process.env.NODE_ENV : 'default')+
	': ');
for (var name in vgilant_app_config) {
    console.log(name + ': ' + JSON.stringify(vgilant_app_config[name]));
}
console.log('\nVgilant is affected by NODE_ENV and VGILANT_APP variables:\n'+
	'set NODE_ENV=development|testing|production\nset VGILANT_APP={app_name}\n'+
	'for example: set NODE_ENV=&&set VGILANT_APP=&&node vgilant_app.js'+
	' - runs the Web server with all default settings\n'+
	'for example: set NODE_ENV=development&&set VGILANT_APP=MQM&&node vgilant_app.js'+
	' - runs the Web server with development env settings for MQM application\n');

vgilant_app_config.ready = function(callback){
	var intervalID = setInterval(function(){
		if (configResolveCount == 0)
		{
			clearInterval(intervalID);
			if (callback)
				callback(vgilant_app_config);
		}
	}, 50);
}

module.exports = vgilant_app_config;