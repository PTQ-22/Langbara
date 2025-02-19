import Link from "next/link";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { SubmitHandler, useForm } from "react-hook-form";
import ReactModal from "react-modal";
import { API_URL } from "../../../../data/constants";
import useModal from "../../../../hooks/useModal";
import { LanguageLevel, setUserCookie } from "../../../../logic/user-cookies";
import register from "../../../../pages/register";
import {
  RedButton,
  StyledForm,
  YellowButton,
} from "../../../../styles/register/register.styles";
import {
  TextHeader,
  MaxWidthColumn,
  Subtitle,
  InfoGroup,
  Column,
  Title,
} from "../../../../styles/sideBarPages/sideBarPages.styles";
import { Center } from "../../../Center/Center.styles";
import FormSelect, { SelectOption } from "../../../FormSelect/FormSelect";
import { ButtonContainer, Wrapper } from "./Settings.styles";

interface Props {
  languageLevel: LanguageLevel | null;
  userName?: string;
}

interface FormValues {
  languageLevel: LanguageLevel;
}

const Settings = ({ languageLevel, userName }: Props) => {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues, e) => {
    e?.preventDefault();

    const response = await fetch(`${API_URL}/set-language-level`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        lvl: data.languageLevel,
      }),
    });

    const apiCode = response.headers.get("api-code");

    if (apiCode === "0") {
      const json = await response.json();
      setUserCookie(json.cookies.auth);
    }
  };

  const selectOptions: SelectOption[] = [
    {
      value: "0",
      displayedText: "A1",
      selected: languageLevel === 0,
    },
    {
      value: "1",
      displayedText: "A2",
      selected: languageLevel === 1,
    },
    {
      value: "2",
      displayedText: "B1",
      selected: languageLevel === 2 || languageLevel === null,
    },
    {
      value: "3",
      displayedText: "B2",
      selected: languageLevel === 3,
    },
    {
      value: "4",
      displayedText: "C1",
      selected: languageLevel === 4,
    },
    {
      value: "5",
      displayedText: "C2",
      selected: languageLevel === 5,
    },
  ];

  const { modalIsOpen, openModal, closeModal } = useModal();
  const router = useRouter();

  return (
    <Wrapper>
      <Column center={false}>
        <TextHeader>
          <Title>USTAWIENIA</Title>
        </TextHeader>
        <MaxWidthColumn>
          <Subtitle>Poziom języka</Subtitle>
          <InfoGroup>
            <StyledForm onChange={handleSubmit(onSubmit)}>
              <FormSelect
                {...register("languageLevel", { required: true })}
                options={selectOptions}
              />
            </StyledForm>
          </InfoGroup>
          <Subtitle>Dane</Subtitle>
          <InfoGroup>
            <ButtonContainer>
              <Link href="/files/POLITYKA_PRYWATNOSCI.pdf" passHref>
                <a target="_blank">
                  <YellowButton>Polityka prywatności</YellowButton>
                </a>
              </Link>
            </ButtonContainer>
          </InfoGroup>
          <InfoGroup>
            {userName ? null : (
              <ButtonContainer>
                <RedButton onClick={openModal}>Usuń dane</RedButton>
              </ButtonContainer>
            )}
          </InfoGroup>
        </MaxWidthColumn>
      </Column>
      <ReactModal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 10000000,
          },
          content: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "5px",
            border: "none",
            width: "350px",
            height: "120px",
            background: "#10363E",
            color: "white",
          },
        }}
      >
        <Center>
          <p>Czy na pewno chcesz usunąć swoje dane?</p>
          <RedButton onClick={() => router.push("/logout")}>Usuń</RedButton>
        </Center>
      </ReactModal>
    </Wrapper>
  );
};

export default Settings;
