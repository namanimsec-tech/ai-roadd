// =====================================================
// AI ENGINEERING KNOWLEDGE GRAPH — APP LOGIC
// =====================================================

// ──── State ────
let currentPhaseFilter = 'all';
let currentTierFilter  = 'all';
let currentSearch      = '';
let openTopicId        = null;

// ──── Helpers ────
function getPhaseClass(phaseId) {
  return `ps-${phaseId}`;
}

function getPhaseColor(phaseId) {
  const map = {
    'foundation-a': '#4f8ef7',
    'foundation-b': '#22d3ee',
    'foundation-c': '#34d399',
    'foundation-d': '#a78bfa',
    'phase1': '#f59e0b',
    'phase2': '#ef4444',
    'phase3': '#8b5cf6',
    'phase4': '#10b981',
    'phase5': '#3b82f6',
    'phase6': '#06b6d4',
    'phase7': '#ec4899',
    'phase8': '#f97316',
    'phase9': '#eab308',
  };
  return map[phaseId] || '#4f8ef7';
}

function tierClass(tier) {
  return tier.toLowerCase().replace(' ', '-');
}

function freqSlug(freq) {
  return freq.replace(/\s+/g, '-').toLowerCase();
}

function dots(count, total = 5) {
  return Array.from({ length: total }, (_, i) => `<span class="dot ${i < count ? 'filled' : 'empty'}"></span>`).join('');
}

function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function highlightText(text, query) {
  if (!query) return escapeHtml(text);
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return escapeHtml(text).replace(new RegExp(`(${escaped})`, 'gi'), '<span class="highlight">$1</span>');
}

// ──── Build Phase Sections ────
function buildPhaseSections() {
  const container = document.getElementById('phase-sections');
  let html = '';

  PHASES.forEach(phase => {
    const color = getPhaseColor(phase.id);
    const topicCount = phase.subsections.reduce((a, s) => a + s.topics.length, 0);

    html += `
    <section class="phase-section ${getPhaseClass(phase.id)} fade-in-up" id="ps-${phase.id}" data-phase="${phase.id}">
      <div class="phase-header">
        <div class="phase-icon-wrap" style="color:${color}">
          <span style="font-size:1.5rem">${phase.icon}</span>
        </div>
        <div class="phase-titles">
          <div class="phase-tag">${phase.label}</div>
          <div class="phase-name">${phase.name}</div>
          <div class="phase-desc">${phase.desc}</div>
          <div class="phase-count">${topicCount} concepts</div>
        </div>
      </div>
    `;

    phase.subsections.forEach(sub => {
      if (sub.title) {
        html += `<div class="subsection"><div class="subsection-title"><span>${sub.title}</span></div>`;
      } else {
        html += `<div class="subsection">`;
      }
      html += `<div class="topics-grid">`;

      sub.topics.forEach(topic => {
        html += buildTopicCard(topic, phase);
      });

      html += `</div></div>`;
    });

    html += `</section>`;
  });

  container.innerHTML = html;
}

