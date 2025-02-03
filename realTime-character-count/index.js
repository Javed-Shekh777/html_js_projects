const inputEl = document.getElementById("input");
inputEl.addEventListener("keyup",(e)=>{
  updateCounter();
});

updateCounter();

function updateCounter(){
    let totalCounter = document.getElementById("total-counter") ;
    let remainCounter = document.getElementById("remain-counter") ;
    
    totalCounter.innerText  =  inputEl.value.length;  
    console.log(typeof Number(totalCounter),typeof Number(remainCounter))
    remainCounter.innerText = inputEl.getAttribute("maxLength") - inputEl.value.length;
    
}