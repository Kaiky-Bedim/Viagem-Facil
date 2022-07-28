# chillerlan/php-qrcode

A PHP 7.4+ QR Code library based on the [implementation](https://github.com/kazuhikoarase/qrcode-generator) by [Kazuhiko Arase](https://github.com/kazuhikoarase),
namespaced, cleaned up, improved and other stuff.

[![PHP Version Support][php-badge]][php]
[![Packagist version][packagist-badge]][packagist]
[![License][license-badge]][license]
[![CodeCov][coverage-badge]][coverage]
[![Scrunitizer CI][scrutinizer-badge]][scrutinizer]
[![Packagist downloads][downloads-badge]][downloads]<br/>
[![Continuous Integration][gh-action-badge]][gh-action]

[php-badge]: https://img.shields.io/packagist/php-v/chillerlan/php-qrcode?logo=php&color=8892BF
[php]: https://www.php.net/supported-versions.php
[packagist-badge]: https://img.shields.io/packagist/v/chillerlan/php-qrcode.svg?logo=packagist
[packagist]: https://packagist.org/packages/chillerlan/php-qrcode
[license-badge]: https://img.shields.io/github/license/chillerlan/php-qrcode.svg
[license]: https://github.com/chillerlan/php-qrcode/blob/main/LICENSE
[coverage-badge]: https://img.shields.io/codecov/c/github/chillerlan/php-qrcode.svg?logo=codecov
[coverage]: https://codecov.io/github/chillerlan/php-qrcode
[scrutinizer-badge]: https://img.shields.io/scrutinizer/g/chillerlan/php-qrcode.svg?logo=scrutinizer
[scrutinizer]: https://scrutinizer-ci.com/g/chillerlan/php-qrcode
[downloads-badge]: https://img.shields.io/packagist/dt/chillerlan/php-qrcode.svg?logo=packagist
[downloads]: https://packagist.org/packages/chillerlan/php-qrcode/stats
[gh-action-badge]: https://github.com/chillerlan/php-qrcode/workflows/Continuous%20Integration/badge.svg
[gh-action]: https://github.com/chillerlan/php-qrcode/actions/workflows/tests.yml?query=branch%3Amain

## Documentation

See [the wiki](https://github.com/chillerlan/php-qrcode/wiki) for advanced documentation.
An API documentation created with [phpDocumentor](https://www.phpdoc.org/) can be found at https://chillerlan.github.io/php-qrcode/ (WIP).

### Requirements
- PHP 7.4+
  - `ext-mbstring`
  - optional:
    - `ext-json`, `ext-gd`
    - `ext-imagick` with [ImageMagick](https://imagemagick.org) installed
    - [`setasign/fpdf`](https://github.com/setasign/fpdf) for the PDF output module

### Installation
**requires [composer](https://getcomposer.org)**

via terminal: `composer require chillerlan/php-qrcode`

*composer.json*
```json
{
	"require": {
		"php": "^7.4",
		"chillerlan/php-qrcode": "dev-main"
	}
}
```

Note: replace `dev-main` with a [version constraint](https://getcomposer.org/doc/articles/versions.md#writing-version-constraints), e.g. `^3.2` - see [releases](https://github.com/chillerlan/php-qrcode/releases) for valid versions.
For PHP version ...
  - 7.4+ use `^4.3`
  - 7.2+ use `^3.4.1` (v3.4.1 also supports PHP8)
  - 7.0+ use `^2.0`
  - 5.6+ use `^1.0` (please let PHP 5 die!)

In case you want to keep using `dev-main`, specify the hash of a commit to avoid running into unforseen issues like so: `dev-main#b625396e0752d79747a55205ae7e191eeb459dcd`

PSA: [PHP 7.0 - 7.3 are EOL](https://www.php.net/supported-versions.php) and therefore the respective `QRCode` versions are also no longer supported!

### Quickstart
We want to encode this URI for a mobile authenticator into a QRcode image:
```php
$data = 'otpauth://totp/test?secret=B3JX4VCVJDVNXNZ5&issuer=chillerlan.net';

// quick and simple:
echo '<img src="'.(new QRCode)->render($data).'" alt="QR Code" />';
```

<p align="center">
	<img alt="QR codes are awesome!" style="width: auto; height: 530px;" src="https://raw.githubusercontent.com/chillerlan/php-qrcode/main/.github/images/example.svg">
</p>

Wait, what was that? Please again, slower! See [Advanced usage](https://github.com/chillerlan/php-qrcode/wiki/Advanced-usage) on the wiki.

### Framework Integration
- Drupal:
  - [Google Authenticator Login `ga_login`](https://www.drupal.org/project/ga_login)
- Symfony
	- [phpqrcode-bundle](https://github.com/jonasarts/phpqrcode-bundle)
- WordPress:
  - [`wp-two-factor-auth`](https://github.com/sjinks/wp-two-factor-auth)
  - [`simple-2fa`](https://wordpress.org/plugins/simple-2fa/)
  - [`wordpress-seo`](https://github.com/Yoast/wordpress-seo)
  - [`floating-share-button`](https://github.com/qriouslad/floating-share-button)
- WoltLab Suite
  - [two-step-verification](http://pluginstore.woltlab.com/file/3007-two-step-verification/)
- [Appwrite](https://github.com/appwrite/appwrite)
- [Cachet](https://github.com/CachetHQ/Cachet)
- [twill](https://github.com/area17/twill)
- other uses: [dependents](https://github.com/chillerlan/php-qrcode/network/dependents) / [packages](https://github.com/chillerlan/php-qrcode/network/dependents?dependent_type=PACKAGE)

### Shameless advertising
Hi, please check out my other projects that are way cooler than qrcodes!

- [php-oauth-core](https://github.com/chillerlan/php-oauth-core) - an OAuth 1/2 client library along with a bunch of [providers](https://github.com/chillerlan/php-oauth-providers)
- [php-httpinterface](https://github.com/chillerlan/php-httpinterface) - a PSR-7/15/17/18 implemetation
- [php-database](https://github.com/chillerlan/php-database) - a database client & querybuilder for MySQL, Postgres, SQLite, MSSQL, Firebird

### Disclaimer!
I don't take responsibility for molten CPUs, misled applications, failed log-ins etc.. Use at your own risk!

#### License notice
Parts of this code are [ported to php](https://github.com/khanamiryan/php-qrcode-detector-decoder) from the [ZXing project](https://github.com/zxing/zxing) and licensed under the [Apache License, Version 2.0](./NOTICE).

#### Trademark Notice

The word "QR Code" is a registered trademark of *DENSO WAVE INCORPORATED*<br>
https://www.qrcode.com/en/faq.html#patentH2Title
