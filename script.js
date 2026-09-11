document.addEventListener("DOMContentLoaded", () => {
    const likeBtn = document.getElementById("like-button");
    const likeCountSpan = likeBtn ? likeBtn.querySelector(".like-count") : null;
    const postMedia = document.querySelector(".post-media");
    const likesText = document.querySelector(".post-details .likes");
    const heartOverlay = document.querySelector(".heart-overlay");

    let count = 0;

    // Dispara a animação do coração sobreposto na foto
    function triggerHeartAnimation() {
        if (!heartOverlay) return;
        heartOverlay.classList.remove("pop");
        void heartOverlay.offsetWidth; // Força reflow no navegador para reiniciar a animação
        heartOverlay.classList.add("pop");
    }

    // Incrementa o contador de curtidas
    function addLike() {
        count++;

        // Atualiza a contagem no botão
        if (likeCountSpan) {
            likeCountSpan.textContent = count;
        }

        // Mantém o ícone vermelho
        if (likeBtn) {
            likeBtn.classList.add("liked");
        }

        // Atualiza a legenda das curtidas
        if (likesText) {
            likesText.innerHTML = `Curtido por <strong>${count.toLocaleString()} pessoas</strong>`;
        }

        triggerHeartAnimation();
    }

    // Incrementa ao clicar no botão de coração
    if (likeBtn) {
        likeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            addLike();
        });
    }

    // Incrementa ao clicar na mídia/imagem
    if (postMedia) {
        postMedia.addEventListener("click", (e) => {
            if (e.target.closest(".user-badge")) return;
            addLike();
        });
    }
});