import emotionStyled from "@emotion/styled";

const FooterContainer = emotionStyled.footer`
background-color: rgb(255, 204, 0);
font-size: 12px;
display: flex;
padding: 15px 25px;
gap: 10px;
justify-content: space-between;
`;

const IconsContainer = emotionStyled.div`
display: flex;
gap: 10px;
font-size: 30px;
align-items: center;
justify-content: end;
`;

const UList = emotionStyled.ul`
padding: 0;
display-flex;
flex-direction: column;
gap: 2px;
`

const Bullet = emotionStyled.li`
list-style-type: none;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <UList>
      <Bullet>
          {" "}
          Milia© 2023
        </Bullet>
        <Bullet>
          {" "}
          UIcons by <a href="https://www.flaticon.com/uicons">Flaticon</a>
        </Bullet>
        <Bullet>
          <a href="https://storyset.com/people">
            People illustrations by Storyset
          </a>
        </Bullet>
        <Bullet>
          Icons made by{" "}
          <a
            href="https://www.flaticon.com/authors/md-tanvirul-haque"
            title="Md Tanvirul Haque"
          >
            {" "}
            Md Tanvirul Haque{" "}
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </Bullet>
      </UList>
      <IconsContainer>
        <i className="fi fi-br-envelope" />
        <i className="fi fi-brands-github" />
      </IconsContainer>
    </FooterContainer>
  );
};

export default Footer;
