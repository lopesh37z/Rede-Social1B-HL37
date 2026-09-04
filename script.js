document.addEventListener("DOMContentLoaded", () => {
    // Seleciona o botão de curtida usando o ID que adicionamos no HTML
    const likeBtn = document.getElementById("like-button");
    if (!likeBtn) return; // Segurança: sai se não encontrar o botão

    // Seleciona o ícone SVG e o elemento de texto da contagem dentro do botão
    const likeSvg = likeBtn.querySelector("svg");
    const likeCountSpan = likeBtn.querySelector(".like-count");

    // Estado inicial: não curtido
    let isLiked = false;

    // Obtém o valor inicial do contador do HTML
    // Tratamos "1.2K" como 1200 para demonstração
    let count = parseCount(likeCountSpan.textContent);

    // Função auxiliar para converter texto (ex: "1.2K") em número
    function parseCount(text) {
        text = text.trim().toUpperCase();
        if (text.includes('K')) {
            return parseFloat(text.replace('K', '')) * 1000;
        }
        return parseInt(text, 10);
    }

    // Função auxiliar para formatar número de volta para texto (ex: 1201 -> "1.2K")
    function formatCount(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    // Define a função que aplica o estilo visual de 'curtido'
    function applyLikedStyle() {
        // Adiciona a classe CSS que define as cores vermelhas
        likeBtn.classList.add("liked");

        // Efeito visual de clique (pop/bounce) usando transformação CSS
        likeSvg.style.transform = "scale(1.3)";
        setTimeout(() => (likeSvg.style.transform = "scale(1)"), 150);
    }

    // Define a função que remove o estilo visual de 'curtido'
    function removeLikedStyle() {
        // Remove a classe CSS
        likeBtn.classList.remove("liked");
    }

    // Adiciona o ouvinte de evento de clique ao botão
    likeBtn.addEventListener("click", () => {
        if (!isLiked) {
            // Se não estava curtido, curte
            count++;
            applyLikedStyle();
            isLiked = true;
        } else {
            // Se já estava curtido, descurte
            count--;
            removeLikedStyle();
            isLiked = false;
        }

        // Atualiza o texto da contagem no HTML com o novo valor formatado
        likeCountSpan.textContent = formatCount(count);
    });
});