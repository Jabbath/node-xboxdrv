var spawn = require('child_process').spawn;
var controls = require('./config.json');

//'1bad:fa01'

function xbox(pid,vid){
	var xboxdrv = spawn('xboxdrv',['--device-by-id', pid + ':' + vid , '--type', 'xbox360']);
	var regExp = /[A-za-z0-9]+:\s*([\d-]+)/g;
	this.previous;
	this.actions = [];

	function inner(data) {
		data = data.toString();
		var temp;
		var input = [];

		//Push inputs into a nice array. regex.exec will return the next match each time it is called 
		while((temp=regExp.exec(data)) !== null){
			input.push(temp[1]);		
		}
		
		//If this is the first run set previous as current input array
		if(!this.previous){
			this.previous = input;
		}

		for(var i=0;i<this.actions.length;i++){
			var action = this.actions[i].action;//What the event listener is for
			var type = controls[action].type;//Button or axis
			var callback = this.actions[i].callback;
			var position = controls[action].pos; //What part of the input array the relevant data is in
			var changed = input[position] !== this.previous[position];//Was there actually input for what we are listening for?
			
			if(type==="axis" && changed && parseInt(input[position]) !== 0){
				//Axis type listeners will have their callbacks take postion data
				callback(parseInt(input[position]));
			}
			else if(type==="button" && changed && parseInt(input[position]) === 1){
				//Button type listeners do not need their callbacks to take data
				callback();
			}

		}

		this.previous = input;
		//console.log(this.previous);		
	}

	//We need to bind "this" so the callback can access the parent functions' this variables
	xboxdrv.stdout.on('data', inner.bind(this));

	xboxdrv.stderr.on('data', function (data) {
	  console.log('stderr: ' + data);
	});

	xboxdrv.on('close', function (code) {
	  console.log('child process exited with code ' + code);
	});
}

xbox.prototype.on = function(action,callback){
	this.actions.push({'action': action,'callback': callback});
}

module.exports = xbox;