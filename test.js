var xbox = require('node-xboxdrv')

var test = new xbox.xbox('1bad','fa01');
test.on('a',function(){console.log('a');})
test.on('b',function(){console.log('b');})
test.on('x',function(){console.log('x');})
test.on('y',function(){console.log('y');})
test.on('leftX',function(data){console.log(data);})
test.on('leftY',function(data){console.log(data);})