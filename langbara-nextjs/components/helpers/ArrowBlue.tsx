import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1vh 10vw 1vh 10vw;
  @media screen and (max-width: 1400px) {
    padding-top: 0;
  }
`;

const Image = styled.img`
  width: 12vw;
  height: auto;
  min-width: 180px;
`

const ArrowBlue: React.FC = () => {
  return (
    <Wrapper>
      <Image src={"/assets/blue_arrow.svg"} alt="blue_arrow"/>
    </Wrapper>
  );
};

export default ArrowBlue;
