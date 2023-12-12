import styled from "@emotion/styled";

const LogoContainer = styled.div`
  display: flex;
  gap: 5px;
  margin: 3px;
`;

const LogoImg = styled.img`
  height: 42px;
`;

const LogoText = styled.p`
  font-family: "Comfortaa", sans-serif;
  padding: 0;
  margin: 0;
  font-size: 42px;
  color: black;
`;

const LogoL = () => {
  return (
    <LogoContainer>
      <LogoImg src="/logo/maps.png" />
      <LogoText>milia</LogoText>
    </LogoContainer>
  );
};

export default LogoL;
