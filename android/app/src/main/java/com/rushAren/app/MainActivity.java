package com.rusharena.app;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Access the WebView after Capacitor creates it
        this.bridge.getWebView().post(() -> {
            WebView webView = this.bridge.getWebView();
            WebSettings webSettings = webView.getSettings();

            String defaultUA = webSettings.getUserAgentString();
            String customUA = defaultUA + " RushArenaApp";

            webSettings.setUserAgentString(customUA);

            // Optional: Log for debugging
            android.util.Log.d("USER_AGENT", "Updated UA: " + customUA);
        });
    }
}
