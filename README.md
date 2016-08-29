# react-native-webview-crypto

[![npm](https://img.shields.io/npm/v/react-native-webview-crypto.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/react-native-webview-crypto)
[![Dependency Status](https://dependencyci.com/github/saulshanabrook/react-native-webview-crypto/badge)](https://dependencyci.com/github/saulshanabrook/react-native-webview-crypto)

This brings `window.Crypto` to your React Native application. It does this
by communicating with a hidden WebView, which performs the actual
computation.


## Why does this exist?

The [Web Cryptography API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
is [implemented in all major browsers](http://caniuse.com/#feat=cryptography)
and provides performant and secure way of doing client side encryption in
JavaScript. However, it is not supported in NativeScript.

Luckily, iOS and Android browsers do support this API.
This library makes use of their implementations. It creates a hidden WebView
and communicates with it asynchronously. It sets the global `crypto`
variable to an object that fulfills the [`Crypto`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto)
interface, so that you can transparently use `window.crypto` the same as you
would on on a browser.

This is as secure as using `window.crypto` in your browser on a mobile device.

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

## Caveats

### `getRandomValues`

Since this uses an asynchronous bridge to execute the crypto logic it
can't quite execute `crypto.getRandomValues` correctly, because that method
returns a value synchronously. It is simply *impossible* (as far as I know,
please let me know if there any ways to get around this) to wait for the
bridge to respond asynchronously before returning a value.

Instead, we return you a promise that resolves to a `TypedArray`.
We also accept these promises on all `crypto.subtle` methods that takes in
`TypedArray`s, to make it transparent and will automatically wait for
them to resolve before asking the WebView execute the method.

### `CryptoKey`
Since `JavaScriptCore`
does not support `window.Crypto`, it also doesn't have a `CryptoKey` interface.
So instead of returning an actual `CryptoKey` from
[`subtle.generateKey()`](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey)
we instead return an object that confirms to the `CryptoKey` interface and has
a `_jwk` property that has the value of the key exported as `jwk`. This allows
you to treat the `CryptoKey` as you would normally, and whenever you need to use
it in some `subtle` method, we will automatically convert it back to a real
`CryptoKey` from the `_jwk` string and the metadata.
