var volumeInput = document.querySelector('input')
var playButton = document.querySelector('h3')
var audioCtx = null;
var soundBuffer = null;

function playSound(quick) {
    if(soundBuffer) {
        var sound = audioCtx.createBufferSource();
        var gain = audioCtx.createGainNode();
        sound.buffer = soundBuffer;
        // sound.playbackRate.value = x/canvas.width*2;
        sound.connect(gain);
        gain.connect(audioCtx.destination);

        var volume = +volumeInput.value
        gain.gain.value = volume;

        if(quick) {
            sound.noteGrainOn(0., .2, .4);
        }
        else {
            sound.noteOn(0);
        }
    }
}

function init() {
  
    var touchstart = 'mousedown'
    var touchmove = 'mousemove'
    var touchend = 'mouseup'

    if('ontouchstart' in window) {
      touchstart = 'touchstart'
      touchmove = 'touchmove'
      touchend = 'touchend'
    }
    
    playButton.addEventListener(touchstart, function(e) {
      playSound()
    })

    if('webkitAudioContext' in window) {
        audioCtx = new webkitAudioContext();

        function bufferSound(event) {
            var request = event.target;
            soundBuffer = audioCtx.createBuffer(request.response, false);
        }

        var request = new XMLHttpRequest();
        request.open('GET', 'sound.mp3', true);
        request.responseType = 'arraybuffer';
        request.addEventListener('load', bufferSound, false);
        request.send();
    }

}

window.addEventListener('load', init);