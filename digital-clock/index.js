let hour = document.querySelector(".h");
let minute = document.querySelector(".m");
let second = document.querySelector(".s");
let zone = document.querySelector(".am");

function clock() {


    const Time = new Date();
    let h = Time.getHours();
    let m = Time.getMinutes();
    let s = Time.getSeconds();
    let ampm = "AM";

    if (h > 12) {
        h = h - 12;
        ampm = "PM";
    }

    h = h<10 ? "0"+h : h;
    m = m<10 ? "0"+m : m;
    s = s<10 ? "0"+s : s;





    hour.innerHTML = h;
    minute.innerHTML = m;
    second.innerHTML = s;
    zone, (innerText = ampm);
    setInterval(() => {
        clock();
    }, 1000)

}

