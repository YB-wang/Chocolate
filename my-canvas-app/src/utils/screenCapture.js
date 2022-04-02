let timer = null;
export default function screenCapture(e, canvas, ctx) {
    if (timer) return
    const startX = canvas.offsetLeft;
    const startY = canvas.offsetTop;
    const wraper = document.createElement('div')
    const img = new Image();
    wraper.appendChild(img)
    const url = canvas.toDataURL();
    img.src = url;
    wraper.style.position = 'absolute'
    wraper.style.left = `${startX}px`;
    wraper.style.top = `${startY}px`;
    wraper.style.border = 'solid 1px grey';
    wraper.style.background = '#ffffff';
    document.body.appendChild(wraper);
    const { x, y } = e
    requestAnimationFrame(() => {
        wraper.animate([
            { transform: `translate(0px, 0px) scale(1)` },
            { transform: `translate(0px, 0px) scale(1.2)` },
            { transform: `translate(${x - startX - canvas.offsetWidth * 0.5}px, ${y - startY - canvas.offsetHeight * 0.5}px) scale(0)` },
        ], { duration: 800, easing: 'cubic-bezier(.5,.09,.36,1.01)' })
        timer = setTimeout(() => {
            document.body.removeChild(wraper);
            clearTimeout(timer)
            timer = null;
        }, 800)
    })
}