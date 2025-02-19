import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1vh 10vw 1vh 10vw;
`;

const Image = styled.img`
  width: 12vw;
  height: auto;
  min-width: 180px;
`
interface Props{
  id? : number;
}

const ArrowBlue = (props:Props) => {
  if(props.id == 1){
    return (
      <Wrapper id="Opis"> 
        <Image src={"/assets/yellow_arrow.svg"} alt="yellow_arrow"/>
      </Wrapper>
    );
  }
  else{
    return (
      <Wrapper> 
        <Image src={"/assets/yellow_arrow.svg"} alt="yellow_arrow"/>
      </Wrapper>
    );
  }
  
};

export default ArrowBlue;