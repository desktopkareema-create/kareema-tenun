import { formatDate, formatRupiah } from "@/lib/format";
import { describe, expect, it } from "vitest";

describe("formatRupiah", () => {
  it("formats a bigint amount with Indonesian thousands separators", () => {
    expect(formatRupiah(1425000n)).toBe("Rp 1.425.000");
  });

  it("formats a number amount the same way", () => {
    expect(formatRupiah(890000)).toBe("Rp 890.000");
  });

  it("formats zero", () => {
    expect(formatRupiah(0n)).toBe("Rp 0");
  });

  it("rounds a fractional number to whole Rupiah", () => {
    expect(formatRupiah(1425000.4)).toBe("Rp 1.425.000");
  });
});

describe("formatDate", () => {
  it("renders a backend nanosecond timestamp as an Indonesian long date", () => {
    // 1758326400000 ms -> 20 September 2025 (UTC).
    expect(formatDate(1758326400000000000n)).toBe("20 September 2025");
  });

  it("returns an em dash for an unrepresentable timestamp", () => {
    expect(formatDate(BigInt(Number.MAX_SAFE_INTEGER) * 1_000_000n)).toBe("—");
  });
});
