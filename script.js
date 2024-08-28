const audioElement = document.querySelector('audio');
const masterPlay = document.getElementById('masterPlay');
const rangeBar = document.getElementById('rangeBar');
const gif = document.getElementById('gif');
const songItems = document.getElementsByClassName('songItem');
const playIcons = document.getElementsByClassName('playIcon');
const previousButton = document.getElementById('previousButton');
const nextButton = document.getElementById('nextButton');
const durationElement = document.querySelector('#duration');


// Define songs array
const songs = [
  { songName: "Hanuman Chalisa", filePath: "music/1.mp3.mp3", coverPath: "img/cover1.jpg", duration: "" },
  { songName: "Animal - B-Preak", filePath: "music/2.mp3.mp3", coverPath: "img/cover2.jpg", duration: "" },
  { songName: "Tera yar hu me", filePath: "music/3.mp3.mp3", coverPath: "img/cover3.jpg" , duration: ""},
  { songName: " Sooraj Dooba Hain yaro", filePath: "music/4.mp3.mp3", coverPath: "img/cover4.jpg", duration: "" },
  { songName: "Tujhko Ambar Se Pinjre Jyada Pyare-", filePath: "music/5.mp3.mp3", coverPath: "img/cover5.jpg" , duration: ""},
  { songName: "Aasan Nahin Yahan", filePath: "music/6.mp3.mp3", coverPath: "img/cover6.jpg", duration: "" }
];

// Initialize song index
let songIndex = 0;

// Load song covers and names
Array.from(songItems).forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByTagName("span")[0].innerText = songs[i].songName;
  element.getElementsByTagName("span")[1].innerText = songs[i].duration;

});

function formatDuration(duration) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${hours}:${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Update duration element
audioElement.addEventListener('loadedmetadata', () => {
  const duration = audioElement.duration;
  durationElement.innerText = formatDuration(duration);
  // songs[songIndex].duration = formatDuration(duration);
  Array.from(songItems).forEach((element, i) => {
    element.getElementsByTagName("span")[1].innerText = songs[i].duration;
  });
});

// Update duration in real-time
audioElement.addEventListener('timeupdate', () => {
  const currentTime = audioElement.currentTime;
  const duration = audioElement.duration;
  const timeRemaining = duration - currentTime;
  const timeRemainingFormatted = formatDuration(timeRemaining);
  durationElement.innerText = `${formatDuration(currentTime)} / ${formatDuration(duration)}`;
});



// Master play button event listener

masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.replace("fa-circle-play", "fa-circle-pause");
    gif.style.opacity = 1;
    Array.from(playIcons).forEach((element) => {
      element.classList.replace("fa-circle-pause", "fa-circle-play");
    });
    playIcons[songIndex].classList.replace("fa-circle-play", "fa-circle-pause");
  } else {
    audioElement.pause();
    masterPlay.classList.replace("fa-circle-pause", "fa-circle-play");
    gif.style.opacity = 0;
    Array.from(playIcons).forEach((element) => {
      element.classList.replace("fa-circle-pause", "fa-circle-play");
    });
  }
});

// Audio element event listener
audioElement.addEventListener('timeupdate', () => {
  const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  rangeBar.value = progress;
});

// Range bar event listener
rangeBar.addEventListener('change', () => {
  audioElement.currentTime = rangeBar.value * audioElement.duration / 100;
});

// Function to reset play icons
const resetPlayIcons = () => {
  Array.from(playIcons).forEach((element) => {
    element.classList.replace("fa-circle-pause", "fa-circle-play");
  });
};





Array.from(playIcons).forEach((element, index) => {
  element.addEventListener('click', (e) => {
    e.preventDefault();
    if (audioElement.paused || audioElement.src !== songs[index].filePath) {
      resetPlayIcons();
      e.target.classList.replace("fa-circle-play", "fa-circle-pause");
      masterPlay.classList.replace("fa-circle-play", "fa-circle-pause");
      audioElement.src = songs[index].filePath;
      audioElement.play();
      audioElement.currentTime = 0;
      gif.style.opacity = 1;
      rangeBar.value = 0;
      songIndex = index;
      document.querySelector('.songTitle').innerText = songs[index].songName;
    } else {
      e.target.classList.replace("fa-circle-pause", "fa-circle-play");
      masterPlay.classList.replace("fa-circle-pause", "fa-circle-play");
      audioElement.pause();
      gif.style.opacity = 0;
    }
  });
});


// Previous button event listener
previousButton.addEventListener('click', () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  audioElement.src = songs[songIndex].filePath;
  audioElement.play();
  masterPlay.classList.replace("fa-circle-play", "fa-circle-pause");
  gif.style.opacity = 1;
  rangeBar.value = 0;
  resetPlayIcons();
  playIcons[songIndex].classList.replace("fa-circle-play", "fa-circle-pause");
});

// Next button event listener
nextButton.addEventListener('click', () => {
  songIndex++;
  if (songIndex >= songs.length) {
    songIndex = 0;
  }
  audioElement.src = songs[songIndex].filePath;
  audioElement.play();
  masterPlay.classList.replace("fa-circle-play", "fa-circle-pause");
  gif.style.opacity = 1;
  rangeBar.value = 0;
  resetPlayIcons();
  playIcons[songIndex].classList.replace("fa-circle-play", "fa-circle-pause");
});

