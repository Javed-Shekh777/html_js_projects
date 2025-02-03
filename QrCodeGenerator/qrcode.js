let input = document.querySelector("input");
let button = document.querySelector(".button");
let qr = document.querySelector("#qr");

button.addEventListener("click", () => {
  //  fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${input.value}`,method="get")
  //  .then((res)=>{
  // console.log(res.url);
  //  })

  //    document.createElement('img',{src:`${}` })


  var qrcode = new QRCode("qr", `${input.value}`);

  console.log(qrcode);
  input.value = "";
});
