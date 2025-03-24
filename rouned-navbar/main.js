const mainBtn = document.querySelector(".main-btn");
const main = document.querySelector('.main');
const btnIcon = document.querySelector('.btnIcon')


mainBtn.addEventListener("click",()=>{
    main.classList.toggle("change");
    btnIcon.classList.toggle('fa-check');
});