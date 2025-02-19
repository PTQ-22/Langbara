import AdminLayout from "../../components/AdminLayout/AdminLayout";
import {
  ButtonColumnWrapper,
  CalendarColumn,
  CalendarWrapper,
  TaskDot,
  Wrapper,
} from "../../styles/admin/taskcalendar.styles";
import Calendar, { ViewCallbackProperties } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import {
  YellowButton,
} from "../../styles/register/register.styles";
import { getAdminData } from "../../logic/admin-cookies";
import { NextPageContext } from "next";
import { EMPTY_WORD, WordEntry, WordEntryWithDate, WordFormValues } from "../../types/word";
import { createNormalHintsArray, fetchOnDateWord, newDaily, fetchNewDates } from "../../logic/task-calendar";
import { SubmitHandler } from "react-hook-form";
import { saveWord } from "../../logic/words";
import WordForm from "../../components/WordForm/WordForm";


interface TaskCalendarProps {
  adminName: string;
}

const TaskCalendar = (props: TaskCalendarProps) => {

  // careful here! currentDate will be date of your local YEAR-MONTH-DAY 00:00
  // meaning when admin with polish timezone clicks 14-01-2023 currentDate will be set to '13-01-2023 23:00:00 UTC'
  // server is expecting 14-01-2023 00:00:00 UTC so we have to convert it!
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const [word, setWord] = useState<WordEntry>(EMPTY_WORD);
  const [message, setMessage] = useState<string>("");
  const [wordId, setWordId] = useState<string>("");
  const [dateData, setDateData] = useState<string[]>([]);
  const [calendarStartDate, setCalendarStartDate] = useState<Date>(new Date());

  const checkIfWordIsSetForDate = (date: Date) => {
    return dateData.includes(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)
  }

  const handleGenerateClick = async () => {
    const word = await newDaily(currentDate);
    setWord(word);
    setMessage("Wygenerowano słowo!");
    setTimeout(() => setMessage(""), 3000);
  };

  const onSubmit: SubmitHandler<WordFormValues> = async ({
    word,
    definition_en,
    definition_pl,
    level,
    part,
    hints,
  }: WordFormValues) => {
    const convertedDate = new Date(0);
    convertedDate.setUTCDate(currentDate.getDate());
    convertedDate.setUTCMonth(currentDate.getMonth());
    convertedDate.setUTCFullYear(currentDate.getFullYear());

    const wordToSave: WordEntryWithDate = {
      date: convertedDate.toDateString(),
      id: wordId,
      word,
      definition_pl,
      definition_en,
      lvl: parseInt(level),
      is_daily: true,
      enabled: false,
      data: { hints: createNormalHintsArray(hints), part }
    };
    await saveWord(wordToSave);
    setMessage("Zapisano słowo!");
    setTimeout(() => setMessage(""), 3000);

    const addedDate = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`;
    dateData.push(addedDate);
    setDateData(dateData);
  };

  useEffect(() => {
    console.log(currentDate);
    (async () => {

      const convertedDate = new Date(0);
      convertedDate.setUTCDate(currentDate.getDate());
      convertedDate.setUTCMonth(currentDate.getMonth());
      convertedDate.setUTCFullYear(currentDate.getFullYear());

      const word = await fetchOnDateWord(convertedDate);
      setWord(word);
    })();
  }, [currentDate]);

  useEffect(() => {
    (async () => {
      setDateData(await fetchNewDates(calendarStartDate))
    })();
  }, [calendarStartDate]);

  useEffect(() => {
    setWordId(word.id);
  }, [word]);

  return (
    <AdminLayout adminName={props.adminName} header={"Kalendarz"}>
      <Wrapper>
        <CalendarColumn>
          <CalendarWrapper>
            <Calendar
              onChange={setCurrentDate}
              value={currentDate}
              locale="pl"
              onActiveStartDateChange={({activeStartDate}: ViewCallbackProperties) => {
                setCalendarStartDate(activeStartDate)
              }}
              showNeighboringMonth={false}
              tileContent={({ date, view }) =>
                view === "month" && checkIfWordIsSetForDate(date) ? (
                  <TaskDot key={date.toDateString()} isTask>o</TaskDot>
                ) : (
                  <TaskDot key={date.toDateString()}>
                    o
                  </TaskDot>
                )
              }
            />
          </CalendarWrapper>
        </CalendarColumn>
        <WordForm word={word} currentDate={currentDate} onSubmit={onSubmit} message={message} />
        <ButtonColumnWrapper>
          <YellowButton onClick={handleGenerateClick}>
            Generuj słowo
          </YellowButton>
        </ButtonColumnWrapper>
      </Wrapper>
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

  return {
    props: {
      adminName: admin.name,
    },
  };
}

export default TaskCalendar;
