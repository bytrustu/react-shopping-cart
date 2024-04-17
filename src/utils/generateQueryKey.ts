const PRIMARY_KEY = 'GENERATED_BY_QUERY_KEY';

export const generateQueryKey =
  <Parameter extends object>(page: string, name: string) =>
  (parameter?: Parameter) =>
    parameter ? [PRIMARY_KEY, page, name, JSON.stringify(parameter)] : [PRIMARY_KEY, page, name];
