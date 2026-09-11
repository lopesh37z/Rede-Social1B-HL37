document.addEventListener("DOMContentLoaded", () => {
    const likeBtn = document.getElementById("like-button");
    const likeCountSpan = likeBtn.querySelector(".like-count");
    const postMedia = document.getElementById("post-media");
    const heartOverlay = postMedia.querySelector(".heart-overlay");
    const likesText = document.getElementById("likes-text");

    let count = 0;
    let isLiked = false;

    // Atualiza a interface gráfica e os valores
    function updateLikesUI() {
        likeCountSpan.textContent = count;

        if (isLiked) {
            likeBtn.classList.add("liked");
            likesText.innerHTML = count === 1 
                ? "Curtido por <strong>você</strong>" 
                : `Curtido por <strong>você</strong> e <strong>outras ${count - 1} pessoas</strong>`;
        } else {
            likeBtn.classList.remove("liked");
            likesText.innerHTML = count === 0 
                ? "Seja o primeiro a curtir" 
                : `Curtido por <strong>${count} pessoas</strong>`;
        }
    }

    // Função para alternar o estado de curtida
    function toggleLike() {
        if (!isLiked) {
            isLiked = true;
            count++;
        } else {
            isLiked = false;
            count--;
        }
        updateLikesUI();
    }

    // Exibe a animação do coração grande sobre a foto
    function triggerHeartAnimation() {
        heartOverlay.classList.remove("pop");
        // Força o reflow para reiniciar a animação CSS
        void heartOverlay.offsetWidth; 
        heartOverlay.classList.add("pop");
    }

    // Evento de clique no botão de curtida
    likeBtn.addEventListener("click", () => {
        toggleLike();
    });

    // Evento de duplo clique na foto (Comportamento estilo Instagram)
    postMedia.addEventListener("dblclick", () => {
        triggerHeartAnimation();
        if (!isLiked) {
            toggleLike();
        }
    });

    // Evento de clique simples na imagem também ativa/desativa a curtida
    postMedia.addEventListener("click", (e) => {
        // Evita disparar em duplo clique
        if (e.detail === 1) {
            setTimeout(() => {
                if (e.detail === 1) { // Garante que não foi duplo clique
                    toggleLike();
                    if (isLiked) triggerHeartAnimation();
                }
            }, 200);
        }
    });
});