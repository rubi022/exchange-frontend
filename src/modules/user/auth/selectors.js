export const selectSignInRequire2FA = (state) => state.user.auth.require2FA;
export const selectSignUpRequireVerification = (state) => state.user.auth.requireVerification;
export const selectEmailVerified = (state) => state.user.auth.emailVerified;
export const selectAuthError = (state) => state.user.auth.authError;
export const selectTempEmail= (state) => state.user.auth.email;

