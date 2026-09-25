/**
 * Formats a Rupiah amount using Indonesian thousands separators.
 * `formatRupiah(1425000n)` -> `"Rp 1.425.000"`.
 */
export function formatRupiah(amount: bigint | number): string {
  const value =
    typeof amount === "bigint" ? amount : BigInt(Math.round(amount));
  return `Rp ${value.toLocaleString("id-ID")}`;
}

/** Formats a backend nanosecond timestamp as an Indonesian long date. */
export function formatDate(timestamp: bigint): string {
  const date = new Date(Number(timestamp / 1_000_000n));
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
