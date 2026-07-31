const ACCENT  = '#E8C84A'; // zlatá
const TRACK   = '#3a3a3a'; // tmavá stopa

// Obarví range input: vlevo accent, vpravo tmavá
function paintRange(input, percent) {
    input.style.background =
        `linear-gradient(to right, ${ACCENT} ${percent}%, ${TRACK} ${percent}%)`;
}

const players = document.querySelectorAll('.song-card');

players.forEach((player) => {

    const audio       = player.querySelector('audio');
    const playBtn     = player.querySelector('.play-btn');
    const progress    = player.querySelector('.progress');
    const currentTime = player.querySelector('.current-time');
    const durationEl  = player.querySelector('.duration');
    const volume      = player.querySelector('.volume');

    // Výchozí stav — volume je na 100 %
    paintRange(volume, 100);
    paintRange(progress, 0);

    // ── PLAY / PAUSE ──────────────────────────────────────
    playBtn.addEventListener('click', () => {

        // zastav ostatní přehrávače
        document.querySelectorAll('audio').forEach((a) => {
            if (a !== audio) { a.pause(); a.currentTime = 0; }
        });
        document.querySelectorAll('.play-btn').forEach((btn) => {
            if (btn !== playBtn) btn.textContent = '▶';
        });
        // reset progress ostatních na šedou
        document.querySelectorAll('.progress').forEach((p) => {
            if (p !== progress) paintRange(p, 0);
        });

        if (audio.paused) {
            audio.play();
            playBtn.textContent = '❚❚';
        } else {
            audio.pause();
            playBtn.textContent = '▶';
        }
    });

    // ── DÉLKA SKLADBY ─────────────────────────────────────
    audio.addEventListener('loadedmetadata', () => {
        const m = Math.floor(audio.duration / 60);
        const s = Math.floor(audio.duration % 60).toString().padStart(2, '0');
        durationEl.textContent = `${m}:${s}`;
    });

    // ── PRŮBĚH PŘEHRÁVÁNÍ ──────────────────────────────────
    audio.addEventListener('timeupdate', () => {
        const percent = (audio.currentTime / audio.duration) * 100 || 0;

        progress.value = percent;
        paintRange(progress, percent);   // ← zlatá vlevo

        const m = Math.floor(audio.currentTime / 60);
        const s = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
        currentTime.textContent = `${m}:${s}`;
    });

    // ── POSOUVÁNÍ SKLADBY ─────────────────────────────────
    progress.addEventListener('input', () => {
        const percent = Number(progress.value);
        audio.currentTime = (percent / 100) * audio.duration;
        paintRange(progress, percent);   // ← okamžitá odezva při tažení
    });

    // ── HLASITOST ─────────────────────────────────────────
    volume.addEventListener('input', () => {
        audio.volume = volume.value;
        paintRange(volume, volume.value * 100); // ← zlatá = aktuální hlasitost
    });

    // ── KONEC PÍSNIČKY ────────────────────────────────────
    audio.addEventListener('ended', () => {
        playBtn.textContent = '▶';
        progress.value = 0;
        paintRange(progress, 0);
    });
});
