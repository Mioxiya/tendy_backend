export function generateCombinations(attributes: Record<string, string[]>) {
  const keys = Object.keys(attributes);
  const result: Record<string, string>[] = [];

  function backtrack(index: number, current: Record<string, string>) {
    if (index === keys.length) {
      result.push({ ...current });
      return;
    }
    const key = keys[index];
    for (const value of attributes[key]) {
      current[key] = value;
      backtrack(index + 1, current);
    }
  }

  backtrack(0, {});
  return result;
}

export function normalizeCombination(comb: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(comb)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([k, v]) => [k.trim(), v.trim()]),
  );
}
