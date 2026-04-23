package io.techinfinity.raji

/**
 * Canonical expect/actual example for the Phase-0 scaffold.
 *
 * Rule of thumb from project-structure.md §2:
 *   "If the interface needs more than 3 platform-specific methods, it is
 *    probably not shared logic — promote it out of :shared into a platform
 *    module."
 *
 * Real production expect/actuals we will add later (matching the same
 * pattern) include: AudioCapture, TTSEngine, WakeWordEngine, SecureStorage,
 * SystemControl.
 */
interface Platform {
    /** Short human-readable platform label, e.g. "Android 15 (API 35)" or "Desktop JVM 17". */
    val name: String
}

expect fun getPlatform(): Platform
