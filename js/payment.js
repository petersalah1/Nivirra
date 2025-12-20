/**
 * ========================================
 * PAYMENT PAGE
 * ========================================
 */

let currentTrip = null;
let bookingData = {
  tripId: null,
  fullName: '',
  email: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
  guests: 2 // عدد الأشخاص (يمكن تعديله لاحقاً)
};

$(document).ready(function() {
  console.log('🚀 Payment Page Loaded');
  
  loadTripInfo();
  initForm();
  initNavbar();
  
  // إضافة رسالة للمستخدم أن هذا popup window
  showPopupNotice();
});

// ========================================
// إشعار أن الصفحة في نافذة جديدة
// ========================================
function showPopupNotice() {
  // التحقق إذا كانت النافذة popup
  if (window.opener) {
    const notice = `
      <div class="alert alert-info alert-dismissible fade show m-3" role="alert">
        <i class="fas fa-info-circle me-2"></i>
        <strong>Secure Payment Window</strong> - Complete your booking securely. You can close this window when done.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `;
    $('body').prepend(notice);
  }
}

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
// تحميل معلومات الرحلة
// ========================================
function loadTripInfo() {
  // الحصول على trip_id من URL
  const urlParams = new URLSearchParams(window.location.search);
  const tripId = parseInt(urlParams.get('trip_id'));
  
  if (!tripId) {
    // إذا كانت popup، أغلقها وارجع للرحلات
    if (window.opener) {
      alert('Invalid trip ID. Closing window...');
      window.close();
    } else {
      window.location.href = 'trips.html';
    }
    return;
  }
  
  // جلب الرحلة
  currentTrip = getTripById(tripId);
  
  if (!currentTrip) {
    if (window.opener) {
      alert('Trip not found. Closing window...');
      window.close();
    } else {
      window.location.href = 'trips.html';
    }
    return;
  }
  
  bookingData.tripId = tripId;
  
  // عرض الملخص
  renderSummary();
  
  console.log('✓ Trip loaded for payment:', currentTrip.title);
}

// ========================================
// عرض ملخص الطلب
// ========================================
function renderSummary() {
  const guests = bookingData.guests;
  const total = currentTrip.price * guests;
  
  const html = `
    <h5 class="mb-3">
      <i class="fas fa-receipt me-2" style="color: var(--primary)"></i>
      Trip Summary
    </h5>
    <hr>
    <div class="mb-3">
      <div class="d-flex justify-content-between mb-2">
        <span class="text-muted">Trip:</span>
        <strong>${escapeHtml(currentTrip.title)}</strong>
      </div>
      <div class="d-flex justify-content-between mb-2">
        <span class="text-muted">Duration:</span>
        <strong>${currentTrip.days} Days</strong>
      </div>
      <div class="d-flex justify-content-between mb-2">
        <span class="text-muted">Guests:</span>
        <strong>${guests} Adults</strong>
      </div>
      <div class="d-flex justify-content-between mb-2">
        <span class="text-muted">Price per person:</span>
        <strong>$${currentTrip.price}</strong>
      </div>
    </div>
    <hr>
    <div class="d-flex justify-content-between fw-bold fs-5 mb-3">
      <span>Total Amount</span>
      <span style="color: var(--primary)">$${total}</span>
    </div>
    <div class="alert alert-info small mb-0">
      <i class="fas fa-info-circle me-1"></i>
      Free cancellation up to 48 hours before departure
    </div>
  `;
  
  $('.order-summary').html(html);
}

// ========================================
// تفعيل الفورم
// ========================================
function initForm() {
  const form = $('#paymentForm');
  
  // Card Number Formatting
  $('#cardNumber').on('input', function() {
    let value = $(this).val().replace(/\s/g, '');
    let formatted = value.match(/.{1,4}/g);
    $(this).val(formatted ? formatted.join(' ') : '');
  });
  
  // Expiry Formatting (MM / YY)
  $('#expiry').on('input', function() {
    let value = $(this).val().replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + ' / ' + value.slice(2, 4);
    }
    $(this).val(value);
  });
  
  // CVV - أرقام فقط
  $('#cvv').on('input', function() {
    let value = $(this).val().replace(/\D/g, '');
    $(this).val(value.slice(0, 3));
  });
  
  // Submit
  form.on('submit', function(e) {
    e.preventDefault();
    handlePayment();
  });
}

// ========================================
// معالجة الدفع
// ========================================
function handlePayment() {
  // جمع البيانات
  bookingData.fullName = $('#fullName').val().trim();
  bookingData.email = $('#email').val().trim();
  bookingData.cardNumber = $('#cardNumber').val().replace(/\s/g, '');
  bookingData.expiry = $('#expiry').val();
  bookingData.cvv = $('#cvv').val();
  
  // التحقق
  if (!validateForm()) {
    return;
  }
  
  // عرض Loading
  showLoading();
  
  // حفظ البيانات في localStorage (للباك فيما بعد)
  saveBooking();
  
  // Simulate API call
  setTimeout(() => {
    showSuccess();
  }, 2000);
}

