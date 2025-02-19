export enum IncludeInSearch {
  DEFALUT = "none",
  YES = "yes",
  NO = "no",
}

export const changeIncludeInSearch = (
  current: IncludeInSearch
): IncludeInSearch => {
  if (current === IncludeInSearch.DEFALUT) {
    return IncludeInSearch.YES;
  } else if (current === IncludeInSearch.YES) {
    return IncludeInSearch.NO;
  }
  return IncludeInSearch.DEFALUT;
};

export const changeIncludeInSearchToRequestFormat = (current: IncludeInSearch): string => {
  if (current === IncludeInSearch.NO) return "false";
  else if (current === IncludeInSearch.YES) return "true";
  return "";
  
}