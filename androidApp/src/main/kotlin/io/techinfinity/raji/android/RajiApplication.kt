package io.techinfinity.raji.android

import android.app.Application

/**
 * Process-wide initialization hook.
 *
 * Phase 0: intentionally empty. Coming additions (phase 1):
 *   - Sentry init (see expert-knowledge/11-debugging-observability.md)
 *   - PostHog init (self-hosted, see PERF-BUDGET §SDK bloat avoidance)
 *   - DI container (Koin) setup
 *   - WorkManager heartbeat schedule for OEM self-recovery
 */
class RajiApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        // TODO(phase1): observability, DI, heartbeat WorkManager.
    }
}
