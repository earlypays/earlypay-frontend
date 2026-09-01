function insertSpacesBeforeCapitals(s: string): string {
  const t = s.trim();
  if (!t || t.includes(" ")) return t;
  return t.replace(/([a-z])([A-Z])/g, "$1 $2");
}

export function getGreetingName(
  user:
    | {
        first_name?: string;
        last_name?: string;
        email?: string;
      }
    | null
    | undefined,
): string {
  if (!user) return "there";
  const first = String(user.first_name ?? "").trim();
  if (first) return insertSpacesBeforeCapitals(first);
  const last = String(user.last_name ?? "").trim();
  if (last) return insertSpacesBeforeCapitals(last);
  const email = String(user.email ?? "");
  const local = email.includes("@") ? (email.split("@")[0]?.trim() ?? "") : "";
  if (local) return insertSpacesBeforeCapitals(local);
  return "there";
}
