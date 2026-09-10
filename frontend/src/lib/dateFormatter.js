//Convert the date object to a string formatted as so:
export function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}