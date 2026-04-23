package io.techinfinity.raji.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Typography
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp

// =========================================================================
//  Raji Design Tokens — Phase 0 stub.
//
//  Source of truth: raji-research/UI-UX-PRINCIPLES.md §Foundation.
//  Decision: Material 3 Expressive, dark-default, dynamic color on Android 12+
//  with these fallbacks when dynamic color is unavailable:
//     primary:    #6750A4  (deep violet — approachable + premium)
//     secondary:  #FFD166  (warm gold — accent)
//     surface:    #0E0E11  (near-black — OLED-friendly)
//
//  Typography will move to Inter Variable + Noto Sans Devanagari Variable
//  once fonts are added to composeApp resources in Phase 1. Single variable
//  font file per family keeps APK below the <=22 MB target (D-25 / PERF-BUDGET).
// =========================================================================

// --- Core palette tokens ---------------------------------------------------

private val RajiViolet = Color(0xFF6750A4)        // primary
private val RajiVioletContainer = Color(0xFF4F378B)
private val RajiGold = Color(0xFFFFD166)          // secondary / accent
private val RajiGoldContainer = Color(0xFF604000)
private val RajiNearBlack = Color(0xFF0E0E11)     // surface (dark default)
private val RajiOnViolet = Color(0xFFFFFFFF)
private val RajiOnGold = Color(0xFF1F1400)
private val RajiOnSurfaceDark = Color(0xFFE6E1E9)
private val RajiSurfaceVariantDark = Color(0xFF1B1B20)
private val RajiBackgroundDark = Color(0xFF0E0E11)

// Light mode palette (used only when user explicitly opts out of dark).
private val RajiBackgroundLight = Color(0xFFFFFBFE)
private val RajiSurfaceLight = Color(0xFFFFFBFE)
private val RajiOnSurfaceLight = Color(0xFF1C1B1F)

// --- Color schemes ---------------------------------------------------------

private val DarkColors = darkColorScheme(
    primary = RajiViolet,
    onPrimary = RajiOnViolet,
    primaryContainer = RajiVioletContainer,
    onPrimaryContainer = RajiOnViolet,
    secondary = RajiGold,
    onSecondary = RajiOnGold,
    secondaryContainer = RajiGoldContainer,
    onSecondaryContainer = RajiGold,
    background = RajiBackgroundDark,
    onBackground = RajiOnSurfaceDark,
    surface = RajiNearBlack,
    onSurface = RajiOnSurfaceDark,
    surfaceVariant = RajiSurfaceVariantDark,
    onSurfaceVariant = RajiOnSurfaceDark,
)

private val LightColors = lightColorScheme(
    primary = RajiViolet,
    onPrimary = RajiOnViolet,
    primaryContainer = RajiVioletContainer,
    secondary = RajiGold,
    onSecondary = RajiOnGold,
    secondaryContainer = RajiGoldContainer,
    background = RajiBackgroundLight,
    onBackground = RajiOnSurfaceLight,
    surface = RajiSurfaceLight,
    onSurface = RajiOnSurfaceLight,
)

// --- Typography -----------------------------------------------------------
//
// Scale follows Material 3 defaults. Font-family is system-default for now;
// Phase 1 swaps to Inter Variable + Noto Sans Devanagari Variable via
// compose.components.resources.

private val RajiTypography = Typography(
    displayLarge = TextStyle(fontWeight = FontWeight.SemiBold, fontSize = 57.sp, lineHeight = 64.sp),
    displayMedium = TextStyle(fontWeight = FontWeight.SemiBold, fontSize = 45.sp, lineHeight = 52.sp),
    displaySmall = TextStyle(fontWeight = FontWeight.SemiBold, fontSize = 36.sp, lineHeight = 44.sp),
    headlineLarge = TextStyle(fontWeight = FontWeight.SemiBold, fontSize = 32.sp, lineHeight = 40.sp),
    headlineMedium = TextStyle(fontWeight = FontWeight.SemiBold, fontSize = 28.sp, lineHeight = 36.sp),
    headlineSmall = TextStyle(fontWeight = FontWeight.SemiBold, fontSize = 24.sp, lineHeight = 32.sp),
    titleLarge = TextStyle(fontWeight = FontWeight.Medium, fontSize = 22.sp, lineHeight = 28.sp),
    titleMedium = TextStyle(fontWeight = FontWeight.Medium, fontSize = 16.sp, lineHeight = 24.sp),
    titleSmall = TextStyle(fontWeight = FontWeight.Medium, fontSize = 14.sp, lineHeight = 20.sp),
    bodyLarge = TextStyle(fontWeight = FontWeight.Normal, fontSize = 16.sp, lineHeight = 24.sp),
    bodyMedium = TextStyle(fontWeight = FontWeight.Normal, fontSize = 14.sp, lineHeight = 20.sp),
    bodySmall = TextStyle(fontWeight = FontWeight.Normal, fontSize = 12.sp, lineHeight = 16.sp),
    labelLarge = TextStyle(fontWeight = FontWeight.Medium, fontSize = 14.sp, lineHeight = 20.sp),
    labelMedium = TextStyle(fontWeight = FontWeight.Medium, fontSize = 12.sp, lineHeight = 16.sp),
    labelSmall = TextStyle(fontWeight = FontWeight.Medium, fontSize = 11.sp, lineHeight = 16.sp),
)

// --- Theme entry point ----------------------------------------------------

/**
 * Applies the Raji Material 3 theme.
 *
 * @param useDarkTheme defaults to system setting, BUT Raji recommends dark
 *   mode as its preferred appearance (see UI-UX-PRINCIPLES.md).
 * @param useDynamicColor reserved for Android 12+ wallpaper-driven palette.
 *   Not yet wired — defaulted to false until we add androidMain hook.
 */
@Composable
fun RajiTheme(
    useDarkTheme: Boolean = isSystemInDarkTheme(),
    useDynamicColor: Boolean = false,
    content: @Composable () -> Unit,
) {
    val colors = if (useDarkTheme) DarkColors else LightColors
    MaterialTheme(
        colorScheme = colors,
        typography = RajiTypography,
        content = content,
    )
}
