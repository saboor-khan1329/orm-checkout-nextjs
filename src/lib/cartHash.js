export function createCartHash(items = []) {
  return JSON.stringify(
    items.map((i) => ({
      id: i.id,
      q: i.quantity,
      p: i.price,
    })),
  );
}
