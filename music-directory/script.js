/* ============================================
   SHARED JS — NAV, SCROLL REVEAL, UTILITIES
   ============================================ */

/* ---------- Mobile Nav ---------- */
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');

    if (toggle && links) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('open');
            links.classList.toggle('open');
        });
        links.querySelectorAll('a').forEach(a =>
            a.addEventListener('click', () => {
                toggle.classList.remove('open');
                links.classList.remove('open');
            })
        );
    }

    /* ---------- Active nav link ---------- */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
        const href = a.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            a.classList.add('active');
        }
    });

    /* ---------- Scroll Reveal ---------- */
    initReveal();

    /* ---------- Page Transitions ---------- */
    initPageTransitions();

    /* ---------- Instrument Parallax on Mouse ---------- */
    initInstrumentParallax();

    /* ---------- Music Note Particles ---------- */
    initNoteParticles();

    /* ---------- Animated Stat Counters ---------- */
    initStatCounters();

    /* ---------- Hero Scroll Fade ---------- */
    initHeroScrollFade();
});

function initReveal() {
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ---------- Brothers Auth (client-side) ---------- */
const BROTHER_PASS = 'sinfonia'; // Change this to your chapter passphrase

function brotherLogin(password) {
    if (password === BROTHER_PASS) {
        localStorage.setItem('pma_auth', 'true');
        return true;
    }
    return false;
}

function isBrotherLoggedIn() {
    return localStorage.getItem('pma_auth') === 'true';
}

function brotherLogout() {
    localStorage.removeItem('pma_auth');
}

/* ---------- Member Utilities ---------- */
function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('');
}

function createMemberCard(member, index, type) {
    const idx = member._origIdx !== undefined ? member._origIdx : index;
    const card = document.createElement('a');
    card.className = 'member-card reveal';
    card.href = `member.html?id=${idx}&type=${type || 'active'}`;
    if (member.category) card.dataset.category = member.category;

    card.innerHTML = `
    <div class="member-avatar">${getInitials(member.name)}</div>
    <h3>${member.name}</h3>
    <p class="member-role">${member.role}</p>
    <p class="member-detail">${member.instrument}${member.year ? ' · ' + member.year : ''}</p>
  `;
    return card;
}

function renderMembers(list, containerId, type) {
    const grid = document.getElementById(containerId);
    if (!grid) return;
    grid.innerHTML = '';
    grid.classList.add('stagger');
    list.forEach((m, i) => grid.appendChild(createMemberCard(m, i, type)));
    initReveal();
}

/* ============================================
   MEMBER DATA
   ============================================ */
const activeMembers = [
    { name: 'Marcus Johnson', role: 'President', instrument: 'Piano', category: 'Piano', year: 'Senior', bio: 'Jazz pianist with a focus on contemporary improvisation and composition.' },
    { name: 'Elena Rodriguez', role: 'Vice President', instrument: 'Violin', category: 'Strings', year: 'Junior', bio: 'Classically trained violinist and passionate chamber music collaborator.' },
    { name: 'David Kim', role: 'Treasurer', instrument: 'Trumpet', category: 'Brass', year: 'Senior', bio: 'Lead trumpet in the university jazz ensemble, pursuing music education.' },
    { name: 'Aisha Patel', role: 'Secretary', instrument: 'Flute', category: 'Woodwinds', year: 'Sophomore', bio: 'Orchestral flutist with a love for Romantic-era repertoire.' },
    { name: 'Jordan Williams', role: 'Music Director', instrument: 'Vocals', category: 'Vocals', year: 'Junior', bio: 'Tenor soloist specializing in opera and art song performance.' },
    { name: 'Sophia Chen', role: 'Social Chair', instrument: 'Cello', category: 'Strings', year: 'Sophomore', bio: 'Cellist performing in both orchestra and indie folk side projects.' },
    { name: "Liam O'Brien", role: 'Service Chair', instrument: 'Drums', category: 'Percussion', year: 'Junior', bio: 'Percussionist with professional experience in marching and concert bands.' },
    { name: 'Isabella Martinez', role: 'Historian', instrument: 'Soprano', category: 'Vocals', year: 'Freshman', bio: 'Aspiring opera singer with training in Italian and German diction.' },
    { name: 'Nathan Brooks', role: 'Member', instrument: 'Guitar', category: 'Strings', year: 'Junior', bio: 'Classical and fingerstyle guitarist, active in the university guitar ensemble.' },
    { name: 'Zara Ahmed', role: 'Member', instrument: 'Clarinet', category: 'Woodwinds', year: 'Senior', bio: 'Principal clarinet in the university wind ensemble, interested in contemporary works.' },
    { name: 'Christopher Lee', role: 'Member', instrument: 'Trombone', category: 'Brass', year: 'Sophomore', bio: 'Bass trombonist exploring jazz combo and big band performance.' },
    { name: 'Maya Thompson', role: 'Member', instrument: 'Piano', category: 'Piano', year: 'Freshman', bio: 'Collaborative pianist with a focus on art song and musical theatre accompaniment.' }
];

