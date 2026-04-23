// Raji — root build.gradle.kts
// Root is declarative-only: plugins are declared `apply false` so each module
// can opt-in without forcing the whole tree to carry the classpath.
//
// See raji-research/MASTER-ARCHITECTURE.md §1 (tech stack) and
// raji-research/terminal-1-frameworks/project-structure.md §4 (module graph).

plugins {
    alias(libs.plugins.kotlinMultiplatform) apply false
    alias(libs.plugins.kotlinAndroid) apply false
    alias(libs.plugins.androidApplication) apply false
    alias(libs.plugins.androidLibrary) apply false
    alias(libs.plugins.composeMultiplatform) apply false
    alias(libs.plugins.composeCompiler) apply false
}

// Cross-module convention: fail fast on any module adding an extra repo.
// Real repos live in settings.gradle.kts.
allprojects {
    // JVM toolchain target is locked at JDK 17 across all modules (D-17 / tech stack).
}
