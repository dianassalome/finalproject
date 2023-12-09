import emotionStyled from "@emotion/styled";
import CenterElementsContainer from "./GeneralContainers/CenterElementsContainer";

type TPicLabelCard = {
  image: string;
  text: string;
}

const Image = emotionStyled.img`
width: 80%;
`
const Text = emotionStyled.p`
text-align: center;
`

const Card = ({ image, text }: TPicLabelCard) => {
  return (
    <CenterElementsContainer>
      <Image src={image} />
      <Text>{text}</Text>
    </CenterElementsContainer>
  );
};

export default Card;
