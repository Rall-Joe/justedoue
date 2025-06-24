// ================== INITIALISATION GÉNÉRALE DU DOM ==================
document.addEventListener("DOMContentLoaded", () => {
    // ================== BURGER MENU ET NAVIGATION ==================
    const burger = document.querySelector(".burger");
    const navLinks = document.querySelector(".nav-links");
    const dropdowns = document.querySelectorAll(".dropdown");
    const dropdownMenus = document.querySelectorAll('.dropdown-menu'); // NOUVEAU : Sélectionne tous les contenus de dropdown

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

    // ================== GESTION DU REDIMENSIONNEMENT DE LA FENÊTRE ==================
    // Cette fonction ferme le menu mobile et les dropdowns si on passe en mode desktop
    const handleResizeAndMenuClose = () => {
        if (window.innerWidth > 768) { // Si on passe en mode desktop
            if (navLinks && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open'); // Ferme le menu principal
            }
            if (burger && burger.classList.contains('open')) {
                burger.classList.remove('open'); // Réinitialise l'icône burger
            }
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('open'); // Ferme tous les dropdowns
            });
        }
    };

    // Écouteur pour le redimensionnement de la fenêtre
    window.addEventListener('resize', handleResizeAndMenuClose);
    // Exécuter une fois au chargement pour s'assurer du bon état initial si la page est chargée en desktop
    handleResizeAndMenuClose();

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
    const logo = document.getElementById('logo'); // Assurez-vous que votre logo a l'id 'logo'

    // Fonction pour mettre à jour le logo en fonction du thème et de l'état de scroll
    function updateLogo() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const isScrolled = window.scrollY > 50; // Ou la valeur que vous utilisez pour le scroll

        if (!logo) {
            console.error("L'élément avec l'ID 'logo' n'a pas été trouvé. Le logo ne peut pas être mis à jour.");
            return; // Quitte la fonction si le logo n'est pas trouvé
        }

        // Ajoutez ces console.log pour le débogage
        console.log(`updateLogo appelé: isScrolled=${isScrolled}, currentTheme=${currentTheme}`);

        if (isScrolled) {
            if (currentTheme === 'dark') {
                logo.src = 'images/logo_white.png'; // Scrollé en mode sombre
                console.log("-> Définition du logo: images/logo_white.png");
            } else {
                logo.src = 'images/logo_black.png'; // Scrollé en mode clair
                console.log("-> Définition du logo: images/logo_black.png");
            }
        } else {
            // Quand non scrollé, le logo doit toujours être 'all_white' (selon votre demande initiale)
            logo.src = 'images/logo_all_white.png'; // Non scrollé (par défaut, blanc)
            console.log("-> Définition du logo: images/logo_all_white.png");
        }
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (toggleBtn) toggleBtn.textContent = theme === 'dark' ? '🌙' : '☀️';
        updateLogo(); // Mettre à jour le logo après le changement de thème
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            setTheme(next);
        });
    }

    // Initialisation du thème au chargement
    // Ceci appellera également updateLogo via setTheme()
    setTheme(localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

    // ================== GESTION DE LA NAVIGATION AU SCROLL ==================
    const mainNav = document.getElementById('main-nav'); // Assurez-vous que votre élément <nav> a l'ID 'main-nav'

    if (mainNav) {
        window.addEventListener('scroll', () => {
            const isScrolled = window.scrollY > 50; // Ajustez cette valeur selon la hauteur à laquelle vous voulez que la nav change

            if (isScrolled) {
                mainNav.classList.add('scrolled');
                // NOUVEAU : Ajoute la classe 'scrolled' à tous les dropdown-menus
                dropdownMenus.forEach(dropdownMenu => {
                    dropdownMenu.classList.add('scrolled');
                });
            } else {
                mainNav.classList.remove('scrolled');
                // NOUVEAU : Retire la classe 'scrolled' de tous les dropdown-menus
                dropdownMenus.forEach(dropdownMenu => {
                    dropdownMenu.classList.remove('scrolled');
                });
            }
            updateLogo(); // Mettre à jour le logo à chaque scroll pour gérer le changement
        });
    }
    // Appel initial à updateLogo pour s'assurer que le logo est correctement configuré dès le chargement de la page
    updateLogo();
    // ================== FIN DES MODIFICATIONS LIÉES À LA NAV ==================

    // ================== HERO SLIDESHOW ==================
    const hero = document.getElementById('hero');
    if (hero) {
        const slides = [
            {
                image: 'images/slide_design.png',
                title: 'Commandez des visuels qui claque !',
                text: 'Logo pro dès 50 $ <span class="old-price">120 $</span>, flyers, vidéos, visuels réseaux, branding… Des créations modernes, personnalisées et livrées rapidement, à prix accessibles.',
                button: 'Demander un devis',
                link: 'javascript:void(0);',
                action: () => openPopupDevis("Carrousel", "Un visuel qui claque !") // ✅ Ici on précise la source et le titre
            },
            {
                image: 'images/slide_formations.jpg',
                title: 'Apprenez un métier, devenez indépendant',
                text: 'Formez-vous à partir de 30 $ <span class="old-price">50$</span> aux métiers de demain : graphisme, vidéo, marketing digital, création de contenu, développement mobile, UI/UX. Des formations pratiques pour devenir rapidement opérationnel, débutant ou en reconversion',
                button: 'Voir les formations',
                link: 'formations.html'
            },
            {
                image: 'images/slide_dev.jpg',
                title: 'Devenez pro avec un site ou une appli sur mesure',
                text: 'Sites web, boutiques en ligne, applications mobiles, interfaces sur mesure… Nous développons des solutions modernes, rapides et adaptées à vos besoins pour booster votre activité et votre image pro.',
                button: 'Demander un devis',
                link: 'javascript:void(0);',
                action: () => openPopupDevis("Carrousel", "Développement web & mobile") // ✅ Ici on précise la source et le titre
            },
            {
                image: 'images/slide_com.jpg',
                title: 'Marketing & Branding stratégique',
                text: 'Boostez votre business dès 100$/mois <span class="old-price">180$</span>',
                button: 'Parlons de votre projet',
                link: 'javascript:void(0);',
                action: () => openPopupDevis("Carrousel", "Marketing & Branding stratégique") // ✅ Ici on précise la source et le titre
            },
            {
                image: 'images/slide_about.jpg',
                title: 'Où sommes nous',
                text: '12, Av Lubao, Quartier Kinsuka, Commune de Selembao. Réf. Le Jardin & Crec 7. Ouvert du Lundi au Samedi à partir de 12h',
                button: 'Contactez nous',
                link: '#contact'
            }
        ];

        const images = document.querySelectorAll('.carousel-image');
        const title = document.getElementById('heroTitle');
        const subtitle = document.getElementById('heroSubtitle');
        const button = document.getElementById('heroButton');

        let currentIndex = 0;

        function updateSlide(index) {
            images.forEach((img, i) => {
                img.classList.toggle('active', i === index);
            });
            title.innerHTML = slides[index].title;
            subtitle.innerHTML = slides[index].text;
            button.textContent = slides[index].button;
            button.href = slides[index].link;
            if (slides[index].action) {
            button.onclick = slides[index].action;
            } else {
            button.onclick = null;
            }

        }

        // Contrôle manuel
        document.querySelector('.prev-slide').addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlide(currentIndex);
        });

        document.querySelector('.next-slide').addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlide(currentIndex);
        });

        // Rotation automatique
        setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlide(currentIndex);
        }, 15000);

        // Initialisation
        updateSlide(currentIndex);
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

