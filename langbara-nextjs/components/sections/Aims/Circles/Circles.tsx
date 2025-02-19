import {
  BigCard,
  Description,
  SubTitle,
  Image,
  CirclesDiv,
  Wrapper,
  CardWrapper,
} from "./Circles.styles";

interface Props {
  float: string;
  subtitle1: string;
  subtitle2: string;
  description: string;
  targetNumber: number;
}

const Circles = (props: Props) => {
  return (
    <Wrapper float={props.float}>
      <CirclesDiv>
        {props.targetNumber === 1 ? (
          <>
            <Image src={"/assets/circle1.svg"} alt="circle1" />
            <CardWrapper>
              <BigCard targetNumber={props.targetNumber}>
                <SubTitle>
                  {props.subtitle1} <br /> {props.subtitle2}
                </SubTitle>
                <Description>{props.description}</Description>
              </BigCard>
            </CardWrapper>
          </>
        ) : props.targetNumber === 2 ? (
          <>
            {" "}
            <CardWrapper>
              <BigCard targetNumber={props.targetNumber}>
                <SubTitle>
                  {props.subtitle1} <br /> {props.subtitle2}
                </SubTitle>
                <Description>{props.description}</Description>
              </BigCard>
            </CardWrapper>
            <Image src={"/assets/circle2.svg"} alt="circle2" />
          </>
        ) : (
          <>
            <Image src={"/assets/circle3.svg"} alt="circle3" />
            <CardWrapper>
              <BigCard targetNumber={props.targetNumber}>
                <SubTitle>
                  {props.subtitle1} <br /> {props.subtitle2}
                </SubTitle>
                <Description>{props.description}</Description>
              </BigCard>
            </CardWrapper>
          </>
        )}
      </CirclesDiv>
    </Wrapper>
  );
};

export default Circles;
