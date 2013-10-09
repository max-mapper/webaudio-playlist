var Spinning = require('spinning')

module.exports = function player(mp3s, volume) {
  var sound, gain, soundBuffer, audioCtx
  var currentSong = 0
  var started = false
  
  player.playing = false
  player.start = start
  player.stop = stop
  
  if ('webkitAudioContext' in window) {
    audioCtx = new webkitAudioContext()
  }
  
  loadSong(mp3s[currentSong])
  currentSong++
  
  return player
  
  function next() {
    var nextSong = mp3s[currentSong]
    if (!nextSong) {
      player.playing = false
      return
    }
    player.playing = true
    loadSong(nextSong, start)
    currentSong++
  }
  
  function start(quick) {
    if (!soundBuffer) return
    player.playiing = true
    sound = audioCtx.createBufferSource()
    gain = audioCtx.createGainNode()
    sound.buffer = soundBuffer
    sound.connect(gain)
    sound.onended = next
    gain.connect(audioCtx.destination)

    gain.gain.value = volume || 0.5
    if (quick) sound.noteGrainOn(0., .2, .4)
    else sound.noteOn(0)
  }
  
  function stop() {
    if (audioCtx) {
      gain.disconnect()
      player.playing = false
    }
  }

  function loadSong(url, cb) {
    var spinner = Spinning().text('loading...').light().size(200)
    var request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.responseType = 'arraybuffer'
    request.addEventListener('load', function(event) {
      var request = event.target
      soundBuffer = audioCtx.createBuffer(request.response, false)
      spinner.remove()
      if (cb) cb()
    }, false)
    request.send()
  }
}

