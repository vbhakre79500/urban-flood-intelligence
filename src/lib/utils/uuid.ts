/**
 * RFC 9562 Compliant UUIDv7 Generator
 * Provides time-ordered, sortable UUIDs with millisecond precision
 * for optimal database indexing performance.
 */
export function generateUUIDv7(): string {
  const timestamp = Date.now();
  const randomBytes = new Uint8Array(10);
  crypto.getRandomValues(randomBytes);

  // 48-bit timestamp in milliseconds
  const timeHex = timestamp.toString(16).padStart(12, "0");

  // 12-bit sequence / random + 4-bit version (0x7)
  const rand0 = (randomBytes[0] ?? 0);
  const rand1 = (randomBytes[1] ?? 0);
  const randA = ((rand0 & 0x0f) << 8) | rand1;
  const verAndRand = `7${randA.toString(16).padStart(3, "0")}`;

  // 2-bit variant (0b10) + 62-bit random
  const rand2 = (randomBytes[2] ?? 0);
  const variantByte = (rand2 & 0x3f) | 0x80;
  const variantHex = variantByte.toString(16).padStart(2, "0");

  let remainingHex = "";
  for (let i = 3; i < 10; i++) {
    remainingHex += (randomBytes[i] ?? 0).toString(16).padStart(2, "0");
  }

  const p1 = timeHex.slice(0, 8);
  const p2 = timeHex.slice(8, 12);
  const p3 = verAndRand;
  const p4 = `${variantHex}${remainingHex.slice(0, 2)}`;
  const p5 = remainingHex.slice(2);

  return `${p1}-${p2}-${p3}-${p4}-${p5}`;
}

/**
 * Validates whether a string is a valid UUID (v4 or v7)
 */
export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-7][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}
