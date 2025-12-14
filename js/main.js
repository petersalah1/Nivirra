// أول حاجة نجيب كل اللينكات في الـ navbar
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', function() {
    navLinks.forEach(l => l.classList.remove('active'));
    
    this.classList.add('active');
  });
});


// Wizard Manager Class
class WizardManager {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 3;
    this.data = {
      travelStyle: '',
      cities: [],
      comments: '',
      fullName: '',
      phone: ''
    };
    this.init();
  }

  init() {
    this.cacheDOM();
    this.bindEvents();
    this.render();
  }

  cacheDOM() {
    this.nextBtn = document.getElementById('wizardNext');
    this.backBtn = document.getElementById('wizardBack');
    this.steps = document.querySelectorAll('.step');
    this.indicators = document.querySelectorAll('.wizard-step');
    this.lines = document.querySelectorAll('.wizard-line');
  }

  bindEvents() {
    this.nextBtn.onclick = () => this.handleNext();
    this.backBtn.onclick = () => this.handleBack();
    
    // Event delegation
    document.getElementById('wizard').onclick = (e) => {
      const card = e.target.closest('.option-card');
      if (!card) return;
      
      const step = card.closest('.step').dataset.step;
      const value = card.dataset.value;
      
      if (step === '1') {
        this.selectSingle(card, value, 'travelStyle');
      } else if (step === '2') {
        this.selectMultiple(card, value, 'cities');
      }
    };

    // Form inputs
    const step3 = document.querySelector('[data-step="3"]');
    step3.querySelector('textarea').oninput = (e) => this.data.comments = e.target.value;
    step3.querySelectorAll('input')[0].oninput = (e) => this.data.fullName = e.target.value;
    step3.querySelectorAll('input')[1].oninput = (e) => this.data.phone = e.target.value;
  }

  selectSingle(card, value, key) {
    card.parentElement.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    this.data[key] = value;
  }

  selectMultiple(card, value, key) {
    card.classList.toggle('selected');
    const index = this.data[key].indexOf(value);
    index > -1 ? this.data[key].splice(index, 1) : this.data[key].push(value);
  }

  handleNext() {
    if (!this.validate()) return;
    
    if (this.currentStep === this.totalSteps) {
      this.submit();
    } else {
      this.currentStep++;
      this.render();
    }
  }

  handleBack() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.render();
    }
  }

  validate() {
    const validations = {
      1: () => this.data.travelStyle || alert('Choose the type of travel'),
      2: () => this.data.cities.length || alert('Choose at least one city'),
      3: () => this.data.comments.trim() && this.data.fullName.trim() && this.data.phone.trim() || 
               alert('Fill in all fields')
    };
    return validations[this.currentStep]();
  }

  render() {
    // Steps visibility
    this.steps.forEach((step, i) => {
      step.classList.toggle('d-none', i + 1 !== this.currentStep);
    });

    // Indicators & lines
    this.indicators.forEach((ind, i) => {
      const isActive = i + 1 <= this.currentStep;
      Object.assign(ind.style, {
        background: isActive ? 'var(--primary)' : '#fff',
        color: isActive ? '#fff' : 'var(--primary)',
        borderColor: isActive ? 'var(--primary)' : '#d6f0f1'
      });
    });

    this.lines.forEach((line, i) => {
      line.style.background = i + 1 < this.currentStep ? 'var(--primary)' : '#dff6f6';
    });

    // Buttons
    this.backBtn.style.visibility = this.currentStep === 1 ? 'hidden' : 'visible';
    this.nextBtn.textContent = this.currentStep === this.totalSteps ? 'Submit' : 'Next';
    this.nextBtn.classList.toggle('btn-success', this.currentStep === this.totalSteps);
  }

  submit() {
    console.log('Form Data:', this.data);
    alert(`Sent successfully!\n\nTravel type: ${this.data.travelStyle}\nCities: ${this.data.cities.join(', ')}\nName: ${this.data.fullName}\nWhatsApp: ${this.data.phone}`);
    // هنا تقدر تبعت للـ API
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => new WizardManager());




















