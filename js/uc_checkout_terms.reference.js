/**
 * @file
 * Token-aware, optional node title suggestions for legal document references.
 */
(function ($) {
  'use strict';

  Backdrop.behaviors.ucCheckoutTermsReferences = {
    attach: function (context) {
      $('input.uc-checkout-terms-reference', context)
        .once('uc-checkout-terms-reference')
        .each(function () {
          var $input = $(this);
          var list = document.getElementById($input.attr('list'));
          var status = document.getElementById($input.attr('id') + '-status');
          var urlTemplate = $input.attr('data-uct-url');
          var token = $input.attr('data-uct-token');
          var timer = null;
          var request = null;
          var sequence = 0;

          if (!list || !urlTemplate) {
            return;
          }

          function setStatus(message) {
            if (status) {
              $(status).text(message);
            }
          }

          $input.on('input.ucCheckoutTerms', function () {
            var value = $.trim($input.val());
            var current = ++sequence;
            window.clearTimeout(timer);
            if (request) {
              request.abort();
              request = null;
            }
            $(list).empty();
            setStatus('');

            // Numeric IDs and complete selected titles never require a request.
            if (!value || /^\d+$/.test(value) || /\[\d+\]\s*$/.test(value)) {
              return;
            }
            if (value.length < 2) {
              return;
            }

            timer = window.setTimeout(function () {
              var data = {};
              if (token) {
                data.token = token;
              }
              request = $.ajax({
                // A URL placeholder also supports installations without clean URLs.
                url: urlTemplate.replace('uct-search-placeholder', encodeURIComponent(value)),
                data: data,
                dataType: 'json',
                type: 'GET',
                timeout: 10000
              }).done(function (matches) {
                if (current !== sequence) {
                  return;
                }
                var count = 0;
                $(list).empty();
                if (matches && typeof matches === 'object') {
                  $.each(matches, function (key) {
                    // Core keys are unescaped titles followed by [node ID].
                    // Use DOM attributes/text, never HTML insertion.
                    if (typeof key === 'string' && /\[\d+\]\s*$/.test(key)) {
                      $('<option>').attr('value', key).appendTo(list);
                      count++;
                    }
                  });
                }
                if (!count) {
                  setStatus(Backdrop.t('No matching titles found. You can enter a node ID directly.'));
                }
              }).fail(function (xhr, textStatus) {
                if (textStatus === 'abort' || current !== sequence) {
                  return;
                }
                setStatus(Backdrop.t('Title search is unavailable. Enter a node ID directly or reload this page.'));
              });
            }, 300);
          });
        });
    }
  };
})(jQuery);
