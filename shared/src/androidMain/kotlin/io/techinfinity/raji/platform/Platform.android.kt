package io.techinfinity.raji

import android.os.Build

private class AndroidPlatform : Platform {
    override val name: String = "Android ${Build.VERSION.RELEASE} (API ${Build.VERSION.SDK_INT})"
}

actual fun getPlatform(): Platform = AndroidPlatform()
