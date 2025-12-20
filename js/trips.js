/**
 * ========================================
 * TRIPS PAGE - صفحة الرحلات
 * ========================================
 */

let allTrips = [];
let filteredTrips = [];

$(document).ready(function() {
  console.log('🚀 Trips Page Loaded');
  
  loadTrips();
  initSearch();
  initScrollAnimation();
  initNavbar();
  initBackToTop();
});

// ========================================
// تحسينات الـ Navbar
// ========================================
function initNavbar() {
  const navbar = $('.navbar');
  
  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 50) {
      navbar.addClass('scrolled');
    } else {
      navbar.removeClass('scrolled');
    }
  });
  
  // إغلاق القائمة على الموبايل
  $('.nav-link').on('click', function() {
    if (window.innerWidth < 992) {
      $('.navbar-collapse').collapse('hide');
    }
  });
}

// ========================================
// زرار Back to Top
// ========================================
function initBackToTop() {
  $('body').append('<div class="back-to-top"><i class="fas fa-arrow-up"></i></div>');
  
  const backToTop = $('.back-to-top');
  
  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 300) {
      backToTop.addClass('show');
    } else {
      backToTop.removeClass('show');
    }
  });
  
  backToTop.on('click', function() {
    $('html, body').animate({ scrollTop: 0 }, 600);
  });
}

// ========================================
// تحميل الرحلات
// ========================================
function loadTrips() {
  allTrips = getTrips();
  filteredTrips = [...allTrips];
  
  renderTrips();
  
  console.log('✓ Trips loaded:', allTrips.length);
}

// ========================================
// عرض الرحلات
// ========================================
function renderTrips() {
  const container = $('#grid');
  const emptyState = $('#empty');
  
  container.empty();
  
  if (filteredTrips.length === 0) {
    emptyState.show();
    return;
  }
  
  emptyState.hide();
  
  filteredTrips.forEach(trip => {
    const sizeClass = trip.large ? 'h-lg' : '';
    
    const html = `
      <div class="col-12 col-md-6 col-lg-4">
        <a href="trip-details.html?id=${trip.id}" 
           class="tile ${sizeClass} reveal" 
           aria-label="${escapeHtml(trip.title)}">
          <div class="media" style="background-image: url('${trip.img}')"></div>
          <div class="overlay text-start">
            <h3>${escapeHtml(trip.title)}</h3>
            <p>${escapeHtml(trip.subtitle)}</p>
            <div class="meta">
              <div class="text-white-50">$${trip.price}</div>
            </div>
          </div>
        </a>
      </div>
    `;
    
    container.append(html);
  });
  
  console.log('✓ Trips rendered:', filteredTrips.length);
}

// ========================================
// البحث
// ========================================
function initSearch() {
  $('#q').on('input', function() {
    const query = $(this).val().trim().toLowerCase();
    
    if (!query) {
      filteredTrips = [...allTrips];
    } else {
      filteredTrips = allTrips.filter(trip => {
        const searchText = `${trip.title} ${trip.city} ${trip.type}`.toLowerCase();
        return searchText.includes(query);
      });
    }
    
    renderTrips();
  });
  
  // مسح البحث بـ ESC
  $('#q').on('keydown', function(e) {
    if (e.key === 'Escape') {
      $(this).val('');
      filteredTrips = [...allTrips];
      renderTrips();
    }
  });
}

// ========================================
// Animation عند الـ scroll
// ========================================
function initScrollAnimation() {
  if (!('IntersectionObserver' in window)) {
    $('.reveal').addClass('show');
    return;
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '50px'
  });
  
  // مراقبة العناصر الجديدة
  const observeElements = () => {
    document.querySelectorAll('.reveal:not(.show)').forEach(el => {
      observer.observe(el);
    });
  };
  
  // مراقبة عند التحميل وبعد كل render
  observeElements();
  
  // إعادة المراقبة بعد كل تغيير
  const originalRender = renderTrips;
  renderTrips = function() {
    originalRender();
    setTimeout(observeElements, 100);
  };
}