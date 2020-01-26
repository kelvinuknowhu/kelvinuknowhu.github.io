(function() {
  'use strict';
  var isMobile = {
    Android: function() {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    }
  };

  var fullHeight = function() {
    if (!isMobile.any()) {
      $('.js-fullheight').css('height', $(window).height());
      $(window).resize(function() {
        $('.js-fullheight').css('height', $(window).height());
      });
    }
  };

  var counter = function() {
    $('.js-counter').countTo({
      formatter: function(value, options) {
        return value.toFixed(options.decimals);
      }
    });
  };

  var counterWayPoint = function() {
    if ($('#colorlib-counter').length > 0) {
      $('#colorlib-counter').waypoint(
        function(direction) {
          if (direction === 'down' && !$(this.element).hasClass('animated')) {
            setTimeout(counter, 400);
            $(this.element).addClass('animated');
          }
        },
        { offset: '90%' }
      );
    }
  };

  // Animations
  var contentWayPoint = function() {
    var i = 0;
    $('.animate-box').waypoint(
      function(direction) {
        if (direction === 'down' && !$(this.element).hasClass('animated')) {
          i++;

          $(this.element).addClass('item-animate');
          setTimeout(function() {
            $('body .animate-box.item-animate').each(function(k) {
              var el = $(this);
              setTimeout(
                function() {
                  var effect = el.data('animate-effect');
                  if (effect === 'fadeIn') {
                    el.addClass('fadeIn animated');
                  } else if (effect === 'fadeInLeft') {
                    el.addClass('fadeInLeft animated');
                  } else if (effect === 'fadeInRight') {
                    el.addClass('fadeInRight animated');
                  } else {
                    el.addClass('fadeInUp animated');
                  }

                  el.removeClass('item-animate');
                },
                k * 200,
                'easeInOutExpo'
              );
            });
          }, 100);
        }
      },
      { offset: '85%' }
    );
  };

  var burgerMenu = function() {
    $('.js-colorlib-nav-toggle').on('click', function(event) {
      event.preventDefault();
      var $this = $(this);

      if ($('body').hasClass('offcanvas')) {
        $this.removeClass('active');
        $('body').removeClass('offcanvas');
      } else {
        $this.addClass('active');
        $('body').addClass('offcanvas');
      }
    });
  };

  // Click outside of offcanvass
  var mobileMenuOutsideClick = function() {
    $(document).click(function(e) {
      var container = $('#colorlib-aside, .js-colorlib-nav-toggle');
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('offcanvas')) {
          $('body').removeClass('offcanvas');
          $('.js-colorlib-nav-toggle').removeClass('active');
        }
      }
    });

    $(window).scroll(function() {
      if ($('body').hasClass('offcanvas')) {
        $('body').removeClass('offcanvas');
        $('.js-colorlib-nav-toggle').removeClass('active');
      }
    });
  };

  // Reflect scrolling in navigation
  var navActive = function(section) {
    var $el = $('#navbar > ul');
    $el.find('li').removeClass('active');
    $el.each(function() {
      $(this)
        .find('a[data-nav-section="' + section + '"]')
        .closest('li')
        .addClass('active');
    });
  };

  var navigationSection = function() {
    var $section = $('section[data-section]');

    $section.waypoint(
      function(direction) {
        if (direction === 'down') {
          navActive($(this.element).data('section'));
        }
      },
      {
        offset: '150px'
      }
    );

    $section.waypoint(
      function(direction) {
        if (direction === 'up') {
          navActive($(this.element).data('section'));
        }
      },
      {
        offset: function() {
          return -$(this.element).height() + 155;
        }
      }
    );
  };

  var owlCrouselFeatureSlide = function() {
    $('.owl-carousel').owlCarousel({
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      autoplay: true,
      loop: true,
      margin: 0,
      nav: true,
      dots: false,
      autoHeight: true,
      items: 1,
      navText: [
        "<i class='icon-arrow-left3 owl-direction'></i>",
        "<i class='icon-arrow-right3 owl-direction'></i>"
      ]
    });
  };

  // When Document is on load, run the following functions.
  $(function() {
    fullHeight();
    counter();
    counterWayPoint();
    contentWayPoint();
    burgerMenu();
    navigationSection();
    mobileMenuOutsideClick();
    owlCrouselFeatureSlide();
  });
})();

function toggleAside() {
  var navToggle = document.getElementsByClassName('nav-toggle')[0];
  var aside = document.querySelector('#aside');
  // Make aside element slide in or out
  if (!aside.className.includes('active')) {
    aside.className = 'active';
    $('#main').hide();
  } else {
    aside.className = '';
    $('#main').show();
  }
  // Change toggle icon between hamburger and cross
  if (!navToggle.className.includes('active')) {
    navToggle.className = 'nav-toggle active';
  } else {
    navToggle.className = 'nav-toggle';
  }
}

function toggleOffAside() {
  var navToggle = document.getElementsByClassName('nav-toggle')[0];
  var aside = document.querySelector('#aside');
  // Toggle off if aside is active
  if (aside.className.includes('active')) {
    aside.className = '';
    navToggle.className = 'nav-toggle';
    $('#main').show();
  }
}
