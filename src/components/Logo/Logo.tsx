import emotionStyled from "@emotion/styled";


const Img = emotionStyled.img`
padding: 2px;
  height: 30px;
  @media (min-width: 700px) {
    height: 42px;
  }
`
const Logo = () => {
  return <Img src="/logo/logo.png" alt="milia-logo" />;
};

export default Logo;
