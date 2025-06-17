

// ================== BURGER MENU ==================
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");
  const dropdowns = document.querySelectorAll(".dropdown");

  // Burger toggle
  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("open");
      navLinks.classList.toggle("open");
    });
  }

  // Dropdowns au clic sur mobile
  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector("a");
    if (trigger) {
      trigger.addEventListener("click", (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault(); // empêche le scroll
          dropdown.classList.toggle("open");
        }
      });
    }
  });

  // Fermer le menu burger quand on clique sur un lien hors dropdown
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      // Vérifie si on est en mode mobile (burger visible)
      if (window.innerWidth <= 768) {
        const isDropdownTrigger = link.parentElement.classList.contains('dropdown');
        const isInDropdown = link.closest('.dropdown') !== null;

        // On ferme uniquement si ce n'est pas un lien "À propos" (le trigger du dropdown)
        // et si ce n'est pas un sous-lien dans dropdown
        if (!isDropdownTrigger) {
          const burger = document.querySelector('.burger');
          const navLinks = document.querySelector('.nav-links');
          if (navLinks?.classList.contains('open')) {
            navLinks.classList.remove('open');
            if (burger) burger.classList.remove('open');
          }
        }
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
  if (dropdown) {
    dropdown.classList.toggle('open');
  }
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
const logo = document.getElementById('logo');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (toggleBtn) toggleBtn.textContent = theme === 'dark' ? '🌙' : '☀️';
  if (logo) logo.src = theme === 'dark' ? 'images/logo_white.png' : 'images/logo_black.png';
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
    if (heroTitle) heroTitle.innerHTML = s.title;
    if (heroSubtitle) heroSubtitle.textContent = s.text;
    if (heroButton) {
      heroButton.textContent = s.button;
      heroButton.href = s.link;
    }
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

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      current = (current - 1 + slides.length) % slides.length;
      showSlide(current);
      resetSlider();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      current = (current + 1) % slides.length;
      showSlide(current);
      resetSlider();
    });
  }

  showSlide(current);
  startSlider();
}


function openPopupDevis(service = "", titre = "") {
  const popup = document.getElementById("popupDevis");
  if (!popup) return;

  // Affiche le popup
  popup.style.display = "block";

  // S’il y a un titre à surcharger
  if (titre) {
    const popupTitle = document.getElementById("popupTitle");
    if (popupTitle) popupTitle.textContent = titre;
  }

  // Si un service est défini (tu peux adapter ce comportement)
  const selectedServiceDisplay = document.getElementById("selectedServiceDisplay");
  const serviceSelect = document.getElementById("service");
  const serviceFieldContainer = document.getElementById("serviceFieldContainer");

  if (service) {
    selectedServiceDisplay.textContent = `Service demandé : ${service}`;
    selectedServiceDisplay.style.display = "block";
    serviceFieldContainer.style.display = "none";
    document.getElementById("sourceDemande").value = service;
  } else {
    selectedServiceDisplay.style.display = "none";
    serviceFieldContainer.style.display = "block";
  }
}



// ================== SMOOTH SCROLL ==================
document.querySelectorAll('a[href^=\"#\"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior:'smooth' });
  });
});

// ================ POPUP VIDEO ========================
const iframes = document.querySelectorAll('iframe');
iframes.forEach((iframe) => {
  iframe.style.cursor = 'pointer';
  iframe.addEventListener('click', (e) => {
    e.preventDefault();

    const src = iframe.src;
    const popupIframe = document.getElementById('popupIframe');
    const videoPopup = document.getElementById('videoPopup');
    if (popupIframe && videoPopup) {
      popupIframe.src = src + "?autoplay=1";
      videoPopup.style.display = 'flex';
    }
  });
});

const closeBtn = document.querySelector('.close-btn');
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    const popup = document.getElementById('videoPopup');
    const iframe = document.getElementById('popupIframe');
    if (iframe) iframe.src = ""; // stop video
    if (popup) popup.style.display = 'none';
  });
}



