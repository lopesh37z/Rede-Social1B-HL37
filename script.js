document.addEventListener("DOMContentLoaded", () => {
    const likeBtn = document.getElementById("like-button");
    const likeCountElement = likeBtn ? likeBtn.querySelector(".like-count") : null;
    const mainImg = document.querySelector(".main-img");

    if (!likeBtn || !likeCountElement) return;

    // Valor base numérico (1.2K = 1200 curtidas)
    let initialLikes = 1200; 
    let isLiked = false;

    // Converte números grandes para formato abreviado (ex: 1201 -> 1.2K)
    function formatLikes(count) {
        if (count >= 1000) {
            return (count / 1000).toFixed(1) + "K";
        }
        return count.toString();
    }

    // Atualiza o estado visual do botão e a contagem
    function updateLikeState() {
        if (isLiked) {
            likeBtn.classList.add("liked");
            likeCountElement.textContent = formatLikes(initialLikes + 1);
        } else {
            likeBtn.classList.remove("liked");
            likeCountElement.textContent = formatLikes(initialLikes);
        }
    }

    // Alterna a curtida ao clicar no botão
    likeBtn.addEventListener("click", () => {
        isLiked = !isLiked;
        updateLikeState();
    });

    // Curte a publicação ao dar duplo clique na imagem principal
    if (mainImg) {
        mainImg.addEventListener("dblclick", () => {
            if (!isLiked) {
                isLiked = true;
                updateLikeState();
            }
        });
    }
});
