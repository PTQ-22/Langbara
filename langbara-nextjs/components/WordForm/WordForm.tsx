import { useEffect } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { createFormReadyHintsArray } from "../../logic/task-calendar";
import {
  GreenButton,
  YellowButton,
} from "../../styles/register/register.styles";
import { WordEntry, WordFormValues } from "../../types/word";
import FormField from "../FormField/FormField";
import { StyledLabel } from "../FormField/FormField.styles";
import FormSelect from "../FormSelect/FormSelect";
import FormTextArea from "../FormTextArea/FormTextArea";
import {
  FlexRow,
  FormWrapper,
  Hint,
  HintsButtonWrapper,
  StyledH2Message,
  Wrapper,
} from "./WordForm.styles";

interface Props {
  word: WordEntry;
  currentDate?: Date;
  onSubmit: SubmitHandler<WordFormValues>;
  message: string;
}

const WordForm = ({ word, currentDate, onSubmit, message }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<WordFormValues>();
  const { fields, append, remove, replace } = useFieldArray({
    name: "hints",
    control,
  });

  const updateFormValues = () => {
    setValue("word", word.word);
    setValue("definition_en", word.definition_en);
    setValue("definition_pl", word.definition_pl);
    setValue("level", word.lvl.toString());
    setValue("part", word.data.part);
    replace(createFormReadyHintsArray(word.data.hints));
  };

  useEffect(() => {
    updateFormValues();
  }, [word]);

  return (
    <Wrapper>
      <StyledH2Message>{message}</StyledH2Message>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <FormField
          {...register("word", { required: true })}
          label={currentDate ? `Słowo na ${currentDate.getDate()}.${
            currentDate.getMonth() + 1
          }.${currentDate.getFullYear()}`: "Słowo"}
          error={errors.word}
        />
        <FlexRow>
          <FormSelect
            {...register("part", { required: true })}
            options={[
              { value: "noun" },
              { value: "adjective" },
              { value: "verb" },
            ]}
            error={errors.part}
            label="Część zdania"
          />
          <FormSelect
            {...register("level", { required: true })}
            options={[
              { value: "0", displayedText: "A1" },
              { value: "1", displayedText: "A2" },
              { value: "2", displayedText: "B1" },
              { value: "3", displayedText: "B2" },
              { value: "4", displayedText: "C1" },
              { value: "5", displayedText: "C2" },
            ]}
            error={errors.level}
            label="Poziom"
          />
        </FlexRow>
        <FormTextArea
          {...register("definition_en", { required: true })}
          label="Definicja po angielsku (B1, B2, C1, C2)"
          error={errors.definition_en}
        />
        <FormTextArea
          {...register("definition_pl", { required: true })}
          label="Definicja po polski (A1, A2)"
          error={errors.definition_pl}
        />
        <HintsButtonWrapper>
          <StyledLabel>Podpowiedzi</StyledLabel>
          <GreenButton type="button" onClick={() => append({ content: "" })}>
            Dodaj
          </GreenButton>
        </HintsButtonWrapper>
        {fields.map((item, index) => (
          <Hint key={item.id}>
            <FormField {...register(`hints.${index}.content`)} />
            <GreenButton type="button" onClick={() => remove(index)}>
              X
            </GreenButton>
          </Hint>
        ))}
        <YellowButton type="submit">Zapisz</YellowButton>
      </FormWrapper>
    </Wrapper>
  );
};

export default WordForm;
