// Raji — settings.gradle.kts
// Monorepo root settings. Module graph is strictly one-directional per D-18.
// See: raji-research/MASTER-ARCHITECTURE.md §3 and
//      raji-research/terminal-1-frameworks/project-structure.md §4.

rootProject.name = "raji"

// Typesafe project accessors (Gradle 8.x) — lets modules say
// `implementation(projects.shared)` instead of `project(":shared")`.
enableFeaturePreview("TYPESAFE_PROJECT_ACCESSORS")

pluginManagement {
    repositories {
        google {
            content {
                includeGroupByRegex("com\\.android.*")
                includeGroupByRegex("com\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }
        mavenCentral()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    // PREFER_SETTINGS so module build.gradle.kts can't smuggle in rogue repos.
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google {
            content {
                includeGroupByRegex("com\\.android.*")
                includeGroupByRegex("com\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }
        mavenCentral()
        // Compose Multiplatform artifacts are published to Maven Central;
        // no extra repo needed in Compose MP 1.7+.
    }
}

// Modules — see MASTER-ARCHITECTURE.md §3 Logical Architecture.
include(":shared")
include(":composeApp")
include(":androidApp")
include(":desktopApp")
