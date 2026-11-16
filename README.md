Ubercart Checkout Terms
=======================

Ubercart Checkout Terms adds required legal acknowledgements to the Ubercart
checkout process. Customers must accept the terms and conditions and
acknowledge withdrawal information before submitting an order. This is an
initial release; German text snippets are currently used in the module.

Requirements
------------

This module requires that the following modules are also enabled:

- [Ubercart](https://github.com/backdrop-contrib/ubercart)
  - Ubercart Cart (`uc_cart`)
  - Ubercart Order (`uc_order`)


Installation

- Install this module using the official Backdrop CMS instructions at
  https://docs.backdropcms.org/documentation/extend-with-modules

- Enable the module under **Administration > Functionality**.

- Create or identify two published nodes:
  - Terms and conditions (AGB)
  - Withdrawal / right-of-withdrawal information

- Visit the configuration page under **Store > Configuration >
  Legal checkout notices**
  (`admin/store/settings/checkout-terms`).

- Enter the numeric node ID and a version identifier for each document.

- Save the configuration.

- Test the checkout process in a staging environment before using this
  module in production.


Issues
------

Bugs and Feature Requests should be reported in the Issue Queue:
https://github.com/backdrop-contrib/uc_checkout_terms/issues


Current Maintainers
-------------------

- [Sven Götze](https://github.com/djzwerg)
- Seeking additional maintainers


Credits
-------

- Written for Backdrop CMS by [Sven Götze](https://github.com/djzwerg).


License
-------

This project is GPL v2 software.
See the LICENSE.txt file in this directory for complete text.