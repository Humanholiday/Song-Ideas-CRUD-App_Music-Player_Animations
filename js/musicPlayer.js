
//use DOM to select the music player elements
  const musicContainer = document.getElementById("music-container");
  const playBtn = document.getElementById("music-play");
  const prevBtn = document.getElementById("music-prev");
  const nextBtn = document.getElementById("music-next");

  const audio = document.getElementById("music-audio");
  const progress = document.getElementById("music-progress");
  const progressContainer = document.getElementById("music-progress-container");
  const title = document.getElementById("music-title");
  const cover = document.getElementById("music-cover");

  //Song titles
  const songs = ["Bullets", "Ballet Box", "Living Spirit"];

  //Keep track of song
  let songIndex = 0;

  // Initially load song details into DOM
  loadSong(songs[songIndex]);

  //Update song details
  function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `img/${song}.jpg`;
  }

  //Play song
  function playSong() {
    musicContainer.classList.add("music-play");
    playBtn.querySelector("i.fas").classList.remove("fa-play");
    playBtn.querySelector("i.fas").classList.add("fa-pause");
    audio.play();
  }
  //Pause song
  function pauseSong() {
    musicContainer.classList.remove("music-play");
    playBtn.querySelector("i.fas").classList.remove("fa-pause");
    playBtn.querySelector("i.fas").classList.add("fa-play");

    audio.pause();
  }

  //Previous song
  function prevSong() {
    songIndex--;
    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
  }

  //Next song
  function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
  }

  //Update progress bar
  function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }

  //Set progress bar
  function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
  }

  //Event listeners
  playBtn.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains("music-play");

    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  });

  //Change song
  prevBtn.addEventListener("click", prevSong);
  nextBtn.addEventListener("click", nextSong);

  //Time/song update event
  audio.addEventListener("timeupdate", updateProgress);

  //click on progress bar
  progressContainer.addEventListener("click", setProgress);

  //song ends
  audio.addEventListener("ended", nextSong);
