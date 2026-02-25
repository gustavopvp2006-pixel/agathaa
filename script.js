document.addEventListener("DOMContentLoaded", function () {

    /* ====================== */
    /* CARROSSEL COMPLETO */
    /* ====================== */

    const track = document.querySelector('.carrossel-track');
    const slides = document.querySelectorAll('.carrossel-track img');
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    const galeria = document.querySelector('.galeria');

    if (track && slides.length > 0) {

        let currentIndex = 0;
        let autoPlay;

        /* Criar Dots */
        const dotsContainer = document.createElement("div");
        dotsContainer.classList.add("dots");
        galeria.appendChild(dotsContainer);

        slides.forEach((_, index) => {
            const dot = document.createElement("span");
            dot.classList.add("dot");
            if (index === 0) dot.classList.add("active");

            dot.addEventListener("click", () => {
                currentIndex = index;
                updateSlide();
                resetAutoPlay();
            });

            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll(".dot");

        function updateSlide() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;

            slides.forEach(slide => slide.classList.remove("active"));
            slides[currentIndex].classList.add("active");

            dots.forEach(dot => dot.classList.remove("active"));
            dots[currentIndex].classList.add("active");
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlide();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlide();
        }

        nextButton?.addEventListener("click", () => {
            nextSlide();
            resetAutoPlay();
        });

        prevButton?.addEventListener("click", () => {
            prevSlide();
            resetAutoPlay();
        });

        function startAutoPlay() {
            autoPlay = setInterval(nextSlide, 4000);
        }

        function resetAutoPlay() {
            clearInterval(autoPlay);
            startAutoPlay();
        }

        galeria.addEventListener("mouseenter", () => clearInterval(autoPlay));
        galeria.addEventListener("mouseleave", startAutoPlay);

        /* Swipe */

        let startX = 0;

        track.addEventListener("touchstart", e => {
            startX = e.touches[0].clientX;
        });

        track.addEventListener("touchend", e => {
            let diff = startX - e.changedTouches[0].clientX;
            if (diff > 50) nextSlide();
            if (diff < -50) prevSlide();
            resetAutoPlay();
        });

        slides[0].classList.add("active");
        startAutoPlay();
    }

    /* ====================== */
    /* BOTÃO MÚSICA */
    /* ====================== */

    const audio = document.getElementById("musica");
    const botao = document.getElementById("btnMusica");

    botao?.addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
            botao.textContent = "⏸️ Pausar Música";
        } else {
            audio.pause();
            botao.textContent = "🎵 Tocar Música";
        }
    });

    /* ====================== */
    /* BOTÃO SIM + CORAÇÕES */
    /* ====================== */

    const btnSim = document.getElementById("btnSim");
    const resposta = document.getElementById("resposta");

    btnSim?.addEventListener("click", () => {

        resposta.innerHTML = "💖 Agora oficialmente somos NAMORADOS 💖";
        btnSim.style.display = "none";

        for (let i = 0; i < 80; i++) {
            criarCoracao();
        }

    });

    function criarCoracao() {
        const coracao = document.createElement("div");
        coracao.classList.add("coracao");
        coracao.innerHTML = "💖";

        coracao.style.left = Math.random() * 100 + "vw";
        coracao.style.fontSize = (Math.random() * 20 + 15) + "px";
        coracao.style.animationDuration = (Math.random() * 2 + 3) + "s";

        document.body.appendChild(coracao);

        setTimeout(() => {
            coracao.remove();
        }, 4000);
    }

});
