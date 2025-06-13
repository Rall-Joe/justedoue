
document.querySelectorAll('.youtube-popup').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const videoUrl = this.getAttribute('href') + "?autoplay=1";
    const iframe = document.getElementById('popupIframe');
    iframe.src = videoUrl;
    document.getElementById('videoPopup').style.display = 'flex';
  });
});

document.querySelector('.close-btn').addEventListener('click', function() {
  const popup = document.getElementById('videoPopup');
  const iframe = document.getElementById('popupIframe');
  iframe.src = ""; // stop the video
  popup.style.display = 'none';
});

