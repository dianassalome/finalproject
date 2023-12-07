/** @jsxImportSource @emotion/react */
import { css , jsx} from "@emotion/react";

const style = css`
text-align: center;
  font-size: 25px;
  @media (min-width: 820px) {
    font-size: 45px;
  }
`;

type TProps = {
    children: React.ReactNode; 
};

const Title1 = (props: TProps) => {
  return <h1 css={style}>{props.children}</h1>;
};

export default Title1;