// ========================================
// التحقق من البيانات
// ========================================
function validateForm() {
  let isValid = true;
  
  // Full Name
  if (!bookingData.fullName) {
    $('#fullName').addClass('is-invalid');
    isValid = false;
  } else {
    $('#fullName').removeClass('is-invalid').addClass('is-valid');
  }
  
  // Email
  if (!bookingData.email || !isValidEmail(bookingData.email)) {
    $('#email').addClass('is-invalid');
    isValid = false;
  } else {
    $('#email').removeClass('is-invalid').addClass('is-valid');
  }
  
  // Card Number
  if (!bookingData.cardNumber || bookingData.cardNumber.length !== 16) {
    $('#cardNumber').addClass('is-invalid');
    isValid = false;
  } else {
    $('#cardNumber').removeClass('is-invalid').addClass('is-valid');
  }
  
  // Expiry
  if (!bookingData.expiry) {
    $('#expiry').addClass('is-invalid');
    isValid = false;
  } else {
    $('#expiry').removeClass('is-invalid').addClass('is-valid');
  }
  
  // CVV
  if (!bookingData.cvv || bookingData.cvv.length !== 3) {
    $('#cvv').addClass('is-invalid');
    isValid = false;
  } else {
    $('#cvv').removeClass('is-invalid').addClass('is-valid');
  }
  
  if (!isValid) {
    alert('Please fill in all fields correctly.');
  }
  
  return isValid;
}

// ========================================
// حفظ بيانات الحجز
// ========================================
function saveBooking() {
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  
  const newBooking = {
    id: Date.now(),
    tripId: bookingData.tripId,
    tripTitle: currentTrip.title,
    fullName: bookingData.fullName,
    email: bookingData.email,
    guests: bookingData.guests,
    total: currentTrip.price * bookingData.guests,
    date: new Date().toISOString(),
    status: 'confirmed'
  };
  
  bookings.push(newBooking);
  localStorage.setItem('bookings', JSON.stringify(bookings));
  
  console.log('✓ Booking saved:', newBooking);
}

// ========================================
// عرض Loading
// ========================================
function showLoading() {
  const btn = $('#paymentForm button[type="submit"]');
  btn.prop('disabled', true).html(`
    <span class="spinner-border spinner-border-sm me-2"></span>
    Processing Payment...
  `);
}

// ========================================
// عرض رسالة النجاح
// ========================================
function showSuccess() {
  const referenceNum = Math.random().toString(36).substr(2, 9).toUpperCase();
  
  const closeButton = window.opener ? `
    <button class="btn btn-outline-secondary me-2" onclick="window.close()">
      <i class="fas fa-times me-2"></i>Close Window
    </button>
  ` : '';
  
  const html = `
    <div class="text-center py-5">
      <div class="mb-4">
        <i class="fas fa-check-circle text-success" style="font-size: 5rem;"></i>
      </div>
      <h2 class="mb-3">Booking Confirmed!</h2>
      <p class="lead mb-4">Thank you for your booking. We've sent a confirmation email to your inbox.</p>
      
      <div class="card mx-auto shadow-sm" style="max-width: 500px;">
        <div class="card-body">
          <h5 class="card-title mb-3">Booking Details</h5>
          <hr>
          <div class="text-start">
            <div class="d-flex justify-content-between mb-2">
              <span class="text-muted">Trip:</span>
              <strong>${currentTrip.title}</strong>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span class="text-muted">Duration:</span>
              <strong>${currentTrip.days} Days</strong>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span class="text-muted">Guests:</span>
              <strong>${bookingData.guests} Adults</strong>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span class="text-muted">Total Paid:</span>
              <strong style="color: var(--primary)">$${currentTrip.price * bookingData.guests}</strong>
            </div>
            <div class="d-flex justify-content-between">
              <span class="text-muted">Reference:</span>
              <strong>#${referenceNum}</strong>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-4">
        ${closeButton}
        <a href="index.html" class="btn btn-primary me-2" ${window.opener ? 'target="_blank"' : ''}>
          <i class="fas fa-home me-2"></i>Back to Home
        </a>
        <a href="trips.html" class="btn btn-outline-primary" ${window.opener ? 'target="_blank"' : ''}>
          Browse More Trips
        </a>
      </div>
    </div>
  `;
  
  $('.container > .row').remove();
  $('.container').html(html);
  
  // إذا كانت popup، أغلقها تلقائياً بعد 10 ثواني
  if (window.opener) {
    setTimeout(() => {
      if (confirm('Booking completed successfully! Close this window?')) {
        window.close();
      }
    }, 10000);
  }
}

// ========================================
// Helper Functions
// ========================================
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}