function buildTopicCard(topic, phase) {
  const color = getPhaseColor(phase.id);
  const freqCls = freqSlug(topic.freq);
  const freqLabel = FREQ_LABEL[topic.freq] || topic.freq;

  let importanceDots = '';
  if (topic.importance) {
    importanceDots = `
      <div class="importance-row">
        <div class="importance-item"><span class="imp-label">Industry</span><div class="dot-row">${dots(topic.importance.industry)}</div></div>
        <div class="importance-item"><span class="imp-label">Research</span><div class="dot-row">${dots(topic.importance.research)}</div></div>
        <div class="importance-item"><span class="imp-label">Interview</span><div class="dot-row">${dots(topic.importance.interview)}</div></div>
        <div class="importance-item"><span class="imp-label">Implement</span><div class="dot-row">${dots(topic.importance.implementation)}</div></div>
      </div>
    `;
  }

  const req = topic.requires ? topic.requires.slice(0, 2).join(', ') : '';
  const unl = topic.unlocks  ? topic.unlocks.slice(0, 2).join(', ') : '';

  return `
    <div class="topic-card"
         id="tc-${topic.id}"
         data-id="${topic.id}"
         data-phase="${phase.id}"
         data-tier="${topic.tier}"
         data-freq="${topic.freq}"
         style="--card-color:${color}"
         onclick="openModal('${topic.id}')"
         tabindex="0"
         role="button"
         aria-label="Open details for ${topic.title}"
         onkeydown="if(event.key==='Enter')openModal('${topic.id}')">
      <div class="card-top">
        <div class="card-title" id="ct-${topic.id}">${escapeHtml(topic.title)}</div>
        <div class="card-badges">
          <span class="tier-pill ${topic.tier.toLowerCase()}">${topic.tier}</span>
          <span class="freq-pill ${freqCls}">${freqLabel}</span>
        </div>
      </div>
      <div class="card-mental-model">"${escapeHtml(topic.mental)}"</div>
      <div class="card-meta">
        ${req ? `<div class="card-dep"><span class="card-dep-label">Requires:</span><span class="card-dep-value">${escapeHtml(req)}${topic.requires.length > 2 ? ' +' + (topic.requires.length - 2) + ' more' : ''}</span></div>` : ''}
        ${unl ? `<div class="card-dep"><span class="card-dep-label">Unlocks:</span><span class="card-dep-value">${escapeHtml(unl)}${topic.unlocks.length > 2 ? ' +' + (topic.unlocks.length - 2) + ' more' : ''}</span></div>` : ''}
      </div>
      ${importanceDots}
      <div class="card-expand-hint">Click to expand ↗</div>
    </div>
  `;
}

// ──── Modal ────
function openModal(topicId) {
  const { topic, phase } = findTopic(topicId);
  if (!topic) return;

  openTopicId = topicId;
  const color = getPhaseColor(phase.id);
  const freqLabel = FREQ_LABEL[topic.freq] || topic.freq;
  const freqCls = freqSlug(topic.freq);

  let modalHtml = `
    <div class="modal-phase-tag" style="background:${color}22; color:${color}; border:1px solid ${color}44">
      ${phase.label} — ${phase.name}
    </div>
    <div class="modal-title">${escapeHtml(topic.title)}</div>
    <div class="modal-badges">
      <span class="tier-pill ${topic.tier.toLowerCase()}">${topic.tier} — ${topic.tierLabel}</span>
      <span class="freq-pill ${freqCls}">${freqLabel}</span>
    </div>
    <div class="modal-fpq">
      <div class="modal-fpq-label">🎯 First-Principles Question</div>
      <div class="modal-fpq-text">${escapeHtml(topic.fpq)}</div>
    </div>
    <div class="modal-mental">
      <div class="modal-mental-label">🧠 Mental Model</div>
      <div class="modal-mental-text">"${escapeHtml(topic.mental)}"</div>
    </div>
  `;

  if (topic.whyNow) {
    modalHtml += `
      <div class="modal-section">
        <div class="modal-section-label">💡 Why Now?</div>
        <p>${escapeHtml(topic.whyNow)}</p>
      </div>
    `;
  }

  if (topic.whyExists) {
    modalHtml += `
      <div class="modal-section">
        <div class="modal-section-label">🔍 Why It Exists</div>
        <p>${escapeHtml(topic.whyExists)}</p>
      </div>
    `;
  }

  if (topic.requires && topic.requires.length) {
    const tags = topic.requires.map(r =>
      `<span class="modal-tag requires-tag">${escapeHtml(r)}</span>`
    ).join('');
    modalHtml += `
      <div class="modal-section">
        <div class="modal-section-label">← Requires</div>
        <div class="modal-tags">${tags}</div>
      </div>
    `;
  }

  if (topic.unlocks && topic.unlocks.length) {
    const tags = topic.unlocks.map(u =>
      `<span class="modal-tag unlocks-tag">${escapeHtml(u)}</span>`
    ).join('');
    modalHtml += `
      <div class="modal-section">
        <div class="modal-section-label">→ Unlocks</div>
        <div class="modal-tags">${tags}</div>
      </div>
    `;
  }

  if (topic.importance) {
    modalHtml += `
      <div class="modal-importance">
        <div class="modal-importance-label">⭐ Importance (5-dot scale)</div>
        <div class="modal-imp-grid">
          <div class="modal-imp-item">
            <span class="modal-imp-label">Industry</span>
            <div class="dot-row">${dots(topic.importance.industry)}</div>
          </div>
          <div class="modal-imp-item">
            <span class="modal-imp-label">Research</span>
            <div class="dot-row">${dots(topic.importance.research)}</div>
          </div>
          <div class="modal-imp-item">
            <span class="modal-imp-label">Interview</span>
            <div class="dot-row">${dots(topic.importance.interview)}</div>
          </div>
          <div class="modal-imp-item">
            <span class="modal-imp-label">Implementation</span>
            <div class="dot-row">${dots(topic.importance.implementation)}</div>
          </div>
        </div>
      </div>
    `;
  }

  if (topic.note) {
    modalHtml += `
      <div class="modal-note">
        <div class="modal-note-label">⚠ Note</div>
        <div class="modal-note-text">${escapeHtml(topic.note)}</div>
      </div>
    `;
  }

  document.getElementById('modal-inner').innerHTML = modalHtml;
  document.getElementById('modal-overlay').classList.add('open');
  document.getElementById('topic-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.getElementById('topic-modal').classList.remove('open');
  document.body.style.overflow = '';
  openTopicId = null;
}

function findTopic(id) {
  for (const phase of PHASES) {
    for (const sub of phase.subsections) {
      for (const topic of sub.topics) {
        if (topic.id === id) return { topic, phase, sub };
      }
    }
  }
  return { topic: null, phase: null, sub: null };
}

// ──── Phase Navigation ────
function filterPhase(phaseId) {
  currentPhaseFilter = phaseId;

  // Update nav buttons
  document.querySelectorAll('.phase-nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === phaseId);
  });

  applyFilters();

  // Scroll to phase section if specific
  if (phaseId !== 'all') {
    const el = document.getElementById(`ps-${phaseId}`);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }
}

