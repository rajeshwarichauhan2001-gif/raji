package io.techinfinity.raji.desktop

import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.DpSize
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import androidx.compose.ui.window.rememberWindowState
import io.techinfinity.raji.ui.App

/**
 * Compose Desktop entry point.
 *
 * Phase 0 scaffold: single window showing the "Namaste Raji" greeting.
 * Phase 4 additions (see MASTER-ARCHITECTURE.md §4):
 *   - System tray + status icon
 *   - Global hotkey registration
 *   - IPC client to the Windows FlaUI / Linux zbus automation binaries
 *   - BLE presence + device arbitration (Q-03)
 */
fun main() = application {
    Window(
        onCloseRequest = ::exitApplication,
        title = "Raji",
        state = rememberWindowState(size = DpSize(480.dp, 720.dp)),
    ) {
        App()
    }
}
