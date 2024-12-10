import calcBillingPeriods, { nearestNextValidDate, nearestPrevValidDate } from "./common";

describe("calcBillingPeriods", () => {
  test("returns correct billing periods for valid inputs", () => {

    const cutoffDate = 15;
    const periodYear = "2024";
    const result = calcBillingPeriods(cutoffDate, periodYear);

    expect(result).toHaveLength(12);

    expect(result[0]).toHaveProperty("start_date");
    expect(result[0]).toHaveProperty("end_date");
    expect(result[0]).toHaveProperty("month");

    result.forEach((period) => {
      expect(period.start_date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(period.end_date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(period.month).toMatch(/^\d{4}-\d{2}-01$/);
    });
  });

  test("returns false for invalid year format", () => {
    const cutoffDate = 15;
    const periodYear = "24";
    expect(calcBillingPeriods(cutoffDate, periodYear)).toBe(false);
  });

  test("returns false for invalid cutoff date range", () => {
    const periodYear = "2024";
    expect(calcBillingPeriods(0, periodYear)).toBe(false);
    expect(calcBillingPeriods(32, periodYear)).toBe(false);
  });

  test("handles edge cases for January and December correctly", () => {
    const cutoffDate = 31;
    const periodYear = "2024";
    const result = calcBillingPeriods(cutoffDate, periodYear);

    const decemberPeriod = result[11];
    expect(decemberPeriod.start_date).toMatch(/2024-12-\d{2}/);
    expect(decemberPeriod.end_date).toMatch(/2024-12-31/);

    const januaryPeriod = result[0];
    expect(januaryPeriod.start_date).toMatch(/2023-12-\d{2}/);
    expect(januaryPeriod.end_date).toMatch(/2024-01-31/);
  });

  test("throws error for invalid date format in helper functions", () => {
    const invalidDate = "invalid-date";
    expect(() => {
      nearestNextValidDate(invalidDate);
    }).toThrowError(`Invalid date provided: ${invalidDate}`);

    expect(() => {
      nearestPrevValidDate(invalidDate);
    }).toThrowError(`Invalid date provided: ${invalidDate}`);
  });

  test("handles leap year correctly", () => {
    const cutoffDate = 29;
    const periodYear = "2024";
    const result = calcBillingPeriods(cutoffDate, periodYear);

    const februaryPeriod = result[1];
    expect(februaryPeriod.start_date).toMatch(/2024-01-\d{2}/);
    expect(februaryPeriod.end_date).toMatch(/2024-02-29/);
  });

  test("handles non-leap year February correctly", () => {
    const cutoffDate = 28;
    const periodYear = "2023";
    const result = calcBillingPeriods(cutoffDate, periodYear);

    const februaryPeriod = result[1];
    expect(februaryPeriod.start_date).toMatch(/2023-01-\d{2}/);
    expect(februaryPeriod.end_date).toMatch(/2023-02-28/);
  });
});
