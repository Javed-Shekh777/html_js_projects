const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const liveText = document.getElementById("live-text");
const tableBody = document.getElementById("table-body");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true; // लगातार सुनने के लिए
recognition.interimResults = true; // तुरंत अपडेट दिखाने के लिए
recognition.lang = "en-US"; // भाषा सेट करें

let silenceTimer; // यूजर के चुप होने पर टाइमर

// माइक्रोफोन चालू होने पर
recognition.onstart = function () {
  console.log("Listening...");
  liveText.innerHTML = "<p>Listening...</p>";
  var modal = new bootstrap.Modal(document.getElementById("voiceModal"));
  modal.show();
};

function addNoteToTable(text) {
  if (!text) return;

  const rowCount = tableBody.rows.length + 1;
  const tr = document.createElement("tr");

  tr.innerHTML = `
        <th scope="row">${rowCount}</th>
        <td>${text}</td>
        <td>
            <button class="btn btn-danger deleteBtn">Delete</button>
            <button class="btn btn-success updateBtn">Update</button>
        </td>
    `;

  tableBody.appendChild(tr);
  saveToStorage();
  console.log(rowCount);
}

function saveToStorage() {
  const notes = [];
  document.querySelectorAll("#notesTableBody tr").forEach((row) => {
    const noteText = row.querySelector("td").textContent;
    notes.push(noteText);
  });
  localStorage.setItem("voiceNotes", JSON.stringify(notes));
}

addNoteToTable("fidhfoidho");
// जब कुछ बोलेगा तो

recognition.onresult = function (event) {
  let transcript = "";
  for (let i = event.resultIndex; i < event.results.length; i++) {
    transcript += event.results[i][0].transcript + " ";
  }
  addNoteToTable(transcript.trim());

  clearTimeout(silenceTimer);
  silenceTimer = setTimeout(() => {
    recognition.stop();
    addNoteToTable(transcript.trim());
  }, 5000);
};

// जब यूजर चुप रहेगा तो
recognition.onspeechend = function () {
  clearTimeout(silenceTimer);
  silenceTimer = setTimeout(() => {
    recognition.stop();
  }, 5000);
};

// माइक्रोफोन बंद होने पर
recognition.onend = function () {
  addStorage();
  console.log("Stopped Listening");
};

// Start Listening Button
startBtn.addEventListener("click", () => {
  recognition.start();
});

// Stop Button
stopBtn.addEventListener("click", () => {
  recognition.stop();
});

console.log(JSON.parse(localStorage.getItem("todos")));
