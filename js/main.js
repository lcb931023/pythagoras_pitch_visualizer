var pythaRatios =
[
    [0,1],  // P1
    [1,15], // m2
    [1,8],  // M2
    [1,5],  // m3
    [1,4],  // M3
    [1,3],  // P4
    [2,5],  // TT // septimal tritone
    [1,2],  // P5
    [3,5],  // m6
    [2,3],  // M6
    [4,5],  // m7 // large just minor seventh. Can also be tuned as [7,9] - small just minor seventh
    [7,8]   // M7
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
    91, 92 // left & right cmd
];

var btnStart = document.querySelector('.start')
var volumnHint = document.querySelector('.volumn-hint')
btnStart.addEventListener('click', ()=>{
    btnStart.style.display = 'none'
    volumnHint.style.display = 'inherit'

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

})

