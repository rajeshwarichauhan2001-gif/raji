// :desktopApp — Compose Multiplatform Desktop entry point.
// Targets Windows and Linux (NOT macOS per D-02 / D-03).
//
// Native Windows automation (FlaUI/UIA) and Linux automation (zbus) are
// separate binaries per MASTER-ARCHITECTURE.md §1 — this module is the UI
// shell that talks to them via local IPC. Phase 4 work.

import org.jetbrains.compose.desktop.application.dsl.TargetFormat
import org.jetbrains.kotlin.gradle.ExperimentalKotlinGradlePluginApi
import org.jetbrains.kotlin.gradle.dsl.JvmTarget

plugins {
    alias(libs.plugins.kotlinMultiplatform)
    alias(libs.plugins.composeMultiplatform)
    alias(libs.plugins.composeCompiler)
}

kotlin {
    @OptIn(ExperimentalKotlinGradlePluginApi::class)
    compilerOptions {
        jvmTarget.set(JvmTarget.JVM_17)
    }

    jvm {
        @OptIn(ExperimentalKotlinGradlePluginApi::class)
        compilerOptions {
            jvmTarget.set(JvmTarget.JVM_17)
        }
    }

    sourceSets {
        val jvmMain by getting {
            dependencies {
                implementation(projects.shared)
                implementation(projects.composeApp)
                implementation(compose.desktop.currentOs)
                implementation(libs.kotlinx.coroutines.swing)
            }
        }
        val jvmTest by getting {
            dependencies {
                implementation(kotlin("test"))
            }
        }
    }
}

compose.desktop {
    application {
        mainClass = "io.techinfinity.raji.desktop.MainKt"

        nativeDistributions {
            // D-02: Android + Windows + Linux. macOS intentionally omitted.
            targetFormats(
                TargetFormat.Msi,      // Windows installer
                TargetFormat.Exe,      // Windows portable
                TargetFormat.Deb,      // Debian/Ubuntu
                TargetFormat.Rpm,      // Fedora/RHEL
                TargetFormat.AppImage, // distro-agnostic Linux
            )
            packageName = "Raji"
            packageVersion = "0.1.0"
            description = "Raji — voice assistant (desktop companion)"
            copyright = "© 2026 Techinfinity"
            vendor = "Techinfinity"

            windows {
                // EV signing config wired in CI (MASTER-ARCHITECTURE.md §Signing).
                menuGroup = "Raji"
                upgradeUuid = "b9f0a0e2-7e54-4b10-8b7a-5a3a2a4e9d10"
            }
            linux {
                packageName = "raji"
                // systemd user unit gets dropped by the post-install hook in Phase 4.
            }
        }
    }
}
