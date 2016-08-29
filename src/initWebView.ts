import webViewModule = require("ui/web-view");
import htmlString from "./htmlString";
import {MainWorker} from "webview-crypto";

declare function require(path: string): any;
const webViewInterfaceModule = require("nativescript-webview-interface");

export default function initWebView(webview: webViewModule.WebView) {
    const oWebViewInterface = new webViewInterfaceModule.WebViewInterface(webview, htmlString);

  const mw = new MainWorker(message => oWebViewInterface.emit("_", message), true);
  oWebViewInterface.on("_", function(eventData){
    mw.onWebViewMessage(eventData);
  });
  global.crypto = mw.crypto;
}
