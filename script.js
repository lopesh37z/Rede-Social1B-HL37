document.addEventListener("DOMContentLoaded, ()=> {
    // Seleciona o botão de curtida e o ícone de coração
    const likeBtn = document.queryselector(".left-actions .action-btn:first-child");
    if (!likeBtn) return;

    const likeSvg = likeBtn.querySelector("svg");
     
    // contador
    let textNode = Array.from(likeBtn.childNodes).find(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== ""
    );

    // Zerando o contador inicial
    let count = 0;

    // Atualiza 
    if (textNode)  {
        textNode.textContent = 0;
    }

    // coração
    function applyLikedStyle(){
        likeSvg.style.fill = "#ef4444";
        likeSvg.style.stroke = "#ef4444";
        likeBtn.style.color = "#ef4444";

        // Efeito visual de clique (pop/bounce)
        likeSvg.style.transform = "scale(1.3)"
        selfTimeout(()=> (likeSvg.style.transform = "scale(1)"),150 )
    }