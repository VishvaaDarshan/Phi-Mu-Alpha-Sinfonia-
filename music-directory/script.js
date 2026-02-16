/* ============================================
   MEMBER DATA
   ============================================ */
const activeMembers = [
  {
    name: 'Marcus Johnson',
    role: 'President',
    instrument: 'Piano',
    category: 'Piano',
    year: 'Senior',
    bio: 'Jazz pianist with a focus on contemporary improvisation and composition.'
  },
  {
    name: 'Elena Rodriguez',
    role: 'Vice President',
    instrument: 'Violin',
    category: 'Strings',
    year: 'Junior',
    bio: 'Classically trained violinist and passionate chamber music collaborator.'
  },
  {
    name: 'David Kim',
    role: 'Treasurer',
    instrument: 'Trumpet',
    category: 'Brass',
    year: 'Senior',
    bio: 'Lead trumpet in the university jazz ensemble, pursuing music education.'
  },
  {
    name: 'Aisha Patel',
    role: 'Secretary',
    instrument: 'Flute',
    category: 'Woodwinds',
    year: 'Sophomore',
    bio: 'Orchestral flutist with a love for Romantic-era repertoire.'
  },
  {
    name: 'Jordan Williams',
    role: 'Music Director',
    instrument: 'Vocals',
    category: 'Vocals',
    year: 'Junior',
    bio: 'Tenor soloist specializing in opera and art song performance.'
  },
  {
    name: 'Sophia Chen',
    role: 'Social Chair',
    instrument: 'Cello',
    category: 'Strings',
    year: 'Sophomore',
    bio: 'Cellist performing in both orchestra and indie folk side projects.'
  },
  {
    name: 'Liam O\'Brien',
    role: 'Service Chair',
    instrument: 'Drums',
    category: 'Percussion',
    year: 'Junior',
    bio: 'Percussionist with professional experience in marching and concert bands.'
  },
  {
    name: 'Isabella Martinez',
    role: 'Historian',
    instrument: 'Soprano',
    category: 'Vocals',
    year: 'Freshman',
    bio: 'Aspiring opera singer with training in Italian and German diction.'
  },
  {
    name: 'Nathan Brooks',
    role: 'Member',
    instrument: 'Guitar',
    category: 'Strings',
    year: 'Junior',
    bio: 'Classical and fingerstyle guitarist, active in the university guitar ensemble.'
  },
  {
    name: 'Zara Ahmed',
    role: 'Member',
    instrument: 'Clarinet',
    category: 'Woodwinds',
    year: 'Senior',
    bio: 'Principal clarinet in the university wind ensemble, interested in contemporary works.'
  },
  {
    name: 'Christopher Lee',
    role: 'Member',
    instrument: 'Trombone',
    category: 'Brass',
    year: 'Sophomore',
    bio: 'Bass trombonist exploring jazz combo and big band performance.'
  },
  {
    name: 'Maya Thompson',
    role: 'Member',
    instrument: 'Piano',
    category: 'Piano',
    year: 'Freshman',
    bio: 'Collaborative pianist with a focus on art song and musical theatre accompaniment.'
  }
];

const alumniMembers = [
  {
    name: 'Dr. Angela Foster',
    role: 'Class of 2018',
    instrument: 'Piano',
    bio: 'Music Theory professor at Columbia University. Published researcher in harmonic analysis.'
  },
  {
    name: 'Ryan Mitchell',
    role: 'Class of 2020',
    instrument: 'Trumpet',
    bio: 'Touring musician with the Lincoln Center Jazz Orchestra.'
  },
  {
    name: 'Priya Sharma',
    role: 'Class of 2019',
    instrument: 'Violin',
    bio: 'Concertmaster of the Atlanta Symphony Orchestra.'
  },
  {
    name: 'James Carter',
    role: 'Class of 2017',
    instrument: 'Vocals',
    bio: 'Broadway performer with credits in Hamilton and Dear Evan Hansen.'
  },
  {
    name: 'Olivia Nguyen',
    role: 'Class of 2021',
    instrument: 'Flute',
    bio: 'Arts administrator and program director at the Kennedy Center.'
  },
  {
    name: 'Daniel Wright',
    role: 'Class of 2016',
    instrument: 'Percussion',
    bio: 'Grammy-nominated studio percussionist and session musician in Nashville.'
  },
  {
    name: 'Sarah Kim',
    role: 'Class of 2022',
    instrument: 'Cello',
    bio: 'Founder of a community music therapy nonprofit in Chicago.'
  },
  {
    name: 'Michael Adams',
    role: 'Class of 2015',
    instrument: 'Saxophone',
    bio: 'Music director for a national touring company and composer for film.'
  }
];

/* ============================================
   UTILITIES
   ============================================ */
function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('');
}

function createMemberCard(member, isAlumni = false) {
  const card = document.createElement('div');
  card.className = 'member-card reveal';
  if (member.category) card.dataset.category = member.category;

  card.innerHTML = `
    <div class="member-avatar">${getInitials(member.name)}</div>
    <h3>${member.name}</h3>
    <p class="member-role">${member.role}</p>
    <p class="member-detail">${member.instrument}${member.year ? ' · ' + member.year : ''}</p>
    <p class="member-bio">${member.bio}</p>
  `;
  return card;
}

/* ============================================
   RENDER MEMBERS
   ============================================ */
function renderMembers(list, containerId, isAlumni = false) {
  const grid = document.getElementById(containerId);
  grid.innerHTML = '';
  list.forEach(m => grid.appendChild(createMemberCard(m, isAlumni)));
  observeRevealElements();
}

/* ============================================
   FILTER & SEARCH
   ============================================ */
let currentFilter = 'all';

function applyFilter() {
  const query = document.getElementById('member-search').value.toLowerCase();
  const filtered = activeMembers.filter(m => {
    const matchesCategory = currentFilter === 'all' || m.category === currentFilter;
    const matchesSearch =
      m.name.toLowerCase().includes(query) ||
      m.instrument.toLowerCase().includes(query) ||
      m.role.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });
  renderMembers(filtered, 'members-grid');
}

document.addEventListener('DOMContentLoaded', () => {
  /* Initial render */
  renderMembers(activeMembers, 'members-grid');
  renderMembers(alumniMembers, 'alumni-grid', true);

  /* Chip filter */
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentFilter = chip.dataset.filter;
      applyFilter();
    });
  });

  /* Search */
  document.getElementById('member-search').addEventListener('input', applyFilter);

  /* Mobile nav toggle */
  document.getElementById('nav-toggle').addEventListener('click', () => {
    document.getElementById('nav-links').classList.toggle('open');
  });

  /* Close mobile nav on link click */
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('nav-links').classList.remove('open');
    });
  });

  /* Active nav highlight */
  const sections = document.querySelectorAll('.section, #hero');
  const navAnchors = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) {
        current = sec.getAttribute('id');
      }
    });
    navAnchors.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });
  });

  /* Contact form */
  document.getElementById('contact-form').addEventListener('submit', e => {
    e.preventDefault();
    const btn = e.target.querySelector('.btn');
    btn.textContent = 'Message Sent ✓';
    btn.style.background = 'var(--clr-gold)';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      e.target.reset();
    }, 2500);
  });

  /* Scroll reveal — initial pass for non-member elements */
  document.querySelectorAll('.about-card, .mission-item, .contact-form, .hero-content').forEach(el => {
    el.classList.add('reveal');
  });
  observeRevealElements();
});

/* ============================================
   INTERSECTION OBSERVER — REVEAL ON SCROLL
   ============================================ */
function observeRevealElements() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
}
