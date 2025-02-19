type WordData = {
  hints: string[];
  part: string;
}

export interface WordEntry {
  id: string;
  word: string;
  definition_pl: string;
  definition_en: string;
  enabled?: boolean;
  is_daily?: boolean;
  lvl: number;
  data: WordData;
}

export interface WordEntryWithDate extends WordEntry{
  date: string;
}


export const EMPTY_WORD: WordEntry = {
  id: "",
  word: "",
  definition_en: "",
  definition_pl: "",
  enabled: false,
  lvl: 0,
  data: {
    hints: [],
    part: "noun"
  }
};


export interface WordFormValues {
  word: string;
  definition_en: string;
  definition_pl: string;
  part: string;
  level: string;
  hints: {
    content: string;
  }[];
}