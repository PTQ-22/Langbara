import { NextPageContext } from "next";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import ReactModal from "react-modal";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import SearchBar from "../../components/SearchBar/SearchBar";
import WordForm from "../../components/WordForm/WordForm";
import { getAdminData } from "../../logic/admin-cookies";
import { levelConverter } from "../../logic/level-converter";
import { createNormalHintsArray } from "../../logic/task-calendar";
import { fetchWords, fetchWordsCount, setWordEnable } from "../../logic/words";
import {
  StyledTable,
  TableContainer,
} from "../../components/StyledTable/StyledTable.styles";
import { YellowButton } from "../../styles/register/register.styles";
import { EMPTY_WORD, WordEntry, WordFormValues } from "../../types/word";
import { saveWord } from "../../logic/words";
import { PaginateWrapper } from "../../styles/admin/wordslist.styles";
import {
  changeIncludeInSearch,
  changeIncludeInSearchToRequestFormat,
  IncludeInSearch,
} from "../../types/includeInSearch";
import useSort, { SortingBy, SortingHow } from "../../hooks/useSort";
import useModal from "../../hooks/useModal";
import ReactPaginate from "react-paginate";
import { CheckBox } from "../../components/CheckBox/CheckBox";

interface WordListProps {
  words: WordEntry[];
  wordsCnt: number;
  adminName: string;
}

const WORDS_PER_PAGE = 100;

ReactModal.setAppElement("#__next");

const WordsList = ({ adminName, words, wordsCnt }: WordListProps) => {
  const [wordslist, setWordslist] = useState<WordEntry[]>(words);
  const [wordsCount, setWordsCount] = useState<number>(wordsCnt);
  const [searchText, setSearchText] = useState<string>("");
  const [isEnabled, setIsEnabled] = useState<IncludeInSearch>(
    IncludeInSearch.DEFALUT
  );
  const [isIsDaily, setIsIsDaily] = useState<IncludeInSearch>(
    IncludeInSearch.DEFALUT
  );
  const [currentWord, setCurrentWord] = useState<WordEntry>(EMPTY_WORD);
  const [message, setMessage] = useState<string>("");
  const pageCount = Math.ceil(wordsCount / WORDS_PER_PAGE);
  const [paginationOffset, setPaginationOffset] = useState<number>(0);
  const { sortHow, sortedBy, handleSortClick } = useSort();
  const { modalIsOpen, closeModal, openModal } = useModal();
  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const wordsData = await fetchWords({
        search: searchText,
        offset: paginationOffset.toString(),
        limit: WORDS_PER_PAGE.toString(),
        enabled: changeIncludeInSearchToRequestFormat(isEnabled),
        isDaily: changeIncludeInSearchToRequestFormat(isIsDaily),
        orderBy: sortedBy,
        descending: sortHow === SortingHow.DESC ? true : undefined,
      });
      const wordsCountData = await fetchWordsCount({
        search: searchText,
        enabled: changeIncludeInSearchToRequestFormat(isEnabled),
        isDaily: changeIncludeInSearchToRequestFormat(isIsDaily),
      });
      setWordslist(wordsData);
      setWordsCount(wordsCountData);
    })();
  }, [searchText, isEnabled, isIsDaily, sortedBy, sortHow, paginationOffset, refreshFlag]);

  const onSubmit: SubmitHandler<WordFormValues> = async ({
    word,
    definition_en,
    definition_pl,
    level,
    part,
    hints,
  }: WordFormValues) => {
    const wordToSave: WordEntry = {
      id: currentWord.id,
      word,
      definition_pl,
      definition_en,
      lvl: parseInt(level),
      is_daily: currentWord.is_daily,
      enabled: currentWord.enabled,
      data: { hints: createNormalHintsArray(hints), part },
    };
    await saveWord(wordToSave);
    setRefreshFlag(!refreshFlag);
    setMessage("Zapisano słowo!");
    setTimeout(() => setMessage(""), 3000);
  };

  const handlePageClick = (e: any) => {
    const newOffset = (e.selected * WORDS_PER_PAGE) % wordsCount;
    setPaginationOffset(newOffset);
  };

  const handleCheckboxChange = (wordId: string, state: boolean) => {
    setWordEnable(wordId, state);
  }

  return (
    <AdminLayout adminName={adminName} header={"Words List"}>
      <SearchBar text={searchText} onChange={setSearchText} />
      <PaginateWrapper>
        <ReactPaginate pageCount={pageCount} onPageChange={handlePageClick} previousLabel=" < " nextLabel=" > " />
      </PaginateWrapper>
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <th></th>
              <th>
                Słowo{" "}
                <YellowButton onClick={() => handleSortClick(SortingBy.WORD)}>
                  Change Sort
                </YellowButton>{" "}
                sort: {sortedBy === SortingBy.WORD ? sortHow : SortingHow.DEFAULT}
              </th>
              <th>Część zdania</th>
              <th>Definicja PL</th>
              <th>Definicja EN</th>
              <th>
                Sprawdzone{" "}
                <YellowButton
                  onClick={() => setIsEnabled(changeIncludeInSearch(isEnabled))}
                >
                  filter: {isEnabled}
                </YellowButton>
              </th>
              <th>
                Is_daily{" "}
                <YellowButton
                  onClick={() => setIsIsDaily(changeIncludeInSearch(isIsDaily))}
                >
                  filter: {isIsDaily}
                </YellowButton>
              </th>
              <th>
                Poziom{" "}
                <YellowButton onClick={() => handleSortClick(SortingBy.LVL)}>
                  Change Sort
                </YellowButton>
                Sort: {sortedBy === SortingBy.LVL ? sortHow : SortingHow.DEFAULT}
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {wordslist.map((word, i) => (
              <tr key={word.id}>
                <td>{i + 1 + paginationOffset}</td>
                <td>{word.word}</td>
                <td>{word.data.part}</td>
                <td>{word.definition_pl}</td>
                <td>{word.definition_en}</td>
                <td>
                  <CheckBox initialState={word.enabled} onChange={(state) => {
                    handleCheckboxChange(word.id, state);
                  }}/>
                </td>
                <td>{word.is_daily ? "Tak" : "Nie"}</td>
                <td>{levelConverter(word.lvl)}</td>
                <td>
                  <YellowButton
                    onClick={() => {
                      openModal();
                      setCurrentWord(word);
                    }}
                  >
                    Edytuj
                  </YellowButton>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
          content: {
            background: "linear-gradient(90deg, #19535f 0%, #0f292d 75.52%)",
          },
        }}
      >
        <WordForm word={currentWord} onSubmit={onSubmit} message={message} />
      </ReactModal>
    </AdminLayout>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const admin = await getAdminData(ctx);

  if (!admin.isLoggedIn) {
    return {
      redirect: {
        permanent: false,
        destination: "/admin/login",
      },
    };
  }

  const words: WordEntry[] = await fetchWords({
    limit: WORDS_PER_PAGE.toString(),
  });
  const wordsCount: number = await fetchWordsCount({});
  return {
    props: {
      adminName: admin.name,
      words,
      wordsCnt: wordsCount,
    },
  };
}

export default WordsList;
