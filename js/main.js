/**
 * ========================================
 * MAIN.JS - الصفحة الرئيسية
 * ========================================
 */

$(document).ready(function() {
  console.log('🚀 Nivirra - Main Page Loaded');
  
  // تحميل الرحلات المميزة
  loadFeaturedTrips();
  
  // تحميل العروض
  loadOffers();
  
  // تحميل الفيدباك
  loadFeedback();
  
  // تفعيل Wizard
  initTailorWizard();
  
  // Smooth scrolling
  initSmoothScroll();
  
  // Navbar scroll effects
  initNavbar();
  
  // Back to top button
  initBackToTop();
});

// ========================================
// تحسينات الـ Navbar
// ========================================
function initNavbar() {
  const navbar = $('.navbar');
  const sections = $('section[id]');
  let ticking = false;
  
  // إضافة class عند السكرول
  $(window).on('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        if ($(window).scrollTop() > 50) {
          navbar.addClass('scrolled');
        } else {
          navbar.removeClass('scrolled');
        }
        
        // تحديث active link بناءً على الـ section
        updateActiveLink();
        
        ticking = false;
      });
      
      ticking = true;
    }
  });
  
  // تحديث الـ active link
  function updateActiveLink() {
    let current = '';
    const scrollPos = $(window).scrollTop() + 100;
    
    sections.each(function() {
      const sectionTop = $(this).offset().top;
      const sectionHeight = $(this).outerHeight();
      const sectionId = $(this).attr('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = sectionId;
      }
    });
    
    // إزالة active من كل الـ links
    $('.nav-link').removeClass('active');
    
    // إضافة active للـ link الحالي
    if (current) {
      $(`.nav-link[href*="${current}"]`).addClass('active');
    }
  }
  
  // إغلاق القائمة على الموبايل عند الضغط على link
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
  // إضافة الزرار للـ HTML
  $('body').append('<div class="back-to-top"><i class="fas fa-arrow-up"></i></div>');
  
  const backToTop = $('.back-to-top');
  
  // إظهار/إخفاء الزرار
  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 300) {
      backToTop.addClass('show');
    } else {
      backToTop.removeClass('show');
    }
  });
  
  // الرجوع للأعلى عند الضغط
  backToTop.on('click', function() {
    $('html, body').stop(true, false).animate({ scrollTop: 0 }, 400, 'swing');
  });
}

