// tiktok-popup.js

document.addEventListener("DOMContentLoaded", function () {
  if (!document.getElementById("tiktok-embed-script")) {
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    script.id = "tiktok-embed-script";
    document.head.appendChild(script);
  }

  document.querySelectorAll(".tiktok-popup").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();

      const url = el.getAttribute("href");
      const videoIdMatch = url.match(/video\/(\d+)/);
      const videoId = videoIdMatch ? videoIdMatch[1] : null;

      if (!videoId) {
        alert("Impossible de charger la vidéo TikTok.");
        return;
      }

      const overlay = document.createElement("div");
      overlay.className = "tiktok-popup-overlay";

      const content = document.createElement("div");
      content.className = "tiktok-popup-content";
      content.innerHTML = `
        <span class="tiktok-popup-close">&times;</span>
        <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@joe.betyna/video/${videoId}" data-video-id="${videoId}" style="max-width: 325px; min-width: 250px;">
          <section>Chargement…</section>
        </blockquote>
      `;

      overlay.appendChild(content);
      document.body.appendChild(overlay);

      // Recharge le script TikTok
      if (window.tiktok && window.tiktok.load) {
        window.tiktok.load();
      } else {
        const tikscript = document.createElement("script");
        tikscript.src = "https://www.tiktok.com/embed.js";
        tikscript.async = true;
        document.body.appendChild(tikscript);
      }

      content.querySelector(".tiktok-popup-close").addEventListener("click", function () {
        overlay.remove();
      });
    });
  });
});
