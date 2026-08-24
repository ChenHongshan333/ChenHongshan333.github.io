function toggleMobileMenu() {
  $('.navigation-wrapper').toggleClass('visible');
  $('.btn-mobile-menu__icon').toggleClass('hidden');
  $('.btn-mobile-close__icon').toggleClass('hidden');
}

$(document).ready(function () {
  $('a.panel-button').click(function (e) {
    if ($('.content-wrapper').hasClass('showing')){
      $('.content-wrapper').removeClass('animated slideInRight')
      $('.panel-cover').removeClass('panel-cover--collapsed')
      $('.panel-cover').css('max-width', '100%')
      $('.panel-cover').animate({'width': '100%'}, 400, swing = 'swing', function () {})
      $('.content-wrapper').removeClass('showing')
      history.pushState("", document.title, window.location.pathname + window.location.search);
      //window.location.hash = '' // leaves #
      e.preventDefault();
      return;
    }
    $('.panel-cover').addClass('panel-cover--collapsed');
    currentWidth = $('.panel-cover').width()
    if (currentWidth < 960) {
      $('.panel-cover').addClass('panel-cover--collapsed')
      $('.content-wrapper').addClass('animated slideInRight')
    } else {
      $('.panel-cover').css('max-width', currentWidth)
      $('.panel-cover').animate({'max-width': '530px', 'width': '40%'}, 400, swing = 'swing', function () {})
    }
    $('.content-wrapper').addClass('showing');
  })

  if (window.location.hash && window.location.hash == '#projects') {
    $('a.panel-button').click();
  }

  if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
    $('.panel-cover').addClass('panel-cover--collapsed')
  }

  $('.btn-mobile-menu').click(function () {
    if (!$('.navigation-wrapper').hasClass('animated bounceInDown')){
        $('.navigation-wrapper').addClass('animated bounceInDown');
    }
    toggleMobileMenu();
  })

  $('.navigation-wrapper .projects-button').click(function () {
    toggleMobileMenu();
  })

  // Blog page search toggle functionality
  $('#searchToggle').click(function () {
    var searchContainer = $('.blog-search-container');
    var searchToggle = $(this);
    
    searchContainer.toggleClass('active');
    searchToggle.toggleClass('active');
    
    // Focus on input when opened
    if (searchContainer.hasClass('active')) {
      setTimeout(function() {
        $('.blog-search-input').focus();
      }, 700);
    }
  });

  // Close search when clicking outside
  $(document).click(function(e) {
    var searchContainer = $('.blog-search-container');
    var searchToggle = $('#searchToggle');
    
    if (!$(e.target).closest('.blog-search-container, #searchToggle').length) {
      searchContainer.removeClass('active');
      searchToggle.removeClass('active');
    }
  });

  // Close search when pressing Escape
  $(document).keyup(function(e) {
    if (e.key === 'Escape') {
      $('.blog-search-container').removeClass('active');
      $('#searchToggle').removeClass('active');
    }
  });

  // Project tag filter
  $('.project-filter__btn').click(function() {
    var filter = $(this).data('filter');
    $('.project-filter__btn').removeClass('active');
    $(this).addClass('active');
    if (filter === 'all') {
      $('.timeline > li').show();
    } else {
      $('.timeline > li').each(function() {
        var tags = $(this).data('tags') || '';
        if (tags.indexOf(filter) !== -1) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    }
  });

  // Email dropdown click functionality - show for 0.3s then hide
  var emailTimeout;
  $('.email-trigger').click(function(e) {
    e.preventDefault();
    var dropdownMenu = $(this).siblings('.email-dropdown-menu');
    
    // Clear any existing timeout
    if (emailTimeout) {
      clearTimeout(emailTimeout);
    }
    
    // Show the dropdown
    dropdownMenu.addClass('show');
    
    // Hide after 0.3 seconds (300ms)
    emailTimeout = setTimeout(function() {
      dropdownMenu.removeClass('show');
    }, 1000);
  });

  // Resume dropdown click functionality - show for 0.3s then hide
  var resumeTimeout;
  $('.resume-trigger').click(function(e) {
    e.preventDefault();
    var dropdownMenu = $(this).siblings('.resume-dropdown-menu');
    
    // Clear any existing timeout
    if (resumeTimeout) {
      clearTimeout(resumeTimeout);
    }
    
    // Show the dropdown
    dropdownMenu.addClass('show');
    
    // Hide after 0.3 seconds (300ms)
    resumeTimeout = setTimeout(function() {
      dropdownMenu.removeClass('show');
    }, 1000);
  });
})
