export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function prettyUrl(url) {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    return `${parsed.hostname}${parsed.pathname !== "/" ? parsed.pathname : ""}`;
  } catch {
    return url;
  }
}

export default cn;
