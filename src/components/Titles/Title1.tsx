import emotionStyled from "@emotion/styled";

const Title1 = emotionStyled.h1`
text-align: center;
  font-size: 25px;
  @media (min-width: 820px) {
    font-size: 45px;
  }
`
export default Title1;
