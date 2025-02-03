const num1 = Math.ceil(10* Math.random());
const num2 = Math.ceil(10* Math.random());


const question = document.querySelector(".question");

question.innerText = `What is ${num1} add by ${num2}`;
const correctAns = num1 + num2 ;

const form = document.getElementById("form");



form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const ans = document.querySelector("#input");
    let scoreE = document.querySelector(".score");
    let score = window.localStorage.getItem("score") || 0;

    if(Number(ans.value)== Number(correctAns)){
        score++;
    }else{
        score--;
    }

    window.localStorage.setItem("score",score);
    scoreE.innerText =score;
    ans.value = "";

});

