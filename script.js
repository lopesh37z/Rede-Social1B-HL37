document.addEventListener("DOMContentLoaded", () => {
    const likeBtn = document.getElementById("like-button");
    const likeCountSpan = likeBtn ? likeBtn.querySelector(".like-count") : null;
    const postMedia = document.querySelector(".post-media");
    const likesText = document.querySelector(".post-details .likes");
    const heartOverlay = document.querySelector(".heart-overlay");

    // Contador iniciando sempre em 0
    let isLiked = false;
    let count = 0;

    // Função de renderização
    function updateUI() {
        if (likeCountSpan) {
            likeCountSpan.textContent = count;
        }

        if (likeBtn) {
            if (isLiked) {
                likeBtn.classList.add("liked");
            } else {
                likeBtn.classList.remove("liked");
            }
        }

        if (likesText) {
            if (isLiked) {
                if (count === 1) {
                    likesText.innerHTML = 'Curtido por <strong>você</strong>';
                } else {
                    likesText.innerHTML = `Curtido por <strong>você</strong> e <strong>outras ${count - 1} pessoas</strong>`;
                }
            } else {
                if (count === 0) {
                    likesText.innerHTML = 'Seja o primeiro a curtir';
                } else {
                    likesText.innerHTML = `Curtido por <strong>${count} pessoas</strong>`;
                }
            }
        }
    }

    // Animação do coração na imagem
    function triggerHeartAnimation() {
        if (!heartOverlay) return;
        heartOverlay.classList.remove("animate");
        void heartOverlay.offsetWidth; // Força re-flow para reiniciar animação
        heartOverlay.classList.add("animate");
    }

    // Alternar estado do Like
    function toggleLike(forceLike = false) {
        if (forceLike) {
            if (!isLiked) {
                isLiked = true;
                count += 1;
                triggerHeartAnimation();
            } else {
                triggerHeartAnimation();
            }
        } else {
            if (isLiked) {
                isLiked = false;
                count -= 1;
            } else {
                isLiked = true;
                count += 1;
                triggerHeartAnimation();
            }
        }
        updateUI();
    }

    // Clique no botão
    if (likeBtn) {
        likeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleLike(false);
        });
    }

    // Clique na foto
    if (postMedia) {
        let clickTimer = null;

        postMedia.addEventListener("click", (e) => {
            if (e.target.closest(".user-badge")) return;

            if (clickTimer === null) {
                clickTimer = setTimeout(() => {
                    clickTimer = null;
                    toggleLike(false);
                }, 250);
            } else {
                clearTimeout(clickTimer);
                clickTimer = null;
                toggleLike(true);
            }
        });
    }

    // Executa no carregamento para garantir a tela zerada
    updateUI();
});