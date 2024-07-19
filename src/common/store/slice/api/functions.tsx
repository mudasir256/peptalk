function objectToQueryParams<T extends Record<string, string>>(obj: T) {
  const params = new URLSearchParams(obj);
  return params.toString();
}

export { objectToQueryParams };
