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
];

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
    "q":12,
    "2":13,
    "w":14,
    "3":15,
    "e":16,
    "r":17,
    "5":18,
    "t":19,
    "6":20,
    "y":21,
    "7":22,
    "u":23,
};
var bannedKeys = [
    16, // shift
    17, // ctrl
    18, // alt
    91 // cmd
];

document.addEventListener('DOMContentLoaded', function(){

    // Entry Point
    var keyboard = new Keyboard();

    var circle = new PythaCircle();
    
    var bannedKeysDown = false;

    // keyboard control
    window.onkeydown = function(event){
        // check for banned keys
        if ( _.contains( bannedKeys, event.keyCode ) ) {
            bannedKeysDown = true;
            return;
        }
        // Disable playing if there's a banned key down
        if (bannedKeysDown) return;
        var note = noteMap[Key[event.keyCode]];
        if (note != null)
        {
            //console.log("Down "+note);
            keyboard.play(note);
            circle.addNodeDraw(note);
        }
    };
    window.onkeyup = function(event){
        // check for banned keys
        if ( _.contains( bannedKeys, event.keyCode ) ) {
            bannedKeysDown = false;
            return;
        }
        var note = noteMap[Key[event.keyCode]];
        if (note != null)
        {
            //console.log("Up "+note);
            keyboard.stop(note);
            circle.removeNodeDraw(note);
        }
    };
    // Sometimes there won't be a banned keys up event. window onfocus comes to the rescue.
    window.onfocus = function() {
        bannedKeysDown = false;
    };
});
