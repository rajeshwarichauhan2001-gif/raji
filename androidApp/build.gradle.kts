// :androidApp — Android application module.
// Dual-track build (D-06 / D-19): `lite` (Play Store) + `pro` (sideload)
// flavors under the single parent app ID "io.techinfinity.raji".
//
// Rationale:
//   - Different application IDs so both can be installed side-by-side.
//   - Lite strips CALL_PHONE, SEND_SMS, QUERY_ALL_PACKAGES, AccessibilityService
//     (Play Store safe per expert-knowledge/03-play-store-policy.md).
//   - Pro declares everything for sideload distribution.
//
// APK size kill threshold <= 22 MB per raji-research/PERFORMANCE-BUDGET.md.

plugins {
    alias(libs.plugins.androidApplication)
    alias(libs.plugins.kotlinAndroid)
    alias(libs.plugins.composeMultiplatform)
    alias(libs.plugins.composeCompiler)
}

android {
    namespace = "io.techinfinity.raji"
    compileSdk = libs.versions.android.compileSdk.get().toInt()

    defaultConfig {
        applicationId = "io.techinfinity.raji"
        minSdk = libs.versions.android.minSdk.get().toInt()
        targetSdk = libs.versions.android.targetSdk.get().toInt()
        versionCode = 1
        versionName = "0.1.0-phase0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables { useSupportLibrary = true }
    }

    // Dual-track flavor setup (D-19).
    flavorDimensions += "track"
    productFlavors {
        create("lite") {
            dimension = "track"
            applicationIdSuffix = ".lite"
            versionNameSuffix = "-lite"
            // Play Store track: minimal permission surface.
            // AndroidManifest under src/lite/ declares the reduced permission set.
            manifestPlaceholders["appLabel"] = "Raji Lite"
            manifestPlaceholders["trackId"] = "lite"
            buildConfigField("String", "TRACK", "\"lite\"")
            buildConfigField("boolean", "HAS_ACCESSIBILITY_SERVICE", "false")
            buildConfigField("boolean", "HAS_CALL_SMS", "false")
            buildConfigField("boolean", "HAS_QUERY_ALL_PACKAGES", "false")
        }
        create("pro") {
            dimension = "track"
            applicationIdSuffix = ".pro"
            versionNameSuffix = "-pro"
            // Sideload track: full permissions including AccessibilityService.
            manifestPlaceholders["appLabel"] = "Raji Pro"
            manifestPlaceholders["trackId"] = "pro"
            buildConfigField("String", "TRACK", "\"pro\"")
            buildConfigField("boolean", "HAS_ACCESSIBILITY_SERVICE", "true")
            buildConfigField("boolean", "HAS_CALL_SMS", "true")
            buildConfigField("boolean", "HAS_QUERY_ALL_PACKAGES", "true")
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro",
            )
            // Signing config intentionally unset — CI / release pipeline supplies
            // Play App Signing (Lite) or EV-cert-based signing (Pro) later.
        }
        debug {
            // Fast dev loop; no minification.
            isMinifyEnabled = false
        }
    }

    buildFeatures {
        compose = true
        buildConfig = true
    }

    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
            excludes += "META-INF/versions/9/previous-compilation-data.bin"
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }

    // Only ship languages we actually support (D-07: Hindi + English Phase 1).
    // Keeps resource-shrink output smaller — helps APK <=22 MB.
    androidResources {
        @Suppress("UnstableApiUsage")
        localeFilters += listOf("en", "hi")
    }
}

dependencies {
    implementation(projects.shared)
    implementation(projects.composeApp)

    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.appcompat)
    implementation(libs.androidx.activity.compose)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.lifecycle.viewmodel.compose)
    implementation(libs.kotlinx.coroutines.android)

    implementation(compose.runtime)
    implementation(compose.foundation)
    implementation(compose.material3)
    implementation(compose.ui)
}
