const eyeBtn1 = document.getElementById("eye1");
const eyeBtn2 = document.getElementById("eye2");

const passInput = document.getElementById("encrypt-password");
const pass = document.getElementById("decrypt-password");

const encryptBtn = document.getElementById("encrypt-btn");
const decryptBtn = document.getElementById("decrypt-btn");
const encryptForm = document.getElementById("encrypt-form");
const decryptForm = document.getElementById("decrypt-form");
const outputBox = document.getElementById("output-content");
const clipboardBtn = document.getElementById("clipboard");

const charToEmojiMap = {
  a: "😀",
  b: "😁",
  c: "😂",
  d: "🤣",
  e: "😃",
  f: "😄",
  g: "😅",
  h: "😆",
  i: "😉",
  j: "😊",
  k: "😋",
  l: "😎",
  m: "😍",
  n: "😘",
  o: "😗",
  p: "😙",
  q: "😚",
  r: "🙂",
  s: "🤗",
  t: "🤩",
  u: "🤔",
  v: "🤨",
  w: "😐",
  x: "😑",
  y: "😶",
  z: "🙄",
  " ": "🌀",
  1: "🔥",
  2: "🌊",
  3: "🌟",
  4: "⚡",
  5: "💧",
  6: "🌍",
  7: "🌞",
  8: "🍀",
  9: "🌈",
  0: "⭐",
};

const emojiToCharMap = Object.fromEntries(
  Object.entries(charToEmojiMap).map(([char, emoji]) => [emoji, char])
);

// 🔹 XOR Encryption Function
function xorEncrypt(text, password) {
  let passKey = password.split("").map((c) => c.charCodeAt(0));
  return text
    .split("")
    .map((char, i) =>
      String.fromCharCode(char.charCodeAt(0) ^ passKey[i % passKey.length])
    )
    .join("");
}

function encryptText(text, password) {
  let encryptedXor = xorEncrypt(text.toLowerCase(), password);
  return encryptedXor
    .split("")
    .map((char) => charToEmojiMap[char] || char)
    .join("");
}

function decryptText(emojiText, password) {
  let decryptedText = emojiText
    .split("")
    .map((emoji) => emojiToCharMap[emoji] || emoji)
    .join("");
  return xorEncrypt(decryptedText, password);
}

// 🔹 Event Handlers
function handleEncrypt(event) {
  event.preventDefault();
  let text = document.getElementById("encrypt-text").value;
  let password = document.getElementById("encrypt-password").value;
  document.getElementById("output-content").innerText = encryptText(
    text,
    password
  );
}

function handleDecrypt(event) {
  event.preventDefault();
  let text = document.getElementById("decrypt-text").value;
  let password = document.getElementById("decrypt-password").value;
  document.getElementById("output-content").innerText = decryptText(
    text,
    password
  );
}

function copyToClipboard() {
  let text = document.getElementById("output-content").innerText;
  navigator.clipboard.writeText(text).then(() => alert("Copied to clipboard!"));
}

// 🔹 Tab Switching
document.getElementById("encrypt-btn").addEventListener("click", function () {
  this.classList.add("active");
  document.getElementById("decrypt-btn").classList.remove("active");

  document.getElementById("encrypt-form").classList.add("active");
  document.getElementById("decrypt-form").classList.remove("active");
});

document.getElementById("decrypt-btn").addEventListener("click", function () {
  this.classList.add("active");
  document.getElementById("encrypt-btn").classList.remove("active");

  document.getElementById("decrypt-form").classList.add("active");
  document.getElementById("encrypt-form").classList.remove("active");
});

eyeBtn1.addEventListener("click", () => changeType(passInput));
eyeBtn2.addEventListener("click", () => changeType(pass));

function changeType(el) {
  console.log(el);
  console.log(el.getAttribute("type"));
  document.querySelector(".eye i").classList.toggle("bi-eye");

  if (el.getAttribute("type") === "password") {
    el.setAttribute("type", "text");
  } else {
    el.setAttribute("type", "password");
  }
}

clipboardBtn.addEventListener("click", copyToClipboard);
