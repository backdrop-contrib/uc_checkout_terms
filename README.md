# Ubercart Checkout Terms

Ubercart Checkout Terms manages repeatable legal documents and confirmations in
Backdrop CMS checkout. It supports formatted inline text and field-independent
links to public nodes, including nodes built with Paragraphs or custom fields.

Release: 1.x-2.0.0-beta2. This package is a complete replacement module directory.
It is a statically reviewed release candidate, not a live-site certification.

## Requirements

- Backdrop CMS with Ubercart and its Cart and Order modules enabled.
- Core Filter support; a configured text editor is optional for rich-text editing.
- Core Locale and a German language are optional for the supplied translation.
- Paragraphs is NOT a dependency: referenced pages render themselves normally.
- Node.js is NOT required for site operation or the PHP smoke tests.

## Installation

Install using the standard Backdrop module installation workflow. Enable the
module and grant "Administer checkout legal documents" only to trusted editors.
Configure entries at admin/store/settings/checkout-terms. At least one valid
entry must be enabled; checkout deliberately blocks when no valid set exists.
All enabled entries apply to all orders. Rules and product-specific conditions
are not implemented in this release.

## Updating an existing installation

1. Back up the database, active configuration and complete old module directory.
2. Deploy on staging first. Replace the module directory rather than merging
   files indefinitely. Do not uninstall the module.
3. The .module/.info/.install files stay at the root. Assets now live in js/ and
   css/. Default configuration lives in config/. Do not manually copy the
   default JSON into the site's active configuration: that would erase settings.
4. Remove obsolete root-level uc_checkout_terms.reference.js and
   uc_checkout_terms.css after deploying the complete replacement directory.
5. Run update.php and apply pending updates, including update_1001. The update
   preserves entries and historical order data. Configuration schema remains 2;
   newly created audit events use schema 3.
6. Clear all Backdrop caches, including aggregated JavaScript/CSS. Reopen a fresh
   admin form; do not submit a stale tab created before the upgrade.
7. Import translations/uc_checkout_terms.de.po for German with replacement of
   applicable existing translations. This is a complete current translation,
   not the previous reference-fix supplement.
8. Run sh tests/check.sh and the site-specific checks in docs/TESTING.md.

The default config file is for fresh installation. Existing active configuration
is not replaced by this update. Legacy two-node settings remain supported by the
migration helper. No historical order snapshot is rewritten.

## Legal entries

Add/remove entries using the AJAX controls. Save configuration persists changes.
Each entry has a stable internal ID, label, version, source, display mode,
confirmation type, required flag and weight. Lower weights appear first.

Sources:

- Referenced content: a public node link using the configured legal label.
- Formatted inline text: long text stored in configuration as value + format.
- Referenced content link and inline text: the node link plus additional text.

A node needs to exist, be published and be accessible to anonymous visitors.
There is NO Body-field or Paragraphs-field inspection and no node-content render
inside this module. Body-only, Paragraphs-only and other field layouts are equally
valid references. The normal target page handles its own fields and presentation.

Referenced nodes always open directly at node/NID (or its normal URL alias) in a
new tab. The link text is the configured legal label, not forcibly the node title.
Links use target="_blank" and rel="noopener noreferrer". New-tab behavior does not
prove that a visitor opened or read the page.

Display mode now controls configured inline text only: display it in checkout,
open it on a module page in a new tab, or show it in a Core dialog. For a node-only
entry the setting is harmless and ignored; the reference always stays a link.
Combined entries never replace a node page with only its Body field.

## Formatted inline text and editors

Inline text uses a Form API text_format element with textarea as its base type,
without a summary. Backdrop attaches the editor configured for the selected text
format, subject to the administrator's format permissions. This is not a separate
Field API field instance: content and format are stored in configuration.

Both source inputs remain visible in the admin form. Only selected sources apply.
Inline content must be nonempty for enabled inline/combined entries and is passed
through check_markup before output. Powerful formats and module permissions must
be restricted to trusted editors. A plain text format does not automatically gain
a rich-text editor. Configuration imports are trusted administrative operations.

## Reference selection

Enter a numeric ID directly or select a title suggestion ending in [ID]. Numeric
IDs work without JavaScript. Title suggestions use an optional native datalist
and the token-protected Core node/autocomplete endpoint. Search uses title prefixes.
The fallback is ID entry, not a security bypass. An unresolved title is not silently
assigned to an arbitrary node. Draft input is retained across add/remove rebuilds.

## Confirmations and audit

Acceptance and acknowledgement can be required or optional. Information-only
entries have no checkbox. These are not legal classifications or age verification.

See docs/AUDIT.md for the important difference between reference metadata and a
full inline text snapshot. A linked page is NOT archived by this module. Maintain
separate version history/archival controls for legal pages, particularly when
Paragraph items can change independently of the parent node revision.

A cached server-side form snapshot is compared with current configured payloads
before submission. New events are recorded on the order and as English internal
comments. Configuration and historical audit records are not the same store.

## Translation

All source comments, UI source strings, audit headings and documentation are
English. Import translations/uc_checkout_terms.de.po for German. Labels and legal
content are administrator-authored content; enter them in the appropriate language.
There is one shared document configuration, not per-language legal text selection.
The exact localized confirmation wording is stored for new events.

## Documentation

- docs/AUDIT.md: payload scope and limitations.
- docs/TESTING.md: performed checks and required integration tests.
- tests/lint.sh: PHP syntax checks on a PHP-enabled system.
- tests/check.sh: PHP lint + isolated reference tests; optional JS syntax check.
- CHANGELOG.md: functional changes.

The directory layout follows the Backdrop module template:
https://github.com/backdrop-contrib/module_template

## Issues

Use the issue tracker of the repository hosting this module. Include Backdrop,
Ubercart and PHP versions, a reproduction and relevant redacted log messages.
Never publish session tokens, secrets, raw customer exports or personal data.

## Current maintainers

Maintainer assignment and the public project URL are managed by the project owner.

## Credits

Custom development for the HSFeV checkout workflow with AI-assisted implementation
and review. This is not a port of Drupal uc_termsofservice. The older Drupal module
was reviewed as a functional reference; its Body/modalframe implementation is not
used for field-independent links.

## License

GNU General Public License, version 2 or later. See LICENSE.txt.
