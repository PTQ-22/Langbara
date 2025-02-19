import Circles from "./Circles/Circles";

import { strings } from "../../../data/strings";

const Aims: React.FC = () => {
  return (
    <div id="Cele">
      <Circles
        float="left"
        subtitle1="Niech nauka stanie się"
        subtitle2="przyjemna!"
        description={strings.celText}
        targetNumber={1}
      />
      <Circles
        float="right"
        subtitle1="Wybierz swoją"
        subtitle2="scieżkę!"
        description={strings.sciezkaText}
        targetNumber={2}
      />
      <Circles
        float="left"
        subtitle1="Wybierz swój poziom"
        subtitle2="trudności!"
        description={strings.trudnoscText}
        targetNumber={3}
      />
    </div>
  );
};

export default Aims;