function scrollToPhase(phaseId) {
  filterPhase(phaseId);
  const el = document.getElementById(`ps-${phaseId}`);
  if (el) {
    setTimeout(() => {
      const offset = 120; // sticky nav height
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }, 80);
  }
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ──── Tier Filter ────
function filterTier(tier, btn) {
  currentTierFilter = tier;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  applyFilters();
}

function clearTierFilter() {
  currentTierFilter = 'all';
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.tier === 'all');
  });
  applyFilters();
}

// ──── Search ────
function handleSearch(val) {
  currentSearch = val.trim().toLowerCase();
  document.getElementById('search-clear').style.display = val ? 'block' : 'none';
  applyFilters();
}

function clearSearch() {
  currentSearch = '';
  document.getElementById('search-input').value = '';
  document.getElementById('search-clear').style.display = 'none';
  applyFilters();
}

// ──── Apply All Filters ────
function applyFilters() {
  let totalVisible = 0;

  PHASES.forEach(phase => {
    const section = document.getElementById(`ps-${phase.id}`);
    if (!section) return;

    let phaseVisible = currentPhaseFilter === 'all' || currentPhaseFilter === phase.id;

    if (!phaseVisible) {
      section.classList.add('hidden');
      return;
    }

    let phaseCardCount = 0;

    phase.subsections.forEach(sub => {
      sub.topics.forEach(topic => {
        const card = document.getElementById(`tc-${topic.id}`);
        if (!card) return;

        const tierMatch = currentTierFilter === 'all' || topic.tier === currentTierFilter;
        const searchMatch = !currentSearch ||
          topic.title.toLowerCase().includes(currentSearch) ||
          topic.mental.toLowerCase().includes(currentSearch) ||
          topic.fpq.toLowerCase().includes(currentSearch) ||
          (topic.whyNow && topic.whyNow.toLowerCase().includes(currentSearch)) ||
          (topic.requires && topic.requires.some(r => r.toLowerCase().includes(currentSearch))) ||
          (topic.unlocks && topic.unlocks.some(u => u.toLowerCase().includes(currentSearch)));

        const visible = tierMatch && searchMatch;
        card.classList.toggle('hidden', !visible);

        if (visible) {
          phaseCardCount++;
          totalVisible++;

          // Update highlighted title if searching
          const titleEl = document.getElementById(`ct-${topic.id}`);
          if (titleEl) {
            titleEl.innerHTML = highlightText(topic.title, currentSearch);
          }
        }
      });
    });

    section.classList.toggle('hidden', phaseCardCount === 0);
  });

  // Show/hide results bar
  const hasFilter = currentSearch || currentTierFilter !== 'all' || currentPhaseFilter !== 'all';
  const resultsBar = document.getElementById('results-bar');
  resultsBar.style.display = hasFilter ? 'flex' : 'none';
  if (hasFilter) {
    document.getElementById('results-count').textContent = `${totalVisible} concept${totalVisible !== 1 ? 's' : ''} shown`;
  }

  // Show no-results
  showNoResults(totalVisible === 0 && hasFilter);
}

