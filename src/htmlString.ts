import {webViewWorkerString} from "webview-crypto";
import nativeScriptWebViewInterfaceString from "./nativeScriptWebViewInterfaceString";

export default `
<html>
  <head></head>
  <body>
    <script>
      // load the NativeScript WebView Interface communcation
      // provides nsWebViewInterface
      ${nativeScriptWebViewInterfaceString}

      // load the cyrpto WebView Worker
      // procides WebViewWorker
      ${webViewWorkerString}

      // Hook them up, so the worker runs on WebView communcation.
      function sendToMain(message) {
        window.nsWebViewInterface.emit('_', message);
      }
      var wvw = new WebViewWorker(sendToMain);

      window.nsWebViewInterface.on('_', function(message){
        wvw.onMainMessage(message);
      });
    </script>
  </body>
</html>
`;
