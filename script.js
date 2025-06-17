// ================== INITIALISATION GÉNÉRALE DU DOM ==================
document.addEventListener("DOMContentLoaded", () => {
    // ================== BURGER MENU ET NAVIGATION ==================
    const burger = document.querySelector(".burger");
    const navLinks = document.querySelector(".nav-links");
    const dropdowns = document.querySelectorAll(".dropdown");

    if (burger && navLinks) {
        burger.addEventListener("click", () => {
            burger.classList.toggle("open");
            navLinks.classList.toggle("open");
        });
    }

    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector("a");
        if (trigger) {
            trigger.addEventListener("click", (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle("open");
                }
            });
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                const isDropdownTrigger = link.parentElement.classList.contains('dropdown');
                if (!isDropdownTrigger) {
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

    if (activePage === 'apropos') {
        const aProposLink = document.querySelector('.dropdown > .nav-link');
        if (aProposLink) {
            aProposLink.classList.add('active');
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
                image: 'images/slide_service.jpg',
                title: 'Je suis juste doué',
                text: 'Venez voir mes projets extraordinaires',
                button: 'Mes projets',
                link: 'https://www.google.fr/'
                
            }
        ];

        const heroTitleElement = hero.querySelector('h1.fade-in');
        const heroSubtitleElement = hero.querySelector('p.fade-in');
        const heroButtonElement = hero.querySelector('.hero-content .btn');

        const imgs = hero.querySelectorAll('.carousel-image');
        const prevBtn = hero.querySelector('.prev-slide');
        const nextBtn = hero.querySelector('.next-slide');

        let current = 0;
        let intervalId;

        function showSlide(i) {
            imgs.forEach((img, idx) => img.classList.toggle('active', idx === i));
            const s = slides[i];
            if (heroTitleElement) heroTitleElement.innerHTML = s.title;
            if (heroSubtitleElement) heroSubtitleElement.textContent = s.text;
            if (heroButtonElement) {
                heroButtonElement.textContent = s.button;
                heroButtonElement.href = s.link;
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

        showSlide(current);
        startSlider();

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
    }

    // ================== POPUP VIDEO ========================
    const videoPopup = document.getElementById('videoPopup');
    const popupIframe = document.getElementById('popupIframe');
    const videoCloseBtn = videoPopup ? videoPopup.querySelector('.close-btn') : null;

    document.querySelectorAll('[data-video-src]').forEach((triggerElement) => {
        triggerElement.style.cursor = 'pointer';
        triggerElement.addEventListener('click', () => {
            const videoSrc = triggerElement.dataset.videoSrc;
            if (popupIframe && videoPopup && videoSrc) {
                popupIframe.src = videoSrc + "?autoplay=1";
                videoPopup.style.display = 'flex';
            }
        });
    });

    if (videoCloseBtn) {
        videoCloseBtn.addEventListener('click', () => {
            if (popupIframe) popupIframe.src = "";
            if (videoPopup) videoPopup.style.display = 'none';
        });
    }

    if (videoPopup) {
        videoPopup.addEventListener('click', (e) => {
            if (e.target === videoPopup) {
                if (popupIframe) popupIframe.src = "";
                videoPopup.style.display = 'none';
            }
        });
    }

    // ================== SCROLL VIDEO CAROUSEL ========================
    const carouselWrapper = document.querySelector(".carousel-wrapper");
    if (carouselWrapper) {
        const carousel = carouselWrapper.querySelector(".carousel.video-scroll");
        const btnLeft = carouselWrapper.querySelector(".carousel-btn.left");
        const btnRight = carouselWrapper.querySelector(".carousel-btn.right");

        const scrollAmount = 340;

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
    }

    // =============== LOGIQUE DU POPUP DE DEVIS AUTOMATIQUE ===========================
    const popupDevisAuto = document.getElementById('popupDevis');
    const currentPage = window.location.pathname.split('/').pop();

    if (popupDevisAuto && currentPage === 'index.html') {
        setTimeout(() => {
            openPopupDevis();
        }, 5000);
    }

    // ================== GESTIONNAIRES DE SOUMISSION DES FORMULAIRES ==================
    const formDevis = document.getElementById("devisForm");
    if (formDevis) {
        formDevis.addEventListener("submit", function (e) {
            e.preventDefault();
            submitDevisForm(formDevis, "ToutesDemandesDevis/", "Devis Principal");
        });
    }

    const devisServiceForm = document.getElementById("devisServiceForm");
    if (devisServiceForm) {
        devisServiceForm.addEventListener("submit", function (e) {
            e.preventDefault();
            submitDevisForm(devisServiceForm, "ToutesDemandesDevis/", "Devis Service");
        });
    }

    const formInscriptionFormation = document.getElementById("formInscriptionFormation");
    if (formInscriptionFormation) {
        formInscriptionFormation.addEventListener("submit", function (e) {
            e.preventDefault();
            submitFormationForm(formInscriptionFormation, "InscriptionsFormations/");
        });
    }

    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            submitContactForm(contactForm, "MessagesContact/");
        });
    }
}); // Fin de DOMContentLoaded

