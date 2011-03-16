// minform 0.1 - a minimalistic form enhancement plugin for jQuery
// https://github.com/jekor/minform

// Copyright 2011 Chris Forno
// Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).

// Requirements:
//  * jQuery >= 1.4.3

(function ($) {
  var isEmpty = function () {
    var $input = $(this);
    return $input.val() === '' || $input.val() === $input.attr('placeholder');
  };

  $.fn.minform = function () {
    // Add placeholder text to elements with an HTML5 placeholder attribute.
    // To do so, insert the placeholder value into the input value and add a
    // class that allows for CSS styling.
    $('[placeholder]', this).live('blur.minform', function () {
      if (isEmpty.call(this)) {
        $(this).val($(this).attr('placeholder')).addClass('placeheld');
      }
    }).blur();

    $('.placeheld[placeholder]', this).live('focus.minform', function () {
      $(this).val('').removeClass('placeheld');
    });

    // Focus any inputs with attribute autofocus.
    $('[autofocus]', this).focus();

    this.submit(function () {
      // Don't submit without all required fields.
      var missing = $('[required]', $(this)).filter(isEmpty);
      if (missing.length) {
        // Rather than highlight all of the missing fields, re-focus the first one.
        missing[0].focus();
        return false;
      }

      // Clear all placeholder values from non-required fields.
      $('[placeholder]:not([required])', $(this)).filter(isEmpty).val('');
    });

    return this;
  };
})(jQuery);