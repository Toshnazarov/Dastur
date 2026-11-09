const slider = document.getElementById('slider');
const slides = slider.querySelectorAll('.slide');
const dotsBox = slider.querySelector('.dots');
const playBtn = document.getElementById('playPause');
const soundBtn = document.getElementById('sound');

let current = 0;
let playing = true;
let muted = true;

// Har bir slayd uchun nuqta yaratamiz
slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.setAttribute('aria-label', (i + 1) + '-slayd');
    dot.addEventListener('click', () => goTo(i));
    dotsBox.appendChild(dot);
});
const dots = dotsBox.querySelectorAll('.dot');

function goTo(index) {
    const oldVideo = slides[current].querySelector('video');
    oldVideo.pause();
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');

    current = (index + slides.length) % slides.length;

    const video = slides[current].querySelector('video');
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    video.currentTime = 0;
    video.muted = muted;
    if (playing) video.play().catch(() => {});
}

// Video tugasa — keyingi slaydga o'tadi
slides.forEach(slide => {
    slide.querySelector('video').addEventListener('ended', () => goTo(current + 1));
});

slider.querySelector('.prev').addEventListener('click', () => goTo(current - 1));
slider.querySelector('.next').addEventListener('click', () => goTo(current + 1));

playBtn.addEventListener('click', () => {
    const video = slides[current].querySelector('video');
    playing = !playing;
    if (playing) {
        video.play().catch(() => {});
        playBtn.textContent = "⏸ To'xtatish";
    } else {
        video.pause();
        playBtn.textContent = '▶ Davom etish';
    }
});

soundBtn.addEventListener('click', () => {
    muted = !muted;
    slides[current].querySelector('video').muted = muted;
    soundBtn.textContent = muted ? '🔇 Ovoz' : '🔊 Ovoz';
});

// Klaviatura: ← → strelkalar
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
});

// Telefonda surish (swipe)
let startX = 0;
slider.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
slider.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 50) goTo(diff < 0 ? current + 1 : current - 1);
});

goTo(0);
