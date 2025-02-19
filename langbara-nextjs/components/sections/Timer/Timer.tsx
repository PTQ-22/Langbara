import React, { useEffect, useState } from 'react'
import {
    Wrapper,
    TimerText,
    NumbersWrapper,
    BoldNumber
} from './Timer.styles';

const targetDate = new Date(2023, 1, 10);

const MS_PER_MINUTE = 60000;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;
const MS_PER_DAY = 24 * MS_PER_HOUR;

interface Ending {
  "single": string;
  "2-4": string;
  "5-0": string;
}

const words: any = {
  "godzina": {
    "single": "godzina",
    "2-4": "godziny",
    "5-0": "godzin"
  },
  "minuta": {
    "single": "minuta",
    "2-4": "minuty",
    "5-0": "minut"
  },
  "dzien": {
    "single": "dzień",
    "2-4": "dni",
    "5-0": "dni"
  }
}

function wordEnding(word: string, number: number) {
  const ending = words[word] as Ending;
  const last = number % 10;
  if(number >= 11 && number <= 14) {
    return ending['5-0'];
  }
  if(number === 1) {
    return ending.single;
  }
  if(last >= 2 && last <= 4) {
    return ending['2-4'];
  }
  return ending['5-0'];

};

export const Timer = () => {

  const [diff, setDiff] = useState(0);

  
  useEffect(() => {
    const date = new Date();
    const d = targetDate.getTime() - date.getTime();
    setDiff(d);

    setInterval(() => {
      const date = new Date();
      const d = targetDate.getTime() - date.getTime();
      setDiff(d);
    }, 30000);
  }, []);
  
  const days = Math.floor(diff / MS_PER_DAY);
  const hours = Math.floor((diff - MS_PER_DAY * days ) / MS_PER_HOUR);
  const minutes = Math.floor((diff - MS_PER_DAY * days - MS_PER_HOUR * hours) / MS_PER_MINUTE);

  return (
    <Wrapper>
        <NumbersWrapper>
            <BoldNumber>{days}</BoldNumber>
            <TimerText>{wordEnding("dzien", days)}</TimerText>
        </NumbersWrapper>
        <BoldNumber>:</BoldNumber>
        <NumbersWrapper>
            <BoldNumber>{hours}</BoldNumber>
            <TimerText>{wordEnding("godzina", hours)}</TimerText>
        </NumbersWrapper>
        <BoldNumber>:</BoldNumber>
        <NumbersWrapper>
            <BoldNumber>{minutes}</BoldNumber>
            <TimerText>{wordEnding("minuta", minutes)}</TimerText>
        </NumbersWrapper>
    </Wrapper>
  )
}
