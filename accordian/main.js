document.addEventListener("DOMContentLoaded", () => {
    const cutBtn = document.querySelector(".cut");
    const addBtn = document.querySelector(".addBtn");
    const accordion = document.querySelector(".accordion");
  
    // Cut button hide functionality
    cutBtn.addEventListener("click", function () {
      cutBtn.parentElement.style.display = "none";
    });
  
    // Form show on button click
    addBtn.addEventListener("click", function () {
      document.querySelector(".form").classList.add("active");
    });
  
    // ✅ FORM SUBMIT -> ADD NEW ACCORDION
    document.getElementById("myForm").addEventListener("submit", function (e) {
      e.preventDefault();
  
      let formData = new FormData(this);
      let values = Object.fromEntries(formData.entries());
  
      if (!values.title || !values.description) {
        alert("Please fill All fields.");
        return;
      }
  
      let article = document.createElement("article");
      article.classList.add("accordion-item");
  
      article.innerHTML = `
          <div class="accordion-header">
            <h1>${values?.title}</h1>
            <button type="button"><i class="fa-solid fa-plus"></i></button>
          </div>
          <div class="accordion-content">
            <p>${values?.description}</p>
          </div>`;
  
      document.querySelector(".form").classList.remove("active");
      accordion.appendChild(article);
  
      alert(`${values.title} Added.`);
    });
  
    // ✅ EVENT DELEGATION -> Handle Clicks on All Accordions (Existing + New)
    accordion.addEventListener("click", function (e) {
      if (e.target.closest(".accordion-header button")) {
        const btn = e.target.closest("button");
        const parent = btn.parentElement;
        const item = parent.parentElement;
        const iTag = btn.firstElementChild;
  
        const isActive = item.classList.contains("active");
  
        document.querySelectorAll(".accordion-item").forEach((it) => {
          it.classList.remove("active");
          it.querySelector("i").classList.add("fa-plus");
          it.querySelector("i").classList.remove("fa-minus");
        });
  
        if (!isActive) {
          iTag.classList.add("fa-minus");
          iTag.classList.remove("fa-plus");
  
          item.classList.add("active");
        }
      }
    });
  });
  