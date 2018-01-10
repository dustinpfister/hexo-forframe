var forFrame = (function () {

    var api = {

        foo: function () {

            console.log('this is foo');
            console.log(this);

        }

    }

    return function (ff) {

	    console.log('yes');
	
        ff.i = 0;
        ff.init.call(_.merge(ff, api));

    };

}());

/*
var forFrame = (function () {

console.log('I am forFrame!');

var ani = [],

container = document.getElementById('ff') || document.body,

cls = function (canvas) {

var ctx = canvas.getContext('2d');

ctx.fillStyle = '#000000';
ctx.fillRect(0, 0, canvas.width, canvas.height);

};

var Box = function (id) {

this.id = id;
this.w = 32;
this.h = 32;
this.x = 0;
this.y = 0;
this.color = '#00ffff';

};

var api_init = {

addBox: function (id) {

console.log('the script wants to add a box');

this.obj.push(new Box(id));

console.log(this.obj);

}

};

var api_ff = {

get: function (id) {

var i = 0,
len = this.obj.length;
while (i < len) {

if (this.obj[i].id === id) {

return this.obj[i];

}

i += 1;

}

return false;

}

};

// render the given ffObj to it's canvas
var render = function (ffObj) {

var ctx = ffObj.ctx;

cls(ffObj.canvas);

ffObj.obj.forEach(function (obj) {

ctx.fillStyle = obj.color;
ctx.fillRect(obj.x, obj.y, obj.w, obj.h);

});

};

// tick the given ffObj
var tick = function (ffObj) {

ffObj.i += 1;
if (ffObj.i >= ffObj.maxFrame) {

ffObj.i = 0;

}

ffObj.per = ffObj.i / ffObj.maxFrame;
ffObj.bias = 1 - Math.abs(.5 - ffObj.per) / .5;

ffObj.forFrame(api_ff);

};

var play = function (ffObj) {

var loop = function () {

setTimeout(loop, 33);

tick(ffObj);
render(ffObj);

};

loop();

};

return {



// add the given for frame object
add: function (ff) {

ff.canvas = document.createElement('canvas');
ff.ctx = ffObj.canvas.getContext('2d');

// create the phaser game instance
ff.game = new Phaser.Game(320,240,Phaser.AUTO,container);

ff.canvas.width = 320;
ff.canvas.height = 240;

cls(ff.canvas);

ff.obj = [];
ff.i = 0;
ff.maxFrame = 50;
ff.bias = 0;

ff.init(api_init);

container.appendChild(ff.canvas);

// just push it in for now
ani.push(ff);

console.log('ff client: added animation: ' + ff.name);

//ffObj.forFrame(api_ff);
tick(ff);
//tick(ffObj);
//tick(ffObj);

play(ff);

}


};

}
());
*/