function isHomePage() {
    const file = window.location.pathname.split('/').pop();
    return file === '' || file === 'index.html';
}


if (popupDevisAuto && isHomePage()) {
    setTimeout(() => {
        openPopupDevis();
    }, 45000);
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
            formation.style.display = 'flex';
        } else {
            formation.style.display = 'none';
        }
    });

    // Gère la classe 'active' pour les boutons de filtre (pour le style)
    document.querySelectorAll('.container button.btn').forEach(btn => {
        btn.classList.remove('active');
    });
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
const firebaseConfig = {
    apiKey: "AIzaSyAH1qXpnLYr92FWoPzrcCwz1o9TXt1L-78",
    authDomain: "juste-doue-98c22.firebaseapp.com",
    projectId: "juste-doue-98c22",
    storageBucket: "juste-doue-98c22.firebase-storage.app",
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

function openFormationPopup(formationName) {
    const popupFormation = document.getElementById("popupInscriptionFormation");
    if (!popupFormation) {
        console.warn("L'élément #popupInscriptionFormation n'a pas été trouvé. Le popup ne peut pas s'ouvrir.");
        return;
    }
    const titreFormationChoisie = document.getElementById("titreFormationChoisie");
    const inputFormationVerrouille = document.getElementById("inputFormationVerrouille");

    if (titreFormationChoisie) titreFormationChoisie.textContent = `Formation: ${formationName}`;
    if (inputFormationVerrouille) inputFormationVerrouille.value = formationName;

    // Cette ligne est cruciale : elle rend le popup visible
    popupFormation.style.display = "flex";
}

// ============= FONCTIONS DE SOUMISSION FIREBASE ========================

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

        // Remappage des noms de champs
        if (form.id === "devisServiceForm") {
            if (data.contact) {
                data.contactPrefere = data.contact;
                delete data.contact;
            }
            if (data.serviceLocked) {
                data.service = data.serviceLocked;
                delete data.serviceLocked;
            }
        } else if (form.id === "devisForm") {
            // Supprimer 'source' si défini et égal à 'Automatique'
            if (data.source === "Automatique") {
                delete data.source;
            }
            // Uniformiser contactPrefere s'il y a un champ contact
            if (data.contact) {
                data.contactPrefere = data.contact;
                delete data.contact;
            }
        }

        // Champs par défaut si absents
        if (!data.budget) data.budget = "Pas de budget défini";
        if (!data.dateLivraison) data.dateLivraison = "Non définie";

        const fichierInput = form.querySelector("input[type='file']");
        data.fichier = (fichierInput && fichierInput.files.length > 0)
            ? fichierInput.files[0].name
            : "Aucun fichier";

        // Ajout de l’origine de la demande
        data.origineDemande = originType;
        data.dateSoumission = new Date().toISOString();
        data.status = "non lu";

        // Validation
        let isValid = true;
        let errorMessage = "";

        if (!data.nom) {
            errorMessage = "Veuillez entrer votre nom.";
            isValid = false;
        }
        if (!data.email && !data.tel) {
            errorMessage = "Veuillez fournir au moins un email ou un téléphone.";
            isValid = false;
        }
        if (!data.service) {
            errorMessage = "Le service concerné est manquant.";
            isValid = false;
        }
        if (!data.description && form.id === "devisForm") {
            errorMessage = "Veuillez décrire votre projet.";
            isValid = false;
        }
        if (!data.contactPrefere) {
            errorMessage = "Veuillez sélectionner un moyen de communication préféré.";
            isValid = false;
        }

        if (!isValid) {
            alert(errorMessage);
            return;
        }

        // Enregistrement dans Firebase
        const dateKey = new Date().toISOString().replace(/[:.]/g, '-');
        data.id = dateKey;
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
        data.id = dateKey;
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
        data.id = dateKey;
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

//--------BOUTONS FILTRE CATEGORIE

function filterFormations(category) {
    const formations = document.querySelectorAll('main .service-row');
    formations.forEach(formation => {
        if (category === 'all' || formation.dataset.categorie === category) {
            formation.style.display = 'flex';
        } else {
            formation.style.display = 'none';
        }
    });

    // Met à jour le bouton actif
    document.querySelectorAll('.filter-carousel .btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const target = document.querySelector(`.filter-carousel .btn[onclick*="${category}"]`);
    if (target) target.classList.add('active');
}

document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.filter-carousel-wrapper');
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', e => {
      isDown = true;
      carousel.classList.add('grabbing');
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
      isDown = false;
      carousel.classList.remove('grabbing');
    });

    carousel.addEventListener('mouseup', () => {
      isDown = false;
      carousel.classList.remove('grabbing');
    });

    carousel.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1.5;
      carousel.scrollLeft = scrollLeft - walk;
    });
  });
