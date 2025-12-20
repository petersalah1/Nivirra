/**
 * ========================================
 * TRIP DETAILS PAGE
 * ========================================
 */

let currentTrip = null;

$(document).ready(function() {
  console.log('🚀 Trip Details Page Loaded');
  
  loadTripDetails();
  initNavbar();
  initBackToTop();
});

// ========================================
// تحسينات الـ Navbar (نفس الكود من main.js)
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
// تحميل تفاصيل الرحلة
// ========================================
function loadTripDetails() {
  // الحصول على ID من الـ URL
  const urlParams = new URLSearchParams(window.location.search);
  const tripId = parseInt(urlParams.get('id'));
  
  if (!tripId) {
    showNotFound();
    return;
  }
  
  // جلب الرحلة
  currentTrip = getTripById(tripId);
  
  if (!currentTrip) {
    showNotFound();
    return;
  }
  
  // عرض الرحلة
  renderTrip();
  initBookingButton();
  
  console.log('✓ Trip loaded:', currentTrip.title);
}

// ========================================
// عرض تفاصيل الرحلة
// ========================================
function renderTrip() {
  // إخفاء Loading وإظهار المحتوى
  setTimeout(() => {
    $('#loading').fadeOut(400, function() {
      $('#tripContent').fadeIn(400);
    });
  }, 500);
  
  // Hero Image
  $('#heroSection').css('background-image', `url('${currentTrip.img}')`);
  
  // Basic Info
  $('#tripTitle').text(currentTrip.title);
  $('#tripSubtitle').text(currentTrip.subtitle);
  $('#tripDays').text(`${currentTrip.days} Days`);
  $('#tripCity').text(currentTrip.city);
  $('#tripType').text(capitalizeFirst(currentTrip.type));
  $('#tripPrice').text(currentTrip.price);
  
  // Description
  if (currentTrip.description) {
    $('#tripDescription').text(currentTrip.description);
  }
  
  // Highlights
  if (currentTrip.highlights && currentTrip.highlights.length > 0) {
    const highlightsList = $('#tripHighlights');
    highlightsList.empty();
    
    currentTrip.highlights.forEach(highlight => {
      highlightsList.append(`<li>${escapeHtml(highlight)}</li>`);
    });
  }
}

// ========================================
// زرار الحجز - يفتح في نافذة جديدة
// ========================================
function initBookingButton() {
  $('.btn-book').on('click', function(e) {
    e.preventDefault();

    const paymentUrl = `payment.html?trip_id=${currentTrip.id}`;

    // فتح في Tab جديدة
    window.open(paymentUrl, '_blank');
  });

  // WhatsApp Support
  $('.fa-whatsapp').parent().on('click', function() {
    const message = `Hi! I'm interested in the "${currentTrip.title}" trip. Can you provide more details?`;
    const phone = '201234567890';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  });
}


// ========================================
// Trip Not Found
// ========================================
function showNotFound() {
  $('#loading').html(`
    <div class="text-center">
      <i class="fas fa-exclamation-triangle" style="font-size: 4rem; color: #ff6b6b;"></i>
      <h3 class="mt-4">Trip Not Found</h3>
      <p class="text-muted">The trip you're looking for doesn't exist.</p>
      <a href="trips.html" class="btn text-white mt-3" style="background:var(--primary)">
        <i class="fas fa-arrow-left me-2"></i>Back to Trips
      </a>
    </div>
  `);
}

// ========================================
// Helper Functions
// ========================================
function capitalizeFirst(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}