const players = document.querySelectorAll(".song-card");

players.forEach((player) => {

    const audio = player.querySelector("audio");
    const playBtn = player.querySelector(".play-btn");
    const progress = player.querySelector(".progress");
    const currentTime = player.querySelector(".current-time");
    const durationText = player.querySelector(".duration");
    const volume = player.querySelector(".volume");

    // PLAY / PAUSE
    playBtn.addEventListener("click", () => {

        // zastaví ostatní
        document.querySelectorAll("audio").forEach((a) => {
            if (a !== audio) {
                a.pause();
                a.currentTime = 0;
            }
        });

        document.querySelectorAll(".play-btn").forEach((btn) => {
            if (btn !== playBtn) {
                btn.textContent = "▶";
            }
        });

        if (audio.paused) {
            audio.play();
            playBtn.textContent = "❚❚";
        } else {
            audio.pause();
            playBtn.textContent = "▶";
        }
    });

    // načtení délky
    audio.addEventListener("loadedmetadata", () => {

        const minutes = Math.floor(audio.duration / 60);
        const seconds = Math.floor(audio.duration % 60)
            .toString()
            .padStart(2, "0");

        durationText.textContent = `${minutes}:${seconds}`;
    });

    // aktualizace progress baru
    audio.addEventListener("timeupdate", () => {

        const percent =
            (audio.currentTime / audio.duration) * 100;

        progress.value = percent;

        const minutes = Math.floor(audio.currentTime / 60);
        const seconds = Math.floor(audio.currentTime % 60)
            .toString()
            .padStart(2, "0");

        currentTime.textContent = `${minutes}:${seconds}`;
    });

    // ovládání hlasitosti
    volume.addEventListener("input", () => {
        audio.volume = volume.value;
    });

    // posouvání skladby
    progress.addEventListener("input", () => {

        audio.currentTime =
            (progress.value / 100) * audio.duration;
    });

    // konec písničky
    audio.addEventListener("ended", () => {

        playBtn.textContent = "▶";
        progress.value = 0;
    });
});