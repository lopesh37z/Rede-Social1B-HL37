document.addEventListener("DOMContentLoaded", () => {
    // Seleção segura dos elementos pelas suas classes
    const likeBtn = document.querySelector("#like-button") || document.querySelector(".left-actions .action-btn");
    const likeCountSpan = likeBtn ? likeBtn.querySelector(".like-count") : null;
    const postMedia = document.querySelector(".post-media");
    const likesText = document.querySelector(".likes");
    const heartOverlay = postMedia ? postMedia.querySelector(".heart-overlay") : null;

    if (!likeBtn || !likeCountSpan) return;

    let isLiked = false;
    let count = 0; // Inicia do zero

    // Função central que atualiza os elementos visuais na tela
    function updateUI() {
        likeCountSpan.textContent = count;

        if (isLiked) {
            likeBtn.classList.add("liked");
            if (likesText) {
                likesText.innerHTML = "Curtido por <strong>você</strong>";
            }
        } else {
            likeBtn.classList.remove("liked");
            if (likesText) {
                likesText.innerHTML = "Seja o primeiro a curtir";
            }
        }
    }

    // Alterna o estado de curtida
    function toggleLike() {
        if (!isLiked) {
            isLiked = true;
            count = 1;
            showHeartAnimation();
        } else {
            isLiked = false;
            count = 0;
        }
        updateUI();
    }

    // Dispara a animação do coração grande sobre a foto
    function showHeartAnimation() {
        if (!heartOverlay) return;
        heartOverlay.classList.remove("active");
        void heartOverlay.offsetWidth; // Força re-render para reiniciar animação
        heartOverlay.classList.add("active");
    }

    // Evento de clique no botão de coração
    likeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleLike();
    });

    // Evento de clique na imagem principal
    if (postMedia) {
        postMedia.addEventListener("click", (e) => {
            // Evita disparar se clicar no badge do usuário sobre a foto
            if (e.target.closest(".user-badge")) return;
            toggleLike();
        });
    }

    // Inicializa a tela zerada
    updateUI();
});