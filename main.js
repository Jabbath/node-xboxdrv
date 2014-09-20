var spawn = require('child_process').spawn;

//'1bad:fa01'

function xbox(pid,vid){
	var xboxdrv = spawn('xboxdrv',['--device-by-id', pid + ':' + vid , '--type', 'xbox360']);
	var regExp = /[A-za-z0-9]+:\s*([\d-]+)/g;
	this.previous;
	var previous = this.previous;

	xboxdrv.stdout.on('data', function (data) {
		data = data.toString();
		var temp;
		var match = [];

		//Push inputs into a nice array

		while((temp=regExp.exec(data)) !== null){
			match.push(temp[1]);		
		}
		

		if(!previous){
			previous = match;
		}
		console.log(x);
		
	});

	xboxdrv.stderr.on('data', function (data) {
	  console.log('stderr: ' + data);
	});

	xboxdrv.on('close', function (code) {
	  console.log('child process exited with code ' + code);
	});
}

xbox.prototype.on = function(action,callback){

}

var test = new xbox('1bad','fa01');