// ================== FONCTIONS GLOBALES (Hors DOMContentLoaded) ==================

// Fonction pour fermer un popup générique
function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = "none";
        if (popupId === 'videoPopup') {
            const iframe = document.getElementById('popupIframe');
            if (iframe) iframe.src = "";
        }
        const form = popup.querySelector('form');
        if (form) form.reset();
    }
}

// Fonction de filtrage des formations
function filterFormations(category) {
    const formations = document.querySelectorAll('main .service-row');
    formations.forEach(formation => {
        if (category === 'all' || formation.dataset.categorie === category) {
            formation.style.display = 'flex'; // Assurez-vous que c'est 'flex' pour votre layout
        } else {
            formation.style.display = 'none';
        }
    });

    // Optionnel: Gérer la classe 'active' pour les boutons de filtre
    document.querySelectorAll('.container button.btn').forEach(btn => {
        btn.classList.remove('active'); // Supprime la classe 'active' de tous les boutons
    });
    // Ajoute la classe 'active' au bouton cliqué
    const clickedButton = document.querySelector(`.container button.btn[onclick*="${category}"]`);
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
}


// ================== SMOOTH SCROLL ==================
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
    });
});

// ============= FIREBASE INITIALIZATION ========================
// Assurez-vous que les scripts Firebase sont chargés AVANT script.js dans votre HTML
// Exemple dans votre body :
// <script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-database-compat.js"></script>
// <script src="script.js"></script>

const firebaseConfig = {
    apiKey: "AIzaSyAH1qXpnLYr92FWoPzrcCwz1o9TXt1L-78",
    authDomain: "juste-doue-98c22.firebaseapp.com",
    projectId: "juste-doue-98c22",
    storageBucket: "juste-doue-98c22.firebasestorage.app",
    messagingSenderId: "133873422629",
    appId: "1:133873422629:web:4f80a8578309d989c50acc",
    measurementId: "G-G7BXMXF26L"
};

let database = null;

if (typeof firebase !== 'undefined') {
    let app;
    if (!firebase.apps.length) {
        try {
            app = firebase.initializeApp(firebaseConfig);
            console.log("Firebase App initialisée.");
        } catch (e) {
            console.error("Erreur lors de l'initialisation de Firebase App:", e);
        }
    } else {
        app = firebase.app();
        console.log("Firebase App déjà initialisée.");
    }

    if (app) {
        try {
            database = app.database();
            console.log("Firebase Database obtenue avec succès.");
        } catch (e) {
            console.error("Erreur lors de l'obtention de l'instance Firebase Database:", e);
            database = null;
        }
    }
} else {
    console.error("L'objet global 'firebase' est indéfini. Assurez-vous que les scripts Firebase sont correctement chargés dans votre HTML.");
}


