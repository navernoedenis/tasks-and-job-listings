export function excludeFields<TModel, TKey extends keyof TModel>(
  model: TModel,
  keys: TKey[],
) {
  const result = Object.entries(model).filter(
    ([key]) => !keys.includes(key as TKey),
  );

  return Object.fromEntries(result) as Omit<TModel, TKey>;
}
