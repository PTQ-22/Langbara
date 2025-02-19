import { useState } from "react";

export enum SortingBy {
  WORD = "word",
  LVL = "lvl",
  NONE = "",
}

export enum SortingHow {
  DEFAULT = "none",
  ASC = "A->Z",
  DESC = "Z->A",
}

const useSort = (): {
  sortedBy: SortingBy;
  sortHow: SortingHow;
  handleSortClick: (sortBy: SortingBy) => Promise<void>;
} => {
  const [sortedBy, setSortedBy] = useState<SortingBy>(SortingBy.NONE);
  const [sortHow, setSortHow] = useState<SortingHow>(SortingHow.DEFAULT);

  const handleSortClick = async (sortBy: SortingBy) => {
    if (sortHow === SortingHow.ASC && sortBy === sortedBy) {
      setSortHow(SortingHow.DESC);
    } else if (sortHow === SortingHow.DESC && sortBy === sortedBy) {
      setSortHow(SortingHow.DEFAULT);
      setSortedBy(SortingBy.NONE);
    } else {
      setSortedBy(sortBy);
      setSortHow(SortingHow.ASC);
    }
  };

  return {
    sortedBy,
    sortHow,
    handleSortClick,
  };
};

export default useSort;
