---
layout: null
sitemap:
  exclude: 'yes'
---
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

  if (window.location.pathname !== '{{ site.baseurl }}/' && window.location.pathname !== '{{ site.baseurl }}/index.html') {
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

  // About page: section progress rail
  var $progress = $('.page-progress');
  if ($progress.length) {
    var $items = $progress.find('.page-progress__item');
    var $fill = $progress.find('.page-progress__fill');
    var sections = $items.map(function () {
      return document.getElementById($(this).data('target'));
    }).get();

    function updateProgress() {
      var scrollTop = $(window).scrollTop();
      var winH = $(window).height();
      var max = Math.max($(document).height() - winH, 1);
      var ratio = Math.min(Math.max(scrollTop / max, 0), 1);
      $fill.css('height', (ratio * 100) + '%');

      // Read positions live, since collapsing a <details> shifts every
      // section below it.
      var active = 0;
      for (var i = 0; i < sections.length; i++) {
        if (sections[i] && sections[i].getBoundingClientRect().top <= winH * 0.3) {
          active = i;
        }
      }
      // A short final section may never cross the threshold.
      if (ratio > 0.995) active = sections.length - 1;

      $items.each(function (i) {
        $(this).toggleClass('is-active', i === active)
               .toggleClass('is-done', i < active);
        if (i === active) {
          $(this).find('a').attr('aria-current', 'true');
        } else {
          $(this).find('a').removeAttr('aria-current');
        }
      });
    }

    $progress.find('a').click(function (e) {
      var el = document.getElementById($(this).closest('.page-progress__item').data('target'));
      if (!el) return;
      e.preventDefault();
      $('html, body').animate({ scrollTop: $(el).offset().top - 24 }, 400);
    });

    $(window).on('scroll resize', updateProgress);
    $('.about-content details').on('toggle', updateProgress);
    updateProgress();
  }

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

  // Email dropdown: open on click, stay open while the pointer is on it, and
  // copy the address to the clipboard when an entry is clicked.
  var emailTimeout;
  var $emailMenu = $('.email-dropdown-menu');

  function hideEmailMenu() {
    $emailMenu.removeClass('show');
  }

  function scheduleEmailHide(delay) {
    clearTimeout(emailTimeout);
    emailTimeout = setTimeout(hideEmailMenu, delay);
  }

  $('.email-trigger').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).siblings('.email-dropdown-menu').addClass('show');
    // Auto-close only if the pointer never reaches the menu.
    scheduleEmailHide(2500);
  });

  // Keep it open while the pointer is over the dropdown, otherwise a click
  // target that disappears after a second is impossible to hit.
  $('.email-dropdown').on('mouseenter', function () {
    clearTimeout(emailTimeout);
  }).on('mouseleave', function () {
    scheduleEmailHide(400);
  });

  $(document).on('click', function () {
    hideEmailMenu();
  });

  // A toast is used rather than in-place text because the dropdown may well
  // have closed by the time the reader looks for confirmation.
  var $copyToast;

  function showCopyToast(message, ok) {
    if (!$copyToast) {
      $copyToast = $('<div class="copy-toast" role="status" aria-live="polite"></div>')
        .appendTo('body');
    }
    $copyToast.text(message)
      .toggleClass('copy-toast--error', !ok)
      .addClass('show');
    clearTimeout($copyToast.data('timer'));
    $copyToast.data('timer', setTimeout(function () {
      $copyToast.removeClass('show');
    }, 2000));
  }

  // Used when the async Clipboard API is unavailable (plain http) or refuses
  // (permission denied, document not focused).
  function legacyCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (err) {
      ok = false;
    }
    document.body.removeChild(ta);
    return ok;
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function () {
        return legacyCopy(text) ? Promise.resolve() : Promise.reject();
      });
    }
    return legacyCopy(text) ? Promise.resolve() : Promise.reject();
  }

  // The mailto: href is kept so the link still works without JavaScript and
  // still offers "copy address" from the context menu.
  $('.email-copy').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    var address = $(this).data('email');
    copyText(address).then(function () {
      showCopyToast('Copied  ' + address, true);
    }, function () {
      showCopyToast('Press Ctrl+C to copy: ' + address, false);
    });
    scheduleEmailHide(150);
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
