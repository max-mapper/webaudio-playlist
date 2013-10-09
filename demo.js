var playlist = require('./')

var player = playlist(['short.mp3', 'sound.mp3'])

var playButton = document.querySelector('h3')

var touchstart = 'mousedown'
if ('ontouchstart' in window) touchstart = 'touchstart'

playButton.addEventListener(touchstart, function(e) {
  if (player.playing) return
  player.start()
})