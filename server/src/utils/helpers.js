export function formatDate(date) {
  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function timeRemaining(endTime) {
  const diff =
    new Date(endTime) - new Date();

  if (diff <= 0) return "Ended";

  const h = Math.floor(
    diff / 3600000
  );

  const m = Math.floor(
    (diff % 3600000) / 60000
  );

  if (h > 48)
    return `${Math.floor(
      h / 24
    )}d remaining`;

  if (h > 0)
    return `${h}h ${m}m remaining`;

  return `${m}m remaining`;
}

export function timeUntilStart(startTime) {
  const diff =
    new Date(startTime) - new Date();

  if (diff <= 0)
    return "Starting soon";

  const d = Math.floor(
    diff / 86400000
  );

  const h = Math.floor(
    (diff % 86400000) / 3600000
  );

  const m = Math.floor(
    (diff % 3600000) / 60000
  );

  if (d > 0)
    return `Starts in ${d}d ${h}h`;

  if (h > 0)
    return `Starts in ${h}h ${m}m`;

  return `Starts in ${m}m`;
}

export function getInitials(
  name = ""
) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}