const alumniMembers = [
    { name: 'Dr. Angela Foster', role: 'Class of 2018', instrument: 'Piano', bio: 'Music Theory professor at Columbia University. Published researcher in harmonic analysis.' },
    { name: 'Ryan Mitchell', role: 'Class of 2020', instrument: 'Trumpet', bio: 'Touring musician with the Lincoln Center Jazz Orchestra.' },
    { name: 'Priya Sharma', role: 'Class of 2019', instrument: 'Violin', bio: 'Concertmaster of the Atlanta Symphony Orchestra.' },
    { name: 'James Carter', role: 'Class of 2017', instrument: 'Vocals', bio: 'Broadway performer with credits in Hamilton and Dear Evan Hansen.' },
    { name: 'Olivia Nguyen', role: 'Class of 2021', instrument: 'Flute', bio: 'Arts administrator and program director at the Kennedy Center.' },
    { name: 'Daniel Wright', role: 'Class of 2016', instrument: 'Percussion', bio: 'Grammy-nominated studio percussionist and session musician in Nashville.' },
    { name: 'Sarah Kim', role: 'Class of 2022', instrument: 'Cello', bio: 'Founder of a community music therapy nonprofit in Chicago.' },
    { name: 'Michael Adams', role: 'Class of 2015', instrument: 'Saxophone', bio: 'Music director for a national touring company and composer for film.' }
];

/* ============================================
   SMOOTH PAGE TRANSITIONS
   ============================================ */
function initPageTransitions() {
    const overlay = document.querySelector('.page-transition');
    if (!overlay) return;

    // Intercept internal navigation links
    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        // Only intercept local .html links (not anchors, external, or javascript)
        if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('javascript')) return;
        if (!href.endsWith('.html')) return;

        link.addEventListener('click', e => {
            e.preventDefault();
            overlay.classList.add('active');
            setTimeout(() => {
                window.location.href = href;
            }, 400);
        });
    });

    // Fade out overlay on page load (in case we arrived via transition)
    window.addEventListener('pageshow', () => {
        overlay.classList.remove('active');
    });
}

/* ============================================
   INSTRUMENT PARALLAX ON MOUSE MOVE
   ============================================ */
function initInstrumentParallax() {
    const hero = document.querySelector('.home-hero');
    const instruments = document.querySelectorAll('.instrument-float');
    if (!hero || instruments.length === 0) return;

    // Different speed multipliers for depth
    const speeds = [0.02, 0.015, 0.025, 0.01, 0.018, 0.022, 0.012];

    hero.addEventListener('mousemove', e => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5 to 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        instruments.forEach((inst, i) => {
            const speed = speeds[i % speeds.length];
            const moveX = x * speed * 100;
            const moveY = y * speed * 100;
            inst.style.setProperty('--parallax-x', `${moveX}px`);
            inst.style.setProperty('--parallax-y', `${moveY}px`);
        });
    });

    hero.addEventListener('mouseleave', () => {
        instruments.forEach(inst => {
            inst.style.setProperty('--parallax-x', '0px');
            inst.style.setProperty('--parallax-y', '0px');
        });
    });
}

/* ============================================
   MUSIC NOTE PARTICLES (Canvas)
   ============================================ */
function initNoteParticles() {
    const canvas = document.getElementById('note-particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const notes = ['♩', '♪', '♫', '♬', '♭', '♯', '𝄞'];
    let particles = [];
    let animId;

    function resize() {
        const hero = canvas.parentElement;
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: canvas.height + 20,
            size: 10 + Math.random() * 16,
            speed: 0.3 + Math.random() * 0.7,
            drift: (Math.random() - 0.5) * 0.4,
            opacity: 0.08 + Math.random() * 0.15,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.01,
            char: notes[Math.floor(Math.random() * notes.length)]
        };
    }

    // Seed initial particles
    resize();
    for (let i = 0; i < 15; i++) {
        const p = createParticle();
        p.y = Math.random() * canvas.height;
        particles.push(p);
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Spawn new particles
        if (particles.length < 20 && Math.random() < 0.02) {
            particles.push(createParticle());
        }

        particles.forEach((p, i) => {
            p.y -= p.speed;
            p.x += p.drift;
            p.rotation += p.rotSpeed;

            // Fade out near top
            let alpha = p.opacity;
            if (p.y < canvas.height * 0.2) {
                alpha *= p.y / (canvas.height * 0.2);
            }

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.font = `${p.size}px serif`;
            ctx.fillStyle = `rgba(201, 163, 78, ${alpha})`;
            ctx.textAlign = 'center';
            ctx.fillText(p.char, 0, 0);
            ctx.restore();

            // Remove when off-screen
            if (p.y < -30) {
                particles.splice(i, 1);
            }
        });

        animId = requestAnimationFrame(animate);
    }

    animate();
    window.addEventListener('resize', resize);

    // Pause when not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animId);
        } else {
            animId = requestAnimationFrame(animate);
        }
    });
}

/* ============================================
   ANIMATED STAT COUNTERS
   ============================================ */
function initStatCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length === 0) return;

    const counted = new Set();

    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    function animateCounter(el) {
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 2000;
        const start = performance.now();

        function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.round(easeOutQuart(progress) * target);
            el.textContent = value + suffix;

            if (progress < 1) {
                requestAnimationFrame(tick);
            }
        }

        requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted.has(entry.target)) {
                counted.add(entry.target);
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
}

/* ============================================
   HERO SCROLL FADE (parallax dissolve)
   ============================================ */
function initHeroScrollFade() {
    const hero = document.querySelector('.home-hero');
    const heroContent = document.querySelector('.home-hero-content');
    if (!hero || !heroContent) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                const heroHeight = hero.offsetHeight;
                const progress = Math.min(scrollY / heroHeight, 1);

                // Fade out and translate up
                heroContent.style.opacity = 1 - progress * 1.2;
                heroContent.style.transform = `translateY(${-progress * 40}px)`;

                ticking = false;
            });
            ticking = true;
        }
    });
}
