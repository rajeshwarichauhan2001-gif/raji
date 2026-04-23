package io.techinfinity.raji

/**
 * Tiny sanity-check object for the Phase-0 scaffold. The scaffold only
 * needs to prove the KMP wiring works end-to-end: a commonMain class calls
 * a platform-specific [Platform] implementation, and the :composeApp UI
 * renders the string it produces.
 *
 * Real business logic (Claude client, intent router, conversation state
 * machine, etc.) will live in subpackages of [io.techinfinity.raji]:
 *   - ai/, conversation/, iot/, safety/, settings/, telemetry/, platform/
 * per raji-research/terminal-1-frameworks/project-structure.md §2.
 */
class Greeting {
    private val platform: Platform = getPlatform()

    /** Produces the "Namaste Raji" greeting shown on the home screen. */
    fun greet(): String = "Namaste Raji 👋 — running on ${platform.name}"
}
