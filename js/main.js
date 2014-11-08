var pythaRatios =
[
	[0,1],
	[1,15],
	[1,8],
	[1,5],
	[1,4],
	[1,3],
	[2,5],
	[1,2],
	[3,5],
	[2,3],
	[7,9],
	[7,8]
]

// TODO: A more intelligient way to allocate notes from keyboard inputs
var noteMap =
{
	"z":0, //C3
	"s":1, //c3
	"x":2, //D3
	"d":3, //d3
	"c":4, //E3
	"v":5, //F3
	"g":6, //f3
	"b":7, //G3
	"h":8, //g3
	"n":9, //A3
	"j":10, //a3
	"m":11, //B3
	",":12, //C4
}

document.addEventListener('DOMContentLoaded', function(){

	// Entry Point
	var keyboard = new Keyboard();

	var circle = new PythaCircle();

	// keyboard control
	window.onkeydown = function(event){
		var note = noteMap[Key[event.keyCode]];
		if (note != null)
		{
			//console.log("Down "+note);
			keyboard.play(note);
			circle.addNodeDraw(note);
		}
	};
	window.onkeyup = function(event){
		var note = noteMap[Key[event.keyCode]];
		if (note != null)
		{
			//console.log("Up "+note);
			keyboard.stop(note);
			circle.removeNodeDraw(note);
		}
	};
});
