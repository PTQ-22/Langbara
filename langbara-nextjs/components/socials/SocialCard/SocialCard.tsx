import Link from "next/link";
import { Row, Title, Wrapper, Icon, Button } from "./SocialCard.styles";

interface Props {
  name: string;
  platform: string;
  link: string;
  icon: string;
  alt: string;
  color: string;
  index: number;
}

const SocialCard = (props: Props) => {
  return (
    <Link href={props.link}>
      <Wrapper color={props.color} index={props.index}>
        <Row>
          <Title index={props.index}>{props.name}</Title>
          <Icon src={props.icon} alt={props.alt} index={props.index}></Icon>
        </Row>
        <Button color={props.color} index={props.index}>
          {props.platform}
        </Button>
      </Wrapper>
    </Link>
  );
};

export default SocialCard;
