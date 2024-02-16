
// const music = document.querySelector("audio")
// const play = document.getElementById('playButton');
// play.addEventListener('click', ()=>{
//     music.play();
// });


let songIndex = 0;
// let audioElement = document.querySelector('audio');
let audioElement = document.querySelector('audio');
let masterPlay = document.getElementById('masterPlay');
let rangeBar = document.getElementById('rangeBar');
let gif = document.getElementById('gif');
let songItem = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    { songName: "hanuman chalisa", filePath: "music/1.mp3", coverPath: "img/cover1.jpg" },
    { songName: "Animal -  b- preak",     filePath: "music/2.mp3", coverPath: "img/cover2.jpg" },
    { songName: "best tune for ringtone", filePath: "music/3.mp3", coverPath: "img/cover3.jpg" },
    { songName: "dil ki duri", filePath: "music/4.mp3", coverPath: "img/cover4.jpg" },
    { songName: "dil de chuke sanam", filePath: "music/5.mp3", coverPath: "img/cover5.jpg" },
    { songName: "arjit singh song", filePath: "music/6.mp3", coverPath: "img/cover6.jpg" }

]

songItem.forEach((element, i)=>{
    // console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByTagName("span")[0].innerText = songs[i].songName;
});

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.replace("fa-circle-play", "fa-circle-pause")
        gif.style.opacity = 1;
    }else{
        audioElement.pause();
        masterPlay.classList.replace("fa-circle-pause", "fa-circle-play" );
        gif.style.opacity = 0;
    }
})

audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    rangeBar.value = progress;
});

rangeBar.addEventListener('change', ()=>{
    audioElement.currentTime = rangeBar.value * audioElement.duration/100;
})



const allPlays = ()=>{
    Array.from(document.getElementsByClassName('playIcon')).forEach((element) => {
        element.classList.replace("fa-circle-pause", "fa-circle-play");
    });
}



Array.from(document.getElementsByClassName('playIcon')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        allPlays();
        e.target.classList.replace("fa-circle-play", "fa-circle-pause")
        audioElement.play();
        audioElement.currentTime = 0;
        gif.style.opacity = 1;
    });
});
