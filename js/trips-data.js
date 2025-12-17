// trips-data.js
// Sample trips data + render logic.
// Replace the `trips` array with a backend fetch when your API is ready.

const trips = [
  {id:1, title:'Luxury Nile Cruise', subtitle:'3 days • Cairo', city:'Cairo', days:3, price:300, img:'https://images.unsplash.com/photo-1508264165352-258a6f19f3d6?auto=format&fit=crop&w=1200&q=60', type:'cruise', large:true},
  {id:2, title:'Diving Adventure', subtitle:'Red Sea Diving', city:'Hurghada', days:5, price:190, img:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=60', type:'diving'},
  {id:3, title:'Luxor Historical Tour', subtitle:'Temples & Tombs', city:'Luxor', days:4, price:250, img:'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1200&q=60', type:'history', large:true},
  {id:4, title:'Desert Safari', subtitle:'Marsa Matrouh', city:'Marsa Matrouh', days:2, price:245, img:'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=60', type:'safari'},
  {id:5, title:'Alexandria Culture Trip', subtitle:'City Highlights', city:'Alexandria', days:1, price:270, img:'https://images.unsplash.com/photo-1505691723518-36a4e6a8b9a8?auto=format&fit=crop&w=1200&q=60', type:'culture'},
  {id:6, title:'Mount Sinai Hike', subtitle:'Sunrise Summit', city:'South Sinai', days:3, price:180, img:'https://images.unsplash.com/photo-1518684079-2d3b3d3f6b2c?auto=format&fit=crop&w=1200&q=60', type:'hiking'},
  {id:7, title:'Marsa Alam Beaches', subtitle:'Relax & Snorkel', city:'Marsa Alam', days:4, price:200, img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=60', type:'beach'},
  {id:8, title:'Photography Trip', subtitle:'New Valley Landscapes', city:'New Valley', days:3, price:220, img:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=60', type:'photography'},
  {id:9, title:'bbbbbbbbbbbbb Trip', subtitle:'New Valley Landscapes', city:'New Valley', days:3, price:225, img:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=60', type:'photography'}
];

(function () {
  const grid = document.getElementById('grid');
  const q = document.getElementById('q');
  const empty = document.getElementById('empty');

  function createTileHTML(t) {
    const sizeClass = t.large ? 'h-lg' : '';
    const subtitle = t.subtitle ? t.subtitle : `${t.city} • ${t.days} days`;

    // Build tile column
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6 col-lg-4';
    col.innerHTML = `
      <a href="" class="tile ${sizeClass}" aria-label="${escapeHtml(t.title)}">
        <div class="media" style="background-image: url('${escapeAttr(t.img)}')"></div>
        <div class="overlay text-start">
          <h3>${escapeHtml(t.title)}</h3>
          <p>${escapeHtml(subtitle)}</p>
          <div class="meta">
            <div class="text-white-50">${escapeHtml(t.price + ' $')}</div>
          </div>
        </div>
      </a>
    `;
    return col;
  }

  function render(list) {
    grid.innerHTML = '';
    if (!list || !list.length) {
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';
    const fragment = document.createDocumentFragment();
    list.forEach(t => fragment.appendChild(createTileHTML(t)));
    grid.appendChild(fragment);
  }

  // basic escaping helpers
  function escapeHtml(str) {
    if (str === undefined || str === null) return '';
    return String(str).replace(/[&<>"']/g, function (m) {
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]);
    });
  }
  function escapeAttr(s) { return escapeHtml(s).replace(/"/g, '&quot;'); }

  // search filter
  q.addEventListener('input', () => {
    const v = q.value.trim().toLowerCase();
    const filtered = trips.filter(t => {
      const hay = (t.title + ' ' + (t.city||'') + ' ' + (t.type||'')).toLowerCase();
      return hay.includes(v);
    });
    render(filtered);
  });

  // initial render
  render(trips);

  // example: replace with backend fetch when ready
  // fetch('/api/trips')
  //   .then(r => r.json())
  //   .then(data => { trips.splice(0, trips.length, ...data); render(trips); })
  //   .catch(err => console.error('Failed to fetch trips', err));
})();