// ============= FONCTIONS POUR L'OUVERTURE DES POPUPS ========================

function openPopupDevis(source = "Automatique", titreForm = "Besoin d’un devis ?") {
    const popupDevis = document.getElementById("popupDevis");
    if (!popupDevis) {
        console.warn("L'élément #popupDevis n'a pas été trouvé. Le popup ne peut pas s'ouvrir.");
        return;
    }
    const titreElement = popupDevis.querySelector("h1");
    const champSource = document.getElementById("sourceDemande");

    if (titreElement) titreElement.textContent = titreForm;
    if (champSource) champSource.value = source;

    popupDevis.style.display = "flex";
}

function openDevisPopup(serviceName) {
    const popupServiceDevis = document.getElementById("popupServiceDevis");
    if (!popupServiceDevis) {
        console.warn("L'élément #popupServiceDevis n'a pas été trouvé. Le popup ne peut pas s'ouvrir.");
        return;
    }
    document.getElementById("popupServiceTitle").textContent = "Demande de devis pour : " + serviceName;
    document.getElementById("serviceLocked").value = serviceName;
    popupServiceDevis.style.display = "flex";
}

function openFormationPopup(nomFormation) {
  document.getElementById('popupInscriptionFormation').style.display = 'flex';
  document.getElementById('titreFormationChoisie').textContent = nomFormation;
  document.getElementById('inputFormationVerrouille').value = nomFormation;
}

function closePopup(id) {
  document.getElementById(id).style.display = 'none';
}


// ============= FONCTIONS DE SOUMISSION FIREBASE ========================

// Ajout du paramètre `originType` pour distinguer l'origine de la demande
async function submitDevisForm(form, dbPath, originType) {
    const loader = form.querySelector(".spinner");
    const submitBtn = form.querySelector("button[type='submit']");

    if (loader) loader.style.display = "inline-block";
    if (submitBtn) submitBtn.disabled = true;

    try {
        if (!database) {
            throw new Error("Firebase Database non initialisée. Vérifiez votre connexion et configuration Firebase.");
        }

        const formData = new FormData(form);
        const data = {};
        for (let [key, value] of formData.entries()) {
            const trimmedValue = String(value).trim();
            data[key] = trimmedValue === '' ? null : trimmedValue;
        }

        let isValid = true;
        let errorMessage = "";

        // Ajout de l'origine de la demande
        data.origineDemande = originType;

        // Validation pour le popup de devis principal
        if (form.id === "devisForm") {
            if (!data.nom || !data.description) { errorMessage = "Veuillez remplir votre nom et la description du projet."; isValid = false; }
            if (!data.email && !data.tel) { errorMessage = "Veuillez fournir au moins un moyen de contact (email ou téléphone)."; isValid = false; }
            if (!data.service) { errorMessage = "Veuillez choisir un service."; isValid = false; }
        }
        // Validation pour le popup de demande de service
        else if (form.id === "devisServiceForm") {
            if (!data.nom) { errorMessage = "Veuillez entrer votre nom."; isValid = false; }
            if (!data.email && !data.tel) { errorMessage = "Veuillez fournir au moins un email ou un téléphone."; isValid = false; }
            if (!data.contact) { errorMessage = "Veuillez sélectionner un moyen de communication préféré."; isValid = false; }
            if (!data.serviceLocked) { errorMessage = "Le service concerné est manquant."; isValid = false; }
        }

        if (!isValid) {
            alert(errorMessage);
            return;
        }

        data.dateSoumission = new Date().toISOString();
        data.status = "non lu";

        const fichierInput = form.querySelector("input[type='file']");
        if (fichierInput && fichierInput.files.length > 0) {
            data.fichier = fichierInput.files[0].name;
            // TODO: Implémenter l'upload vers Firebase Storage si vous le souhaitez
        } else {
            data.fichier = "Aucun fichier";
        }

        const dateKey = new Date().toISOString().replace(/[:.]/g, '-');
        await database.ref(dbPath + dateKey).set(data);

        alert("Votre demande a été envoyée avec succès !");
        form.reset();
        const popupToClose = form.closest('.modal-overlay') || form.closest('.modal');
        if (popupToClose) {
            closePopup(popupToClose.id);
        }

    } catch (error) {
        console.error("Erreur lors de l'envoi :", error);
        alert("Une erreur est survenue lors de l'envoi de votre demande. " + error.message);
    } finally {
        if (loader) loader.style.display = "none";
        if (submitBtn) submitBtn.disabled = false;
    }
}

