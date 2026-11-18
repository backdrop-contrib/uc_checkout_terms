/**
 * @file
 * Progressive enhancement for legal text accordions.
 */
(function ($) {
  'use strict';
  Backdrop.behaviors.ucCheckoutTermsAccordion = {
    attach: function (context) {
      $('details.uc-checkout-terms-detail', context)
        .once('uc-checkout-terms-accordion')
        .each(function () {
          var detail = this;
          // Native details/summary provides keyboard interaction. Without JS,
          // the server-supplied open attribute keeps all legal text available.
          detail.removeAttribute('open');
          $(detail).on('toggle.ucCheckoutTermsAccordion', function () {
            if (!detail.open) {
              return;
            }
            $(detail).closest('.uc-checkout-terms-accordion')
              .find('details.uc-checkout-terms-detail')
              .not(detail)
              .removeAttr('open');
          });
        });
    }
  };
})(jQuery);
