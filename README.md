# nativescript-webview-crypto

[![npm](https://img.shields.io/npm/v/nativescript-webview-crypto.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/nativescript-webview-crypto)
[![Dependency Status](https://dependencyci.com/github/saulshanabrook/nativescript-webview-crypto/badge)](https://dependencyci.com/github/saulshanabrook/nativescript-webview-crypto)

This brings `window.Crypto` to your Native Script application. It does this
by communicating with a hidden WebView, which performs the actual
computation.

Refer to the [`webview-crypto`](https://github.com/saulshanabrook/webview-crypto)
repo for most of the code and some cavaets.

*This project is funded by [Burke Software and Consulting LLC](http://burkesoftware.com/) for [passit](http://passit.io/). We are available for hire for any improvement and integration needs on this project. Open an issue to start a conversation or email info @ burke software dot come.*


## Install

This requires being [setup properly with NativeScript](http://docs.nativescript.org/start/quick-setup)
first. Then install this as a plugin:

```bash
tns plugin add nativescript-webview-crypto
```

<!-- ```bash
tns plugin add nativescript-webview-crypto

mkdir -p app/webview-crypto
cp node_modules/nativescript-webview-interface/www/nativescript-webview-interface.js \
   node_modules/webview-crypto/webViewWorker.js \
   node_modules/nativescript-webview-crypto/www/index.html \
   node_modules/nativescript-webview-crypto/www/nativeScriptWebViewWorker.js \
   app/webview-crypto
``` -->

## Quickstart

Rendering the `PolyfillCrypto` components will start up a WebView to
transparently proxy all the crypto calls to. It will also set the `crypto`
global variable.

```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd" xmlns:WebViewCrypto="nativescript-webview-crypto">
  <WebViewCrypto:WebViewCrypto />
  ...
</Page>
```

Now, in any of your code, you can access `window.Crypto`, just like you would
in a browser.

You can look at an [example repo](https://github.com/saulshanabrook/nativescript-webview-crypto-example)
running [this example for symmetric encryption](https://blog.engelke.com/2014/06/22/symmetric-cryptography-in-the-browser-part-1/)
in NativeScript.
