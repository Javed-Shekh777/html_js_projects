const containerEl = document.querySelector(".container");

for (let i = 0; i < 30; i++) {
    const colorContainerEl = document.createElement("div");
    colorContainerEl.classList.add("color-container");
    containerEl.appendChild(colorContainerEl);
}


const allContainer = document.querySelectorAll(".color-container");



function randomColor() {
    const chars = "0123456789abcdef";
    const colorCodeLength = 6;
    var color = "";

    for (let index = 0; index < colorCodeLength; index++) {
        const randomNum = Math.floor(Math.random() * chars.length);
        color += chars.substring(randomNum, randomNum + 1);
    }

    return color;

}
function generateColor() {

    allContainer.forEach((colorContainer) => {
        const newColorCode = randomColor();

        colorContainer.style.backgroundColor = "#" + newColorCode;
        colorContainer.innerText = "#"+newColorCode;
    });
}

generateColor();
