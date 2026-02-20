'use strict';

/* ══════════════════════════════════════════════════════════════
   TYPED.JS
══════════════════════════════════════════════════════════════ */
new Typed('.typed-target', {
    strings: [
        'Computer Science Graduate',
        'Junior Software Developer',
        'Data Analyst'
    ],
    typeSpeed:   60,
    backSpeed:   40,
    backDelay:   2200,
    loop:        true,
    smartBackspace: true,
});

/* ══════════════════════════════════════════════════════════════
   FOOTER YEAR
══════════════════════════════════════════════════════════════ */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ══════════════════════════════════════════════════════════════
   PRELOADER
══════════════════════════════════════════════════════════════ */
window.addEventListener('load', () => {
    const pl = document.getElementById('preloader');
    if (!pl) return;
    setTimeout(() => {
        pl.classList.add('gone');
        pl.addEventListener('transitionend', () => pl.remove(), { once: true });
    }, 500);
});

/* ══════════════════════════════════════════════════════════════
   HEADER — scroll + active nav
══════════════════════════════════════════════════════════════ */
const header   = document.getElementById('header');
const backTop  = document.getElementById('backTop');
const sections = [...document.querySelectorAll('section[id]')];
const navLinks = [...document.querySelectorAll('.nav-link')];

function onScroll() {
    // Sticky header
    header.classList.toggle('scrolled', window.scrollY > 20);

    // Back-to-top button
    if (backTop) backTop.classList.toggle('visible', window.scrollY > 500);

    // Active nav link
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 160) current = sec.id;
    });
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === `#${current}`);
    });
}

window.addEventListener('scroll', onScroll, { passive: true });

/* ══════════════════════════════════════════════════════════════
   MOBILE NAV
══════════════════════════════════════════════════════════════ */
const hamburger   = document.getElementById('hamburger');
const navbar      = document.getElementById('navbar');
const navBackdrop = document.getElementById('navBackdrop');

function openNav() {
    hamburger.classList.add('open');
    navbar.classList.add('open');
    navBackdrop.classList.add('visible');
    document.body.style.overflow = 'hidden';
}

function closeNav() {
    hamburger.classList.remove('open');
    navbar.classList.remove('open');
    navBackdrop.classList.remove('visible');
    document.body.style.overflow = '';
}

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navbar.classList.contains('open') ? closeNav() : openNav();
    });
}
if (navBackdrop) navBackdrop.addEventListener('click', closeNav);
navLinks.forEach(link => link.addEventListener('click', closeNav));

/* ══════════════════════════════════════════════════════════════
   SMOOTH SCROLL
══════════════════════════════════════════════════════════════ */
document.addEventListener('click', e => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const id = anchor.getAttribute('href');

    if (id === '#' || id === '#home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    const target = document.querySelector(id);
    if (target) {
        e.preventDefault();
        const offset = (header ? header.offsetHeight : 70) + 8;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
});

/* ══════════════════════════════════════════════════════════════
   SCROLL REVEAL (IntersectionObserver)
══════════════════════════════════════════════════════════════ */
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right')
    .forEach(el => revealObs.observe(el));

/* ══════════════════════════════════════════════════════════════
   STATS COUNTER
══════════════════════════════════════════════════════════════ */
let countersRan = false;
const counters  = document.querySelectorAll('.stat-num');

const statsObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !countersRan) {
        countersRan = true;
        counters.forEach(el => {
            const target   = parseInt(el.dataset.target, 10);
            const duration = 1400;
            const step     = target / (duration / 16);
            let current    = 0;

            const tick = () => {
                current = Math.min(current + step, target);
                el.textContent = Math.floor(current) + '+';
                if (current < target) requestAnimationFrame(tick);
                else el.textContent = target + '+';
            };
            requestAnimationFrame(tick);
        });
        statsObs.disconnect();
    }
}, { threshold: 0.6 });

const statsStrip = document.querySelector('.stats-strip');
if (statsStrip) statsObs.observe(statsStrip);

/* ══════════════════════════════════════════════════════════════
   SKILL BAR ANIMATION
══════════════════════════════════════════════════════════════ */
const barsObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.bar-fill').forEach(fill => {
                fill.style.width = fill.dataset.w + '%';
            });
            barsObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const skillsLayout = document.querySelector('.skills-layout');
if (skillsLayout) barsObs.observe(skillsLayout);

/* ══════════════════════════════════════════════════════════════
   RING CHART ANIMATION
   Circumference = 2 * π * r = 2 * π * 40 ≈ 251.2
══════════════════════════════════════════════════════════════ */
const CIRCUMFERENCE = 2 * Math.PI * 40;

const ringsObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.r-fill').forEach(circle => {
                const pct    = parseFloat(circle.dataset.pct);
                const offset = CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE;
                circle.style.strokeDashoffset = offset;
            });
            ringsObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const ringsGrid = document.querySelector('.rings-grid');
if (ringsGrid) ringsObs.observe(ringsGrid);

/* ══════════════════════════════════════════════════════════════
   PORTFOLIO FILTER
══════════════════════════════════════════════════════════════ */
const filterBtns = document.querySelectorAll('.filter-btn');
const portCards  = document.querySelectorAll('.port-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        portCards.forEach(card => {
            const cats  = card.dataset.cat || '';
            const match = filter === 'all' || cats.split(' ').includes(filter);

            if (match) {
                card.style.display = '';
                // Small timeout so display:'' applies before class re-adds reveal transition
                requestAnimationFrame(() => card.classList.remove('hidden'));
            } else {
                card.classList.add('hidden');
                // Hide after the fade-out transition completes
                setTimeout(() => {
                    if (card.classList.contains('hidden')) card.style.display = 'none';
                }, 420);
            }
        });
    });
});

/* ══════════════════════════════════════════════════════════════
   CONTACT FORM — loading UX only (Formspree handles actual send)
══════════════════════════════════════════════════════════════ */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function () {
        const btn      = this.querySelector('.btn-submit');
        const original = btn.innerHTML;
        btn.innerHTML  = 'Sending… <i class="bx bx-loader-alt bx-spin"></i>';
        btn.disabled   = true;
        // Formspree will redirect after this — button reset isn't strictly needed
        // but handle edge cases (e.g. validation failure) gracefully
        setTimeout(() => {
            btn.innerHTML = original;
            btn.disabled  = false;
        }, 8000);
    });
}

/* ══════════════════════════════════════════════════════════════
   BACK TO TOP
══════════════════════════════════════════════════════════════ */
if (backTop) {
    backTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}