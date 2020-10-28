const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
const audioElement = document.querySelector('audio');
const playBtn = document.querySelector('button');
const volumeSlider = document.querySelector('.volume');
const audioSource = audioCtx.createMediaElementSource(audioElement);

playBtn.addEventListener('click', function(e) {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    if (this.getAttribute('class') === 'paused') {
        audioElement.play();
        this.setAttribute('class', 'playing');
        this.textContent = '暂停';
    } else if (this.getAttribute('class') === 'playing') {
        audioElement.pause();
        this.setAttribute('class', 'paused');
        this.textContent = '继续';
    }
});

audioElement.addEventListener('ended', function(e) {
    playBtn.setAttribute('class', 'paused');
    playBtn.textContent = '继续';
});

const gainNode = audioCtx.createGain();
volumeSlider.addEventListener('input', function(e) {
    gainNode.gain.value = this.value;
});

audioSource.connect(gainNode).connect(audioCtx.destination);