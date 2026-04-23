# Raji — ProGuard / R8 rules
# Base rules. Library-specific rules come from the libraries' consumer-proguard.
# Keep aggressive — our APK <=22 MB target (PERFORMANCE-BUDGET.md) depends on R8 full mode.

# Kotlinx Serialization (retain @Serializable classes)
-keepattributes *Annotation*, InnerClasses
-dontnote kotlinx.serialization.AnnotationsKt

# Keep our app classes that are referenced by AndroidManifest
-keep class io.techinfinity.raji.android.MainActivity { *; }
-keep class io.techinfinity.raji.android.RajiApplication { *; }

# Compose — compiler emits classes with stable names needed by inspection tools
-keep class androidx.compose.runtime.** { *; }

# Remove Kotlin debug metadata to shave bytes
-assumenosideeffects class kotlin.jvm.internal.Intrinsics {
    public static void checkNotNull(...);
    public static void checkExpressionValueIsNotNull(...);
    public static void checkNotNullExpressionValue(...);
    public static void checkParameterIsNotNull(...);
    public static void checkReturnedValueIsNotNull(...);
    public static void checkFieldIsNotNull(...);
    public static void throwUninitializedPropertyAccessException(...);
    public static void throwNpe(...);
    public static void throwJavaNpe(...);
    public static void throwAssert(...);
    public static void throwIllegalArgument(...);
    public static void throwIllegalState(...);
}
