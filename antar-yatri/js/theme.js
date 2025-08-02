const themeToggle = document.getElementById("theme-icon");
const body = document.body;

function applyTheme(theme) {
  // Remove previous watermark if present
  const oldWatermark = document.querySelector('.background-watermark-image');
  if (oldWatermark) oldWatermark.remove();

  // Remove previous font style if present
  const oldFontStyle = document.getElementById("theme-font-style");
  if (oldFontStyle) oldFontStyle.remove();

  if (theme === "dark") {
    body.classList.add("dark-theme");
    themeToggle.innerHTML = "☀️ <span>Mode</span>";
    body.style.background = "linear-gradient(rgba(60,60,60,1), rgba(20,20,20,1))";
    addWatermarkImage('assets/background-dark.png');

    // Silver font color style for dark mode (no gold)
    const fontStyle = document.createElement("style");
    fontStyle.id = "theme-font-style";
    fontStyle.innerHTML = `
      body, body * {
        color: #c0c0c0 !important; /* Silver */
        text-shadow: 0 1px 2px #222 !important;
      }
      a, a * {
        color: #c0c0c0 !important; /* Silver for links too */
      }
      h1, h2, h3, h4, h5, h6 {
        color: #f8f8ff !important; /* GhostWhite for headings */
        text-shadow: 0 2px 8px #222 !important;
      }
    `;
    document.head.appendChild(fontStyle);

  } else {
    body.classList.remove("dark-theme");
    themeToggle.innerHTML = "🌙 <span>Mode</span>";
    body.style.background = "linear-gradient(rgba(254,248,227,1), rgba(249,231,180,1))";
    addWatermarkImage('assets/background-light.png');

    // Gold font color style for links in light mode
    const fontStyle = document.createElement("style");
    fontStyle.id = "theme-font-style";
    fontStyle.innerHTML = `
      body, body * {
        color: #222 !important;
        text-shadow: none !important;
      }
      a, a * {
        color: #ffd700 !important; /* Gold for links */
      }
      h1, h2, h3, h4, h5, h6 {
        color: #222 !important;
        text-shadow: none !important;
      }
    `;
    document.head.appendChild(fontStyle);
  }

  // Watermark image style (5% opacity)
  if (!document.getElementById("watermark-style")) {
    const style = document.createElement("style");
    style.id = "watermark-style";
    style.innerHTML = `
      .background-watermark-image {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        width: 100vw; height: 100vh;
        pointer-events: none;
        z-index: 0;
        opacity: 0.05;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: fixed;
      }
      body > * { position: relative; z-index: 1; }
    `;
    document.head.appendChild(style);
  }
}

// Helper to add watermark image overlay
function addWatermarkImage(src) {
  const imgDiv = document.createElement('div');
  imgDiv.className = 'background-watermark-image';
  imgDiv.style.backgroundImage = `url('${src}')`;
  document.body.appendChild(imgDiv);
}

// Theme switching logic
function toggleTheme() {
  const currentTheme = body.classList.contains("dark-theme") ? "light" : "dark";
  localStorage.setItem("theme", currentTheme);
  applyTheme(currentTheme);
}

themeToggle.addEventListener("click", toggleTheme);

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(savedTheme);
});