// ========================================
// 1. تحميل الرحلات المميزة (Dynamic)
// ========================================
function loadFeaturedTrips() {
  const trips = getFeaturedTrips(); // أول 3 رحلات
  const container = $('#trips .row');
  
  container.empty();
  
  trips.forEach(trip => {
    const html = `
      <div class="col-md-4">
        <div class="trip-card shadow-sm">
          <img src="${trip.img}" alt="${escapeHtml(trip.title)}" onerror="this.src='./images/placeholder.jpg'">
          <div class="p-3">
            <h5>${escapeHtml(trip.title)}</h5>
            <p class="small text-muted">${escapeHtml(trip.subtitle)}</p>
            <div class="d-flex justify-content-between align-items-center mt-3">
              <div class="price">$${trip.price}</div>
              <div>
                <a class="btn btn-sm text-white" 
                   style="background:var(--primary)" 
                   href="trip-details.html?id=${trip.id}">
                  Explore trip
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    container.append(html);
  });
  
  console.log('✓ Featured trips loaded:', trips.length);
}

// ========================================
// 2. تحميل العروض الخاصة
// ========================================
function loadOffers() {
  const offers = getOffers();
  const container = $('#offersList');
  
  container.empty();
  
  if (offers.length === 0) {
    container.html('<p class="text-center text-muted p-4">No offers available</p>');
    return;
  }
  
  offers.forEach(offer => {
    const newPrice = Math.round(offer.old - (offer.old * offer.discount / 100));
    const trip = getTripById(offer.tripId);
    
    // لو الرحلة مش موجودة، متعرضش العرض
    if (!trip) {
      console.warn('Trip not found for offer:', offer.id, 'tripId:', offer.tripId);
      return;
    }
    
    console.log('Offer:', offer.title, '→ Trip:', trip.title, '(ID:', trip.id + ')');
    
    const html = `
      <div class="offer shadow-sm">
        <div class="offer-media">
          <img src="${offer.img}" alt="${escapeHtml(offer.title)}" loading="lazy" onerror="this.src='./images/placeholder.jpg'">
          <span class="badge-discount">-${offer.discount}%</span>
        </div>
        <div class="offer-body p-3">
          <h5 class="mb-2">${escapeHtml(offer.title)}</h5>
          <p class="small text-muted mb-3">${escapeHtml(offer.nights)}</p>
          <div class="d-flex align-items-center gap-2 mb-3">
            <span class="price-old">$${offer.old}</span>
            <span class="price-new">$${newPrice}</span>
          </div>
          <a href="trip-details.html?id=${trip.id}" 
             class="btn btn-sm text-white w-100" 
             style="background:var(--primary)">
            <i class="fas fa-info-circle me-2"></i>
            View Details
          </a>
        </div>
      </div>
    `;
    
    container.append(html);
  });
  
  // تفعيل أزرار التمرير
  $('#offerLeft').on('click', () => {
    container.animate({ scrollLeft: container.scrollLeft() - 320 }, 400);
  });
  
  $('#offerRight').on('click', () => {
    container.animate({ scrollLeft: container.scrollLeft() + 320 }, 400);
  });
  
  console.log('✓ Offers loaded:', offers.length);
}

// ========================================
// 3. Tailor Tour Wizard
// ========================================
let wizardData = {
  travelStyle: '',
  cities: [],
  comments: '',
  fullName: '',
  phone: ''
};
let currentStep = 1;

function initTailorWizard() {
  // زرار Next
  $('#wizardNext').on('click', function() {
    if (validateWizardStep()) {
      if (currentStep === 3) {
        submitTailorTour();
      } else {
        currentStep++;
        renderWizardStep();
      }
    }
  });
  
  // زرار Back
  $('#wizardBack').on('click', function() {
    if (currentStep > 1) {
      currentStep--;
      renderWizardStep();
    }
  });
  
  // اختيار نمط السفر (Step 1)
  $(document).on('click', '[data-step="1"] .option-card', function() {
    $('[data-step="1"] .option-card').removeClass('selected');
    $(this).addClass('selected');
    wizardData.travelStyle = $(this).data('value');
  });
  
  // اختيار المدن (Step 2) - متعدد
  $(document).on('click', '[data-step="2"] .option-card', function() {
    $(this).toggleClass('selected');
    const city = $(this).data('value');
    
    if (wizardData.cities.includes(city)) {
      wizardData.cities = wizardData.cities.filter(c => c !== city);
    } else {
      wizardData.cities.push(city);
    }
  });
  
  // حقول Step 3
  $(document).on('input', '[data-step="3"] textarea', function() {
    wizardData.comments = $(this).val();
  });
  
  $(document).on('input', '[data-step="3"] input:eq(0)', function() {
    wizardData.fullName = $(this).val();
  });
  
  $(document).on('input', '[data-step="3"] input:eq(1)', function() {
    wizardData.phone = $(this).val();
  });
  
  renderWizardStep();
}

function renderWizardStep() {
  // إخفاء كل الـ steps
  $('.step').addClass('d-none');
  $(`[data-step="${currentStep}"]`).removeClass('d-none');
  
  // تحديث المؤشرات
  $('.wizard-step').each(function(index) {
    const stepNum = index + 1;
    if (stepNum <= currentStep) {
      $(this).css({
        background: 'var(--primary)',
        color: '#fff',
        borderColor: 'var(--primary)'
      });
    } else {
      $(this).css({
        background: '#fff',
        color: 'var(--primary)',
        borderColor: '#d6f0f1'
      });
    }
  });
  
  // تحديث الخطوط
  $('.wizard-line').each(function(index) {
    if (index + 1 < currentStep) {
      $(this).css('background', 'var(--primary)');
    } else {
      $(this).css('background', '#dff6f6');
    }
  });
  
  // تحديث الأزرار
  $('#wizardBack').css('visibility', currentStep === 1 ? 'hidden' : 'visible');
  $('#wizardNext').text(currentStep === 3 ? 'Submit' : 'Next');
}

function validateWizardStep() {
  if (currentStep === 1 && !wizardData.travelStyle) {
    alert('Please choose your travel style');
    return false;
  }
  
  if (currentStep === 2 && wizardData.cities.length === 0) {
    alert('Please choose at least one city');
    return false;
  }
  
  if (currentStep === 3) {
    if (!wizardData.comments.trim() || !wizardData.fullName.trim() || !wizardData.phone.trim()) {
      alert('Please fill in all fields');
      return false;
    }
  }
  
  return true;
}

function submitTailorTour() {
  // حفظ البيانات
  const savedRequest = saveTailorTourRequest(wizardData);
  
  // عرض رسالة نجاح
  const message = `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
      <h5 class="alert-heading">✓ Request Sent Successfully!</h5>
      <p><strong>Name:</strong> ${escapeHtml(wizardData.fullName)}</p>
      <p><strong>Travel Style:</strong> ${wizardData.travelStyle}</p>
      <p><strong>Cities:</strong> ${wizardData.cities.join(', ')}</p>
      <p class="mb-0">We'll contact you at: ${escapeHtml(wizardData.phone)}</p>
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;
  
  $('#wizard').parent().prepend(message);
  
  // Reset
  wizardData = {
    travelStyle: '',
    cities: [],
    comments: '',
    fullName: '',
    phone: ''
  };
  currentStep = 1;
  
  $('.option-card').removeClass('selected');
  $('[data-step="3"] input, [data-step="3"] textarea').val('');
  
  renderWizardStep();
  
  // إخفاء الرسالة بعد 5 ثواني
  setTimeout(() => {
    $('.alert-success').fadeOut();
  }, 5000);
  
  console.log('✓ Tailor tour request saved:', savedRequest);
}

// ========================================
// 4. تحميل وإضافة Feedback
// ========================================
function loadFeedback() {
  const feedback = getFeedback();
  const container = $('#feedback-slider');
  
  container.empty();
  
  if (feedback.length === 0) {
    container.html('<p class="text-muted text-center">No feedback yet. Be the first!</p>');
    return;
  }
  
  feedback.forEach(fb => {
    const stars = '★'.repeat(fb.rating) + '☆'.repeat(5 - fb.rating);
    const html = `
      <div class="feedback-card">
        <div class="name">${escapeHtml(fb.name)}</div>
        <div class="rating">${stars}</div>
        <div class="comment">${escapeHtml(fb.comment)}</div>
      </div>
    `;
    container.append(html);
  });
  
  console.log('✓ Feedback loaded:', feedback.length);
}

// زرار إضافة Feedback
$('.add-comment .btn').on('click', function(e) {
  e.preventDefault();
  
  const name = $('#name').val().trim();
  const comment = $('#comment').val().trim();
  const rating = $('#rating').val();
  
  if (!name || !comment) {
    alert('Please fill in all fields');
    return;
  }
  
  // حفظ الفيدباك
  saveFeedback(name, comment, rating);
  
  // إعادة تحميل
  loadFeedback();
  
  // مسح الحقول
  $('#name, #comment').val('');
  $('#rating').val('5');
  
  // رسالة نجاح
  const successMsg = `
    <div class="alert alert-success alert-dismissible fade show mt-3">
      <strong>Thank you!</strong> Your feedback has been submitted.
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;
  $('.add-comment').prepend(successMsg);
  setTimeout(() => $('.alert-success').fadeOut(), 3000);
  
  console.log('✓ Feedback added');
});

// ========================================
// 5. Smooth Scrolling
// ========================================
function initSmoothScroll() {
  $('a[href^="#"]').on('click', function(e) {
    const target = $(this).attr('href');
    if (target !== '#' && $(target).length) {
      e.preventDefault();
      
      // إيقاف أي scroll animations شغالة
      $('html, body').stop(true, false);
      
      // حساب المكان المستهدف
      const targetOffset = $(target).offset().top - 80;
      
      // scroll أسرع وأكثر سلاسة
      $('html, body').animate({
        scrollTop: targetOffset
      }, 100, 'swing');
    }
  });
}