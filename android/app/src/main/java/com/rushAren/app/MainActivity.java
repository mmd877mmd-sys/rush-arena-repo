package com.rusharena.app;

import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Create a temporary WebView to modify its settings
        WebView webView = new WebView(this);
        WebSettings webSettings = webView.getSettings();

        // Get the default user agent and append your custom tag
        String defaultUA = webSettings.getUserAgentString();
        webSettings.setUserAgentString(defaultUA + " RushArenaApp");

        // Optional: Log it for debugging
        android.util.Log.d("USER_AGENT", webSettings.getUserAgentString());
    }
}