const offersData = [
  {
    title: "Summer at Hurghada",
    nights: "7 nights - All inclusive",
    img: "./images/peramids.jpg",
    old: 300,
    discount: 20
  },
  {
    title: "Luxor Short Break",
    nights: "4 nights - Temples & Cruise",
    img: "./images/2h-media-syKhsnVTSRw-unsplash.jpg",
    old: 160,
    discount: 10
  },
  {
    title: "Family Deals",
    nights: "Discounts for groups 4+",
    img: "./images/background-hero.avif",
    old: 220,
    discount: 25
  },
  {
    title: "Family Deals",
    nights: "Discounts for groups 4+",
    img: "./images/moment.jpeg",
    old: 250,
    discount: 25
  },
  {
    title: "Family Deals",
    nights: "Discounts for groups 4+",
    img: "./images/sean-oulashin.jpg",
    old: 220,
    discount: 25
  },
  {
    title: "Family Deals",
    nights: "Discounts for groups 4+",
    img: "./images/see.jpg",
    old: 260,
    discount: 25
  },
  {
    title: "Family Deals",
    nights: "Discounts for groups 4+",
    img: "./images/spencer-davis-I4VkLBwsa9s-unsplash.jpg",
    old: 190,
    discount: 25
  } 
];

// Render
const list = document.getElementById("offersList");

offersData.forEach(o => {
  const newPrice = o.old - (o.old * o.discount / 100);

  list.innerHTML += `
    <div class="offer shadow-sm">
      <div class="offer-media">
        <img src="${o.img}">
        <span class="badge-discount">-${o.discount}%</span>
      </div>
      <div class="offer-body p-3">
        <h5>${o.title}</h5>
        <p class="small text-muted">${o.nights}</p>
        <div class="price-row mb-2">
          <span class="price-old">$${o.old.toLocaleString()}</span>
          <span class="price-new" style="color:var(--primary);font-weight:700">
            $${newPrice.toLocaleString()}
          </span>
        </div>
        <a class="btn btn-sm text-white" style="background:var(--primary)">Explore Trip</a>
      </div>
    </div>
  `;
});

// Arrows
document.getElementById("offerLeft").onclick = () => {
  list.scrollBy({ left: -320, behavior: "smooth" });
};

document.getElementById("offerRight").onclick = () => {
  list.scrollBy({ left: 320, behavior: "smooth" });
};





var map = L.map('mapbox').setView([26.8206, 30.8025], 5.5); // Center on Egypt

  // Tile Style (Modern Light Look)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
  }).addTo(map);

  // Optional Marker (Cairo)
  L.marker([30.0444, 31.2357])
    .addTo(map)
    .bindPopup("<b>Cairo</b><br>Capital of Egypt.");













// Load feedback from LocalStorage on page load
window.addEventListener("load", () => {
  // لو LocalStorage فاضي، نضيف تعليقات افتراضية
  if (!localStorage.getItem("feedback")) {
    const defaultFeedback = [
      { name: "Alice", comment: "Amazing trip!", rating: 5 },
      { name: "Bob", comment: "Had a great experience.", rating: 4 },
      { name: "Charlie", comment: "Loved the service!", rating: 5 }
    ];
    localStorage.setItem("feedback", JSON.stringify(defaultFeedback));
  }

  loadFeedback(); // بعد كده نعرض كل التعليقات
});

function addFeedback() {
  const name = document.getElementById("name").value.trim();
  const comment = document.getElementById("comment").value.trim();
  const rating = document.getElementById("rating").value;

  if (!name || !comment) {
    alert("Please fill in all fields.");
    return;
  }

  const newFeedback = { name, comment, rating };

  // Get existing feedback from LocalStorage
  const feedbackArr = JSON.parse(localStorage.getItem("feedback")) || [];

  // Add new feedback at the beginning
  feedbackArr.unshift(newFeedback);

  // Save back to LocalStorage
  localStorage.setItem("feedback", JSON.stringify(feedbackArr));

  // Clear form
  document.getElementById("name").value = "";
  document.getElementById("comment").value = "";
  document.getElementById("rating").value = "5";

  // Reload slider
  loadFeedback();
}

function loadFeedback() {
  const slider = document.getElementById("feedback-slider");
  slider.innerHTML = "";

  // Load feedback from LocalStorage
  const feedbackArr = JSON.parse(localStorage.getItem("feedback")) || [];

  feedbackArr.forEach(fb => {
    const card = document.createElement("div");
    card.className = "feedback-card";

    const stars = "★".repeat(fb.rating) + "☆".repeat(5 - fb.rating);

    card.innerHTML = `
      <div class="name">${fb.name}</div>
      <div class="rating">${stars}</div>
      <div class="comment">${fb.comment}</div>
    `;

    slider.appendChild(card);
  });
}
