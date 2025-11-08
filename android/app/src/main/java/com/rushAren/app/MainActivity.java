package com.rusharena.app;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Load your deployed Vercel site instead of local files
        this.getBridge().loadUrl("https://www.rusharena.club/");
    }
}
