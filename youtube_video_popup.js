document.addEventListener('DOMContentLoaded', function () {
  const popup = document.getElementById('videoPopup');
  const iframe = document.getElementById('popupIframe');
  const closeBtn = popup.querySelector('.close-btn');

  document.querySelectorAll('.youtube-popup').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const videoUrl = this.getAttribute('href') + "?autoplay=1";
      iframe.src = videoUrl;
      popup.style.display = 'flex';
    });
  });

  closeBtn.addEventListener('click', function () {
    iframe.src = ""; // stop video
    popup.style.display = 'none';
  });

  // Fermer si on clique hors du contenu
  popup.addEventListener('click', function (e) {
    if (e.target === popup) {
      iframe.src = "";
      popup.style.display = 'none';
    }
  });
});
