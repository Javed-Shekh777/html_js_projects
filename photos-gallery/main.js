const galleryImages = document.querySelector(".gallery");
const loadmore = document.querySelector(".loadmore");

const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox img");
const closeBtn = document.querySelector(".cross i");
const prevBtn = document.querySelector(".prev i");
const nextBtn = document.querySelector(".next i");

let page = 1; // 🔥 Pagination ke liye
let images = []; // 🔥 Store all images for navigation
let currentIndex = 0; // 🔥 Track current image index

// 🔥 Fetch Images from Pexels API
async function fetchImages() {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=nature&per_page=10&page=${page}`,
      {
        headers: {
          Authorization:
            "bUo4uuvkmMtHffVEsMeo2BNDAyDJDZC6QXCW7LG8a008LiXSG5haNMKb",
        },
      }
    );

    const data = await response.json();
    console.log(`Page: ${page}`, data.photos);

    data.photos.forEach((image) => {
      images.push(image.src.large); // 🔥 Store images for lightbox navigation

      const box = document.createElement("div");
      box.classList.add("gallery-item"); // ✅ Correct structure maintain kar raha hai
      const imageBox = document.createElement("img");

      const el = document.createElement("div");
      el.classList.add("img-text");

      el.innerHTML = `
      <div class="img-text">
        
        <p class="text">${image.alt}</p>
      </div>
      `;

      imageBox.src = image.src.medium;
      imageBox.alt = `Image ${image.id}`;
      imageBox.dataset.index = images.length - 1; // ✅ Image ka index store kar raha hai
      box.appendChild(imageBox);
      box.appendChild(el);

      galleryImages.appendChild(box);
    });

    page++; // 🔥 Next page ke liye update
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

// 🔥 Open Lightbox on Image Click (Event Delegation)
galleryImages.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    currentIndex = Number(e.target.dataset.index); // ✅ Correct index access
    showLightbox(currentIndex);
  }
});

// 🔥 Show Lightbox Function
function showLightbox(index) {
  lightboxImg.src = images[index];
  lightbox.style.opacity = 1;
  // ✅ Correct image set in lightbox
  lightbox.classList.add("active"); // ✅ Show lightbox
}

// 🔥 Close Lightbox
closeBtn.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

// 🔥 Next & Prev Buttons
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length; // ✅ Loop back to first image
  showLightbox(currentIndex);
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length; // ✅ Loop back to last image
  showLightbox(currentIndex);
});

// 🔥 Load Images on Page Load
window.addEventListener("load", fetchImages);
loadmore.addEventListener("click", fetchImages);