// SCROLL VIDEO
document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".carousel-wrapper");
  if (!wrapper) return;

  const carousel = wrapper.querySelector(".carousel.video-scroll");
  const btnLeft = wrapper.querySelector(".carousel-btn.left");
  const btnRight = wrapper.querySelector(".carousel-btn.right");

  const scrollAmount = 340; // largeur approximative d'une carte + marge

  if (btnLeft && carousel) {
    btnLeft.addEventListener("click", () => {
      carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
  }

  if (btnRight && carousel) {
    btnRight.addEventListener("click", () => {
      carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  }
});


// Ta configuration Firebase (remplace par la tienne)
const firebaseConfig = {
  apiKey: "AIzaSyAH1qXpnLYr92FWoPzrcCwz1o9TXt1L-78",
  authDomain: "juste-doue-98c22.firebaseapp.com",
  projectId: "juste-doue-98c22",
  storageBucket: "juste-doue-98c22.firebasestorage.app",
  messagingSenderId: "133873422629",
  appId: "1:133873422629:web:4f80a8578309d989c50acc",
  measurementId: "G-G7BXMXF26L"
};

// Initialisation Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// ============= POPUP SERVICES ========================

  function submitServiceForm() {
    const form = document.getElementById("devisServiceForm");

    const nom = document.getElementById("nom").value.trim();
    const email = document.getElementById("email").value.trim();
    const tel = document.getElementById("tel").value.trim();
    const contact = document.getElementById("contact").value;
    const service = document.getElementById("serviceLocked").value.trim();
    const deadline = document.getElementById("deadline").value;
    const description = document.getElementById("description").value.trim();
    const chargement = document.getElementById("chargementService");

    // Vérification des champs requis
    if (!nom) {
      alert("Veuillez entrer votre nom.");
      return;
    }

    if (!email && !tel) {
      alert("Veuillez fournir au moins un email ou un téléphone.");
      return;
    }

    if (!contact) {
      alert("Veuillez sélectionner un moyen de communication préféré.");
      return;
    }

    if (!service) {
      alert("Le service concerné est manquant.");
      return;
    }

    // Affiche le spinner
    chargement.style.display = "inline-block";

    // Formatage de la clé Firebase
    const now = new Date();
    const dateKey = now.toISOString().replace(/[:.]/g, '-');

    // Construction de l'objet à envoyer
    const demandeService = {
      nom: nom,
      email: email || null,
      tel: tel || null,
      contactPrefere: contact,
      service: service,
      deadline: deadline || null,
      description: description || null,
      status: "non lu",
      dateSoumission: now.toISOString()
    };

    // Envoi vers Firebase
    firebase.database().ref("DemandeDevis/" + dateKey).set(demandeService)
      .then(() => {
        alert("Votre demande a été envoyée avec succès !");
        form.reset();
        document.getElementById("popupServiceDevis").style.display = "none";
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi :", error);
        alert("Une erreur est survenue lors de l'envoi.");
      })
      .finally(() => {
        chargement.style.display = "none";
      });
  }


// =============== POPUP DEVIS ===========================

// Fonction pour ouvrir le popup avec un titre et une source spécifique
function openPopupDevis(source = "Accueil", titreForm = "Besoin d’un devis ?") {
  const popupDevis = document.getElementById("popupDevis");
  const titre = popupDevis.querySelector("h1");
  const champSource = document.getElementById("sourceDemande");

  if (titre) titre.textContent = titreForm;
  if (champSource) champSource.value = source;

  popupDevis.style.display = "flex";
}

// Ouverture automatique 5 sec après le chargement
window.addEventListener('load', () => {
  const popupDevis = document.getElementById('popupDevis');
  if (popupDevis) {
    setTimeout(() => {
      openPopupDevis(); // Appel avec valeurs par défaut
    }, 5000);
  }
});

// Fermer popup au clic sur la croix
const closePopupDevis = document.getElementById('closePopupDevis');
if (closePopupDevis) {
  closePopupDevis.addEventListener('click', () => {
    const popupDevis = document.getElementById('popupDevis');
    if (popupDevis) popupDevis.style.display = 'none';
  });
}

// ENVOI DU DEVIS FIREBASE
const formDevis = document.getElementById("devisForm");

if (formDevis) {
  formDevis.addEventListener("submit", function (e) {
    e.preventDefault();

    const nom = document.getElementById("nom").value.trim();
    const email = document.getElementById("email").value.trim();
    const tel = document.getElementById("tel").value.trim();
    const service = document.getElementById("service").value.trim();
    const description = document.getElementById("description").value.trim();
    const fichierInput = document.getElementById("fichier");
    const fichier = fichierInput && fichierInput.files.length > 0
      ? fichierInput.files[0].name
      : "Aucun fichier";

    // Vérifier les champs requis
    if (!nom || !description) {
      alert("Veuillez remplir le nom et la description du projet.");
      return;
    }

    if (!email && !tel) {
      alert("Veuillez fournir au moins un moyen de contact (email ou téléphone).");
      return;
    }

    if (!service) {
      alert("Veuillez choisir un service.");
      return;
    }

    // Formatage de la clé Firebase
    const now = new Date();
    const dateKey = now.toISOString().replace(/[:.]/g, '-');

    // Objet à envoyer
    const nouvelleDemande = {
      nom: nom,
      email: email || null,
      tel: tel || null,
      service: service,
      description: description,
      fichier: fichier,
      status: "non lu",
      dateSoumission: now.toISOString()
    };

    // Envoi à Firebase
    firebase.database().ref("DemandeDevis/" + dateKey).set(nouvelleDemande)
      .then(() => {
        alert("Demande envoyée avec succès !");
        formDevis.reset();
        const popupDevis = document.getElementById("popupDevis");
        if (popupDevis) popupDevis.style.display = "none";
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi :", error);
        alert("Erreur lors de l'envoi du devis.");
      });
  });
}

// ENVOI MESSAGE DE CONTACT (resté inchangé)
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const c_nom = document.getElementById("contactNom").value.trim();
    const c_email = document.getElementById("contactEmail").value.trim();
    const c_tel = document.getElementById("contactTel").value.trim();
    const c_message = document.getElementById("contactMessage").value.trim();

    if (!c_nom || !c_message) {
      alert("Veuillez remplir le nom et le message.");
      return;
    }

    if (!c_email && !c_tel) {
      alert("Veuillez fournir au moins un moyen de contact (email ou téléphone).");
      return;
    }

    const now = new Date();
    const dateKey = now.toISOString().replace(/[:.]/g, '-');

    const nouveauMessage = {
      nom: c_nom,
      email: c_email || null,
      tel: c_tel || null,
      message: c_message,
      status: "non lu"
    };

    firebase.database().ref("MessagesContact/" + dateKey).set(nouveauMessage)
      .then(() => {
        alert("Message envoyé avec succès !");
        contactForm.reset();
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi :", error);
        alert("Erreur lors de l'envoi du message.");
      });
  });
}

//POPUP SERVICE ET FORMATIONS

