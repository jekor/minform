// minform 2.0 - a minimalist javascript form enhancer

// Copyright 2011, 2013, 2014, 2015 Chris Forno
// Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).

// Unsupported browsers:
// Internet Explorer <= 8

(function () {
  // We cannot rely on .value since it might be the placeholder text.
  function isEmpty(el) {
    return el.value === '' || el.value === el.getAttribute('placeholder');
  }

  function hasClass(el, className) {
    if (el.classList) {
      return el.classList.contains(className);
    } else {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
  }

  function removeClass(el, className) {
    if (el.classList) {
      return el.classList.remove(className);
    } else {
      return el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }
  
  function blur(el) {
    el.value = el.getAttribute('placeholder');
    el.className += ' placeheld';
  }

  window.minform = function (form) {
    // Add placeholder text to elements with an HTML5 placeholder attribute.
    // To do so, insert the placeholder value into the input value and add a
    // class that allows for CSS styling.
    form.addEventListener('blur', function (event) {
      if (event.target.hasAttribute('placeholder')) {
        if (isEmpty(event.target)) {
          blur(event.target);
        }
      }
    }, true);
    form.addEventListener('focus', function (event) {
      if (event.target.hasAttribute('placeholder') && (hasClass(event.target, 'placeheld'))) {
        removeClass(event.target, 'placeheld');
      }
    }, true);

    var placeholders = form.querySelectorAll('[placeholder]');
    for (var i = 0; i < placeholders.length; i++) {
      blur(placeholders[i]);
    }

    // Focus the first input with attribute autofocus.
    var autofocused = document.querySelector('[autofocus]');
    if (autofocused) autofocused.focus();

    form.addEventListener('submit', function (event) {
      // Don't submit without all required inputs.
      var required = form.querySelector('[required]');
      for (var i = 0; i < required.length; i++) {
        if (isEmpty(required[i])) {
          event.preventDefault();
          required[i].focus();
          return;
        }
      }

      // Clear all placeholder values.
      var placeholders = form.querySelectorAll('[placeholder]');
      for (var i = 0; i < placeholders.length; i++) {
        if (isEmpty(placeholders[i])) {
          placeholders[i].value = '';
        }
      }
    });
  };
})();
