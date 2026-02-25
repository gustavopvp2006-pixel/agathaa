document.addEventListener("DOMContentLoaded", function () {

    /* ================================= */
    /* ===== CARROSSEL ===== */
    /* ================================= */

    const track = document.querySelector('.carrossel-track');
    const slides = document.querySelectorAll('.carrossel-track img');
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');

    if (track && slides.length > 0) {

        let currentIndex = 0;
        let autoPlayInterval;

        function updateSlide() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlide();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlide();
        }

        if (nextButton) {
            nextButton.addEventListener("click", () => {
                nextSlide();
                resetAutoPlay();
            });
        }

        if (prevButton) {
            prevButton.addEventListener("click", () => {
                prevSlide();
                resetAutoPlay();
            });
        }

        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 4000);
        }

        function resetAutoPlay() {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }

        startAutoPlay();

        /* ===== Swipe Mobile ===== */

        let startX = 0;
        let isDragging = false;

        track.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        track.addEventListener("touchend", (e) => {
            if (!isDragging) return;

            let endX = e.changedTouches[0].clientX;
            let diff = startX - endX;

            if (diff > 50) {
                nextSlide();
            } else if (diff < -50) {
                prevSlide();
            }

            resetAutoPlay();
            isDragging = false;
        });

    }

    /* ================================= */
    /* ===== BOTÃO DE MÚSICA ===== */
    /* ================================= */

    const audio = document.getElementById("musica");
    const botaoMusica = document.getElementById("btnMusica");

    if (botaoMusica && audio) {
        botaoMusica.addEventListener("click", function () {
            if (audio.paused) {
                audio.play();
                botaoMusica.textContent = "⏸️ Pausar Música";
            } else {
                audio.pause();
                botaoMusica.textContent = "🎵 Tocar Música";
            }
        });
    }

    /* ================================= */
    /* ===== BOTÃO SIM + CONFETE ===== */
    /* ================================= */

    const btnSim = document.getElementById("btnSim");
    const resposta = document.getElementById("resposta");

    if (btnSim && resposta) {
        btnSim.addEventListener("click", () => {

            resposta.innerHTML = "💖 Agora oficialmente somos NAMORADOS 💖";
            btnSim.style.display = "none";

            for (let i = 0; i < 120; i++) {
                criarConfete();
            }

        });
    }

    function criarConfete() {
        const confete = document.createElement("div");
        confete.classList.add("confete");

        confete.style.left = Math.random() * 100 + "vw";
        confete.style.backgroundColor =
            `hsl(${Math.random() * 360}, 100%, 60%)`;

        confete.style.animationDuration =
            (Math.random() * 2 + 2) + "s";

        document.body.appendChild(confete);

        setTimeout(() => {
            confete.remove();
        }, 3000);
    }

});