document.addEventListener("DOMContentLoaded", () => {
    // Seleciona o primeiro botão da lista (o de curtida)
    const likeBtn = document.querySelector(".left-actions .action-btn:first-child");
    if (!likeBtn) return;

    const likeSvg = likeBtn.querySelector("svg");

    // Localiza o nó de texto que contém a contagem (ex: "1.2K")
    let textNode = Array.from(likeBtn.childNodes).find(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== ""
    );

    let isLiked = false;

    // Função para alterar o estilo visual para 'curtido'
    function applyLikedStyle() {
        likeSvg.style.fill = "#ef4444";
        likeSvg.style.stroke = "#ef4444";
        likeBtn.style.color = "#ef4444";

        // Animação visual (bounce)
        likeSvg.style.transform = "scale(1.3)";
        setTimeout(() => (likeSvg.style.transform = "scale(1)"), 150);
    }

    // Função para redefinir o estilo ao descurtir
    function removeLikedStyle() {
        likeSvg.style.fill = "none";
        likeSvg.style.stroke = "currentColor";
        likeBtn.style.color = "#ffffff";
    }

    // Associa o evento de clique ao botão
    likeBtn.addEventListener("click", () => {
        if (!isLiked) {
            applyLikedStyle();
            isLiked = true;
        } else {
            removeLikedStyle();
            isLiked = false;
        }
    });
});