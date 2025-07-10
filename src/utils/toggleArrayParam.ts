export const toggleArrayParam = (searchParams: URLSearchParams, key: string, value: string) : URLSearchParams => {
  const values = searchParams.getAll(key);
  const exists = values.includes(value);

  const newParams = new URLSearchParams();

  searchParams.forEach((v, k) => {
    if(k !== key) {
      newParams.append(k, v);  // sao chep params old
    }
  });

  const newValues = exists ? values.filter(v => v != value) : [...values, value];
  newValues.forEach(v => newParams.append(key, v));   // cap nhat params moi

  return newParams;
}