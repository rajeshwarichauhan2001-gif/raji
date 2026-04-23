package io.techinfinity.raji

private class DesktopPlatform : Platform {
    override val name: String =
        "Desktop ${System.getProperty("os.name")} / JVM ${System.getProperty("java.version")}"
}

actual fun getPlatform(): Platform = DesktopPlatform()