function showNoResults(show) {
  let el = document.getElementById('no-results-msg');
  if (show && !el) {
    el = document.createElement('div');
    el.id = 'no-results-msg';
    el.className = 'no-results';
    el.innerHTML = '<h3>No concepts match your filters</h3><p>Try a different search term or clear your filters.</p>';
    document.getElementById('phase-sections').prepend(el);
  } else if (!show && el) {
    el.remove();
  }
}

// ──── Hero Canvas Animation ────
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const nodes = [];
  const NODE_COUNT = 80;

  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      r: Math.random() * 2.5 + 1,
      color: ['#4f8ef7','#9b7af7','#22d3ee','#34d399','#f472b6'][Math.floor(Math.random()*5)],
      opacity: Math.random() * 0.6 + 0.2,
    });
  }

  function draw() {
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = (a.x - b.x) * W;
        const dy = (a.y - b.y) * H;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 160) {
          ctx.beginPath();
          ctx.moveTo(a.x * W, a.y * H);
          ctx.lineTo(b.x * W, b.y * H);
          ctx.strokeStyle = `rgba(79,142,247,${0.08 * (1 - dist/160)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach(n => {
      const x = n.x * W, y = n.y * H;
      ctx.beginPath();
      ctx.arc(x, y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = n.color;
      ctx.globalAlpha = n.opacity;
      ctx.fill();
      ctx.globalAlpha = 1;

      // Update position
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > 1) n.vx *= -1;
      if (n.y < 0 || n.y > 1) n.vy *= -1;
    });

    requestAnimationFrame(draw);
  }
  draw();
}

// ──── Intersection Observer for fade-in-up ────
function initIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
}

// ──── Back to top ────
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
}

// ──── Keyboard shortcuts ────
function initKeyboard() {
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && openTopicId) closeModal();
    if ((e.key === '/' || e.key === 'k') && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      document.getElementById('search-input').focus();
    }
  });
}

// ──── Scroll-driven sticky header highlight ────
function initPhaseScrollSpy() {
  const sections = document.querySelectorAll('.phase-section');
  const navBtns  = document.querySelectorAll('.phase-nav-btn');

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && currentPhaseFilter === 'all' && !currentSearch) {
        const phaseId = e.target.dataset.phase;
        navBtns.forEach(btn => {
          btn.classList.toggle('active',
            btn.dataset.filter === phaseId || (btn.dataset.filter === 'all' && !phaseId));
        });
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(s => spyObserver.observe(s));
}

// ──── Timeline animation ────
function initTimeline() {
  document.querySelectorAll('.tl-item').forEach((item, i) => {
    item.style.setProperty('--i', i);
  });
}

// ──── Init ────
document.addEventListener('DOMContentLoaded', () => {
  buildPhaseSections();
  initHeroCanvas();
  initIntersectionObserver();
  initBackToTop();
  initKeyboard();
  initPhaseScrollSpy();
  initTimeline();

  // Focus search on Ctrl+K
  document.getElementById('search-input').addEventListener('focus', () => {
    document.getElementById('search-bar-wrap').style.boxShadow = '0 0 0 2px rgba(79,142,247,0.2)';
  });
  document.getElementById('search-input').addEventListener('blur', () => {
    document.getElementById('search-bar-wrap').style.boxShadow = '';
  });

  // Close modal on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
});
