export function getGoogleCredentials() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON!;
  try {
    return JSON.parse(raw);
  } catch {
    // Some hosting env-var panels mangle raw JSON (stray escape chars on braces).
    // Fall back to base64-decoding the value.
    return JSON.parse(Buffer.from(raw, "base64").toString("utf8"));
  }
}
