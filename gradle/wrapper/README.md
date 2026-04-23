# Gradle wrapper

`gradle-wrapper.jar` is **not** checked in by this scaffolding step. It is a
binary ~60 KB file that Gradle itself produces. Generate it by running:

```bash
# From the repo root, with Gradle 8.11.1 installed:
gradle wrapper --gradle-version 8.11.1 --distribution-type bin
```

Or, easier: open the project in Android Studio once and it will pull the
wrapper jar automatically the first time `./gradlew` is invoked.

After the jar exists, `./gradlew <task>` works on Linux/macOS and
`gradlew.bat <task>` works on Windows.

The `gradle-wrapper.properties` in this directory already pins the Gradle
version (8.11.1). Do NOT bump it without coordinating with CI.
