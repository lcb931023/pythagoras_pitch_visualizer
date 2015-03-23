/*

Z:C3
S:C#3
X:D3
D:Eb3
C:E3
V:F3
G:F#3
B:G3
H:G#3
N:A3
J:Bb3
M:B3

,:C4
L:C#4
.:D4
;:Eb4
/:E4

Q:C4
2:C#4
W:D4
3:Eb4
E:E4
R:F4
5:F#4
T:G4
6:G#4
Y:A4
7:Bb4
U:B4

I:C5
9:C#5
O:D5
0:Eb5
P:E5
[:F5
=:F#5
]:G5

Base Frequency According to
http://www.phy.mtu.edu/~suits/notefreqs.htmlnoteFreqs
*/
var Keyboard = (function () {

    // private variables and functions
    var c3_freq = 131;
    var audio;
    var oscillators = []; // one oscillator for each note?
    var gainNodes = []; // and one gainNodes per oscillator to control "playing
    var mix;
    var compressor;

    // constructor
    var Keyboard = function () {
        // Initialize webAudio oscillator
        audio = new AudioContext();
        // Master Gain
        mix = audio.createGain();
        for (var j = 0; j < 2; j++) {
            for (var i=0; i<pythaRatios.length; i++)
            {
                oscillators[i + j * pythaRatios.length] = audio.createOscillator();
                gainNodes[i + j * pythaRatios.length] = audio.createGain();
                oscillators[i + j * pythaRatios.length].type = "triangle"; // triangle wave
                var freq = c3_freq + c3_freq * (pythaRatios[i][0] / pythaRatios[i][1]);
                freq *= (j+1);
                oscillators[i + j * pythaRatios.length].frequency.value = freq;
                gainNodes[i + j * pythaRatios.length].gain.value = 0;
                oscillators[i + j * pythaRatios.length].connect(gainNodes[i + j * pythaRatios.length]);
                gainNodes[i + j * pythaRatios.length].connect(mix);
                oscillators[i + j * pythaRatios.length].start(0);
                console.log("create");
            }
        }
        // Compression. Only works in Chrome by May 2014
        compressor = audio.createDynamicsCompressor();
        mix.connect(compressor);
        compressor.connect(audio.destination);

        //console.log(gainNodes);
    };
    // prototype
    Keyboard.prototype = {
        constructor: Keyboard,
        play: function (i) {
            //console.log(i);
            gainNodes[i].gain.value = 1;
        },
        stop: function (i) {
            gainNodes[i].gain.value = 0;
        },
    };

    return Keyboard;
})();
