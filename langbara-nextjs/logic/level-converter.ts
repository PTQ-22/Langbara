export const levelConverter = (numberLevel: number): string | undefined => {
  switch (numberLevel) {
    case 0:
      return "A1";
    case 1:
      return "A2";
    case 2:
      return "B1";
    case 3:
      return "B2";
    case 4:
      return "C1";
    case 5:
      return "C2";
    default:
      return undefined;
  }
};
