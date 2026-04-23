package io.techinfinity.raji.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import io.techinfinity.raji.Greeting
import io.techinfinity.raji.ui.theme.RajiTheme

/**
 * Root Composable for Raji's Phase-0 scaffold.
 *
 * Shows the "Namaste Raji" greeting using the theme tokens from
 * raji-research/UI-UX-PRINCIPLES.md:
 *   - Dark default (78% of Indian users prefer; OLED battery win).
 *   - Deep violet primary (#6750A4), warm gold accent (#FFD166),
 *     near-black surface (#0E0E11).
 *   - Material 3.
 *
 * This is deliberately minimal: real screens (Home waveform, Onboarding,
 * Memory dashboard, Device panel, Settings) will be added in Phase 1 per
 * MASTER-ARCHITECTURE.md §4.
 */
@Composable
fun App() {
    RajiTheme {
        Surface(
            modifier = Modifier.fillMaxSize(),
            color = MaterialTheme.colorScheme.background,
        ) {
            Box(
                modifier = Modifier.fillMaxSize().padding(24.dp),
                contentAlignment = Alignment.Center,
            ) {
                Column(
                    verticalArrangement = Arrangement.spacedBy(12.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                ) {
                    Text(
                        text = "Namaste Raji 👋",
                        style = MaterialTheme.typography.displayMedium.copy(
                            fontWeight = FontWeight.SemiBold,
                        ),
                        color = MaterialTheme.colorScheme.primary,
                    )
                    Text(
                        text = Greeting().greet(),
                        style = MaterialTheme.typography.bodyLarge,
                        color = MaterialTheme.colorScheme.onBackground,
                    )
                    Text(
                        text = "Hi boliye",
                        style = MaterialTheme.typography.titleMedium,
                        color = MaterialTheme.colorScheme.secondary,
                    )
                }
            }
        }
    }
}
