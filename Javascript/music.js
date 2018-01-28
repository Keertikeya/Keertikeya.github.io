var songs = ["Tears Of The NightSky.mp3", "Shamshir Of Dastan.mp3", "Through The Sandstorm.mp3", "Faster Than Steel.mp3", "League of Heroes.mp3", "True Detective.mp3"];
	var images = ["a.jpg", "b.jpg", "c.jpg", "d.jpg", "e.jpg", "f.jpg",];

	var songTitle = document.getElementById("songTitle");
	var fillBar = document.getElementById("fill");
	
	var currentTimeDisp = document.getElementById("currentTimeDisp");

	var song = new Audio();
	var currentSong = 0;

	var ppb = document.getElementById("play");
	ppb.addEventListener("click", playPauseSong);

	var next = document.getElementById("next");
	next.addEventListener("click", playNextSong);

	var prev = document.getElementById("prev");
	prev.addEventListener("click", playPreviousSong);

	var playing = false;
	var mute = false;

	var slider = document.getElementById("myRange");

	var volctrl = document.getElementById("volume");

	volctrl.addEventListener("click", function() {
		if (!mute) {
			mute = true;
			song.volume = 0;
			volctrl.classList.remove("fa-volume-up");
			volctrl.classList.add("fa-volume-off");
		}

		else {
			mute = false;
			song.volume = slider.value / 100;
			volctrl.classList.remove("fa-volume-off");
			volctrl.classList.add("fa-volume-up");
		}
	});

	slider.oninput = function() {
		mute = false;
    	song.volume = this.value / 100;
    	volctrl.classList.remove("fa-volume-off");
		volctrl.classList.add("fa-volume-up");
	}

	window.onload = function() {
		song.src = "Music/" + songs[currentSong];
		songTitle.textContent = songs[currentSong].substring(0, songs[currentSong].length - 4);
		console.log(song.src);
		song.addEventListener('loadedmetadata', function(){
			initialTime(Math.round(song.duration));
		});

		song.volume = 0.25;
	}

	function initialTime(seconds) {
		var min = Math.floor(seconds / 60);
		var sec = seconds % 60;
		min = (min < 10) ? "0" + min : min;
		sec = (sec < 10) ? "0" + sec : sec;
		currentTimeDisp.textContent = "00:00 / " + min + ":" + sec;
	}

	song.addEventListener("timeupdate", function() {
		var position = song.currentTime / song.duration;
		fillBar.style.width = position * 100 + '%';
		convertTime(Math.round(song.currentTime));

		if (position >= 1) {
			playNextSong();
		}
	});

	function convertTime(seconds) {
		var min = Math.floor(seconds / 60);
		var sec = seconds % 60;
		min = (min < 10) ? "0" + min : min;
		sec = (sec < 10) ? "0" + sec : sec;
		currentTimeDisp.textContent = min + ":" + sec;

		totalTime(Math.round(song.duration));
	}

	function totalTime(seconds) {
		var min = Math.floor(seconds / 60);
		var sec = seconds % 60;
		min = (min < 10) ? "0" + min : min;
		sec = (sec < 10) ? "0" + sec : sec;
		currentTimeDisp.textContent += " / " + min + ":" + sec;
	}

	function playPauseSong() {		
		if (!playing) {
			song.play();
			playing = true;
			ppb.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
		}
		else {
			song.pause();
			playing = false;
			ppb.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>'
		}
	}

	function playNextSong() {
		currentSong = (currentSong + 1) % songs.length;
		changeImages();

		song.src = "Music/" + songs[currentSong];
		song.addEventListener('loadedmetadata', function(){
			initialTime(Math.round(song.duration));
		});
		songTitle.textContent = songs[currentSong].substring(0, songs[currentSong].length - 4);
		song.play();
		playing = true;
		ppb.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
	}

	function playPreviousSong() {
		currentSong = (currentSong - 1) % songs.length;
		if (currentSong < 0) currentSong = songs.length - 1;

		changeImages();

		song.src = "Music/" + songs[currentSong];
		song.addEventListener('loadedmetadata', function(){
			initialTime(Math.round(song.duration));
		});
		songTitle.textContent = songs[currentSong].substring(0, songs[currentSong].length - 4);
		song.play();
		playing = true;
		ppb.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
	}

	function changeImages() {
		document.getElementById("bgimg").src = "Images/album-arts/" + images[currentSong];
		document.getElementById("albumart").src = "Images/album-arts/" + images[currentSong];
	}