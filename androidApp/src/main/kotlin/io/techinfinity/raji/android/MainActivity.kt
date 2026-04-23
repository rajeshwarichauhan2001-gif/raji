package io.techinfinity.raji.android

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import io.techinfinity.raji.ui.App

/**
 * Phase-0 entry point. Single-activity, Compose-only. Edge-to-edge by
 * default per UI-UX-PRINCIPLES.md ("no status bar background").
 *
 * Real app bootstrap (ViewModel providers, navigation host, deep-link
 * handling, foreground-service binding) will be added in Phase 1.
 */
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            App()
        }
    }
}
