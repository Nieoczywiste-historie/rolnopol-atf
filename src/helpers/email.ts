export function generateUniqueEmail(prefix = 'testuser'): string {
  return `${prefix}_${Date.now()}@example.com`;
}