async function submitFormationForm(form, dbPath) {
    const loader = form.querySelector(".spinner");
    const submitBtn = form.querySelector("button[type='submit']");

    if (loader) loader.style.display = "inline-block";
    if (submitBtn) submitBtn.disabled = true;

    try {
        if (!database) {
            throw new Error("Firebase Database non initialisée.");
        }

        const formData = new FormData(form);
        const data = {};
        for (let [key, value] of formData.entries()) {
            const trimmedValue = String(value).trim();
            data[key] = trimmedValue === '' ? null : trimmedValue;
        }

        let isValid = true;
        let errorMessage = "";

        if (!data.nom) { errorMessage = "Veuillez entrer votre nom."; isValid = false; }
        if (!data.email && !data.tel) { errorMessage = "Veuillez fournir au moins un email ou un téléphone."; isValid = false; }
        if (!data.formation) { errorMessage = "La formation est manquante."; isValid = false; }
        if (!data.paiement) { errorMessage = "Veuillez choisir un mode de paiement."; isValid = false; }

        if (!isValid) {
            alert(errorMessage);
            return;
        }

        data.dateSoumission = new Date().toISOString();
        data.status = "non lu";

        const dateKey = new Date().toISOString().replace(/[:.]/g, '-');
        await database.ref(dbPath + dateKey).set(data);

        alert("Votre inscription a été envoyée avec succès !");
        form.reset();
        closePopup('popupInscriptionFormation');
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'inscription :", error);
        alert("Une erreur est survenue lors de l'envoi de votre inscription. " + error.message);
    } finally {
        if (loader) loader.style.display = "none";
        if (submitBtn) submitBtn.disabled = false;
    }
}

async function submitContactForm(form, dbPath) {
    const loader = form.querySelector(".spinner");
    const submitBtn = form.querySelector("button[type='submit']");

    if (loader) loader.style.display = "inline-block";
    if (submitBtn) submitBtn.disabled = true;

    try {
        if (!database) {
            throw new Error("Firebase Database non initialisée.");
        }

        const formData = new FormData(form);
        const data = {};
        for (let [key, value] of formData.entries()) {
            const trimmedValue = String(value).trim();
            data[key] = trimmedValue === '' ? null : trimmedValue;
        }

        let isValid = true;
        let errorMessage = "";

        // CORRECTION ICI pour utiliser les noms 'name' de votre HTML
        if (!data.nom || !data.message) {
            errorMessage = "Veuillez remplir votre nom et le message.";
            isValid = false;
        }
        if (!data.email && !data.tel) {
            errorMessage = "Veuillez fournir au moins un moyen de contact (email ou téléphone).";
            isValid = false;
        }

        if (!isValid) {
            alert(errorMessage);
            return;
        }

        data.dateSoumission = new Date().toISOString();
        data.status = "non lu";

        const dateKey = new Date().toISOString().replace(/[:.]/g, '-');
        await database.ref(dbPath + dateKey).set(data);

        alert("Votre message a été envoyé avec succès !");
        form.reset();
    } catch (error) {
        console.error("Erreur lors de l'envoi du message de contact :", error);
        alert("Une erreur est survenue lors de l'envoi de votre message. " + error.message);
    } finally {
        if (loader) loader.style.display = "none";
        if (submitBtn) submitBtn.disabled = false;
    }
}
