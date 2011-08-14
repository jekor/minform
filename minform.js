// minform 0.1 - a minimalistic form enhancement plugin for jQuery
// https://github.com/jekor/minform

// Copyright 2011 Chris Forno
// Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).

// Requirements:
//  * jQuery >= 1.4.3

(function ($) {
  // We cannot rely on .val() since it might be the placeholder text. I could
  // attempt to override val(), but I think that a better long-term solution
  // will be to avoid putting the placeholder text into the value attribute.
  $.fn.isEmpty = function () {
    return this.val() === '' || this.val() === this.attr('placeholder');
  };

  $.fn.minform = function () {
    // Add placeholder text to elements with an HTML5 placeholder attribute.
    // To do so, insert the placeholder value into the input value and add a
    // class that allows for CSS styling.
    $(this).delegate('[placeholder]', 'blur.minform', function () {
      if ($(this).isEmpty()) {
        $(this).val($(this).attr('placeholder')).addClass('placeheld');
      }
    });

    $(this).delegate('.placeheld[placeholder]', 'focus.minform', function () {
      $(this).val('').removeClass('placeheld');
    });

    $(this).find('[placeholder]').blur();

    // Focus any inputs with attribute autofocus.
    $('[autofocus]', this).focus();

    this.submit(function () {
      // Don't submit without all required fields.
      var missing = $('[required]', this).filter(function () {return $(this).isEmpty();});
      if (missing.length) {
        // Rather than highlight all of the missing fields, re-focus the first one.
        missing[0].focus();
        return false;
      }

      // Clear all placeholder values from non-required fields.
      $('[placeholder]:not([required])', $(this)).filter(function () {return $(this).isEmpty();}).val('');
    });

    return this;
  };
})(jQuery);