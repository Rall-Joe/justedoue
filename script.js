// ================== BURGER MENU ==================
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");
  const dropdowns = document.querySelectorAll(".dropdown");

  // Burger toggle
  burger.addEventListener("click", () => {
    burger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  // Dropdowns au clic sur mobile
  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector("a");

    trigger.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault(); // empêche le scroll
        dropdown.classList.toggle("open");
      }
    });
  });

  // ================== NAV – LIEN ACTIF ==================
  const file = location.pathname.split('/').pop() || 'index.html';
  const map = {
    'index.html': 'accueil',
    'services.html': 'services',
    'formations.html': 'formations',
    'realisations.html': 'realisations',
    'apropos.html': 'apropos'
  };

  const activePage = map[file];

  document.querySelectorAll('.nav-link')
    .forEach(a => {
      const page = a.dataset.page;
      if (page === activePage) {
        a.classList.add('active');
      }
    });

  // Spécifiquement activer "À propos" dans le dropdown
  if (activePage === 'apropos') {
    const aProposLink = document.querySelector('.dropdown > .nav-link');
    if (aProposLink) {
      aProposLink.classList.add('active');
    }
  }
});

function toggleDropdown(event) {
  event.preventDefault();
  const dropdown = event.target.closest('.dropdown');
  dropdown.classList.toggle('open');
}



// ================== FADE-IN ON SCROLL ==================
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.15 };
const appearOnScroll = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    obs.unobserve(entry.target);
  });
}, appearOptions);
faders.forEach(el => appearOnScroll.observe(el));

// ================== THEME TOGGLE + LOGO ==================
const toggleBtn = document.querySelector('.toggle-theme');
const logo      = document.getElementById('logo');
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (toggleBtn) toggleBtn.textContent = theme === 'dark' ? '🌙' : '☀️';
  if (logo)      logo.src = theme === 'dark' ? 'images/logo_white.png' : 'images/logo_black.png';
}
if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(next);
  });
}
setTheme(localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));







// ================== HERO SLIDESHOW ==================
const hero = document.getElementById('hero');
if (hero) {
  const slides = [
    {
      image: 'images/slide_services.jpg',
      title: 'Boostez votre marque avec nos services créatifs',
      text: 'Design graphique, motion design et vidéos percutantes.',
      button: 'Voir nos services',
      link: 'services.html'
    },
    {
      image: 'images/slide_formations.jpg',
      title: 'Formations pratiques et accessibles',
      text: 'Passez de passionné à juste doué grâce à nos cours.',
      button: 'Découvrir les formations',
      link: 'formations.html'
    },
    {
      image: 'images/slide_realisations.jpg',
      title: 'Découvrez nos réalisations',
      text: 'Des projets concrets qui parlent d’eux-mêmes.',
      button: 'Voir nos projets',
      link: '#design'
    },
    {
      image: 'images/slide_servie',
      title: 'Je suis juste doué',
      text: 'Venez voir mes projets extra ordinaires',
      button: 'Mes projet',
      link: 'https://www.google.fr/'
    }
  ];

  const imgs = hero.querySelectorAll('.carousel-image');
  const heroTitle = document.getElementById('heroTitle');
  const heroSubtitle = document.getElementById('heroSubtitle');
  const heroButton = document.getElementById('heroButton');

  const prevBtn = hero.querySelector('.prev-slide');
  const nextBtn = hero.querySelector('.next-slide');

  let current = 0;
  let intervalId;

  function showSlide(i) {
    imgs.forEach((img, idx) => img.classList.toggle('active', idx === i));
    const s = slides[i];
    heroTitle.innerHTML = s.title;
    heroSubtitle.textContent = s.text;
    heroButton.textContent = s.button;
    heroButton.href = s.link;
  }

  function startSlider() {
    intervalId = setInterval(() => {
      current = (current + 1) % slides.length;
      showSlide(current);
    }, 7000);
  }

  function resetSlider() {
    clearInterval(intervalId);
    startSlider();
  }

  prevBtn.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
    resetSlider();
  });

  nextBtn.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    showSlide(current);
    resetSlider();
  });

  showSlide(current);
  startSlider();
}


// ================== CONTACT FORM (DEMO) ==================
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Merci ! Nous reviendrons vers vous très vite.');
    form.reset();
  });
}

// ================== SMOOTH SCROLL ==================
document.querySelectorAll('a[href^=\"#\"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior:'smooth' });
  });
});

// ================ POPUP VIDEO ========================

document.querySelectorAll('iframe').forEach((iframe) => {
  iframe.style.cursor = 'pointer';
  iframe.addEventListener('click', (e) => {
    e.preventDefault();

    const src = iframe.src;
    document.getElementById('popupIframe').src = src + "?autoplay=1";
    document.getElementById('videoPopup').style.display = 'flex';
  });
});

document.querySelector('.close-btn').addEventListener('click', () => {
  const popup = document.getElementById('videoPopup');
  const iframe = document.getElementById('popupIframe');
  iframe.src = ""; // stop video
  popup.style.display = 'none';
});

// =============== POPUP DEVIS ===========================

// Affiche le popup devis 5 secondes après le chargement
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.getElementById('popupDevis').style.display = 'flex';
      }, 5000);
    });

    // Fermer popup au clic sur la croix
    document.getElementById('closePopupDevis').addEventListener('click', () => {
      document.getElementById('popupDevis').style.display = 'none';
    });


    // Initialisation de EmailJS
  emailjs.init("F8EgPtXFroa6eBHha");


  // Gérer la soumission du formulaire devis
  document.getElementById('formDevis').addEventListener('submit', function(e) {
    e.preventDefault();

    const nom = document.getElementById('nom').value.trim();
    const email = document.getElementById('emailDevis').value.trim();
    const service = document.getElementById('service').value;
    const details = document.getElementById('details').value.trim();

    if (!nom || !email || !service) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const params = {
      nom: nom,
      email: email,
      service: service,
      details: details
    };

    emailjs.send("service_nb3gnd5", "template_au6dzk3", params)
      .then(() => {
        alert(`Merci ${nom}, votre demande de devis pour "${service}" a été envoyée !`);
        document.getElementById('formDevis').reset();
        document.getElementById('popupDevis').style.display = 'none';
      })
      .catch((error) => {
        console.error("Erreur EmailJS :", error);
        alert("Une erreur s’est produite lors de l’envoi. Vérifie tes identifiants EmailJS ou réessaie plus tard.");
      });
  });



// ============== POUR AFFICHER SEULEMENT LES FORMATION DANS LA CATEGORIE CHOISIE ==========





  function filterFormations(categorie) {
      const sections = document.querySelectorAll('.service-row');
      sections.forEach(section => {
        const cat = section.getAttribute('data-categorie');
        if (categorie === 'all' || cat === categorie) {
          section.style.display = 'flex';
        } else {
          section.style.display = 'none';
        }
      });
    }



// SCROLL VIDEO

// Script pour faire défiler horizontalement les vidéos au clic des boutons
    document.addEventListener("DOMContentLoaded", () => {
      const wrapper = document.querySelector(".carousel-wrapper");
      const carousel = wrapper.querySelector(".carousel.video-scroll");
      const btnLeft = wrapper.querySelector(".carousel-btn.left");
      const btnRight = wrapper.querySelector(".carousel-btn.right");

      const scrollAmount = 340; // largeur approximative d'une carte + marge

      btnLeft.addEventListener("click", () => {
        carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      });

      btnRight.addEventListener("click", () => {
        carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
    });



  