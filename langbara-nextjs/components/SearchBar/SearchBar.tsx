import { Dispatch, SetStateAction } from "react";
import { StyledInput, StyledLabel } from "../FormField/FormField.styles";
import { Wrapper } from "./SearchBar.styles";

interface Props {
  text: string;
  onChange: Dispatch<SetStateAction<string>>;
}

const SearchBar = ({ text, onChange }: Props) => {
  return (
    <Wrapper>
      <StyledInput
      placeholder="Search"
        error={undefined}
        value={text}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          onChange(e.currentTarget.value)
        }
      />
    </Wrapper>
  );
};

export default SearchBar;
