import webViewModule = require("ui/web-view");
import initWebView from "./initWebView";

export class WebViewCrypto extends webViewModule.WebView {
  constructor() {
    super();
    initWebView(this);
  }
}
