import emotionStyled from "@emotion/styled";
import { ReactNode } from "react";

type TCloseModalProps = {
  children: ReactNode;
  closeModal: React.MouseEventHandler<HTMLElement>;
};

const ModalContainer = emotionStyled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    width: 100%;
    height: 100%;
    @media (min-width: 500px) {
      width: 400px;
      height: 400px;
    }
  `;

  const ModalBackground = emotionStyled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.85);
    position: fixed;
    z-index: 1001;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  `;

  const IconsContainer = emotionStyled.div`
  position:absolute;
  width: 100%;
  top: 5px;
  display: flex;
  justify-content: start;
  @media (min-width: 500px) {
    justify-content: end;
  }
  `

  const DesktopIcon = emotionStyled.i`
    padding-right: 5px;
    display: none;
    @media (min-width: 500px) {
      display: flex;
    }
  `;

  const MobileIcon = emotionStyled.i`
    display:flex;
    padding-left: 5px;
    @media (min-width: 500px) {
      display: none;
    }
  `;

const ModalLayout = ({ children, closeModal }: TCloseModalProps) => {
  
  return (
      <ModalBackground onClick={closeModal}>
      <ModalContainer>
      <IconsContainer>
        <MobileIcon onClick={closeModal} className="fi fi-br-arrow-left" />
        <DesktopIcon onClick={closeModal} className="fi fi-rr-cross-small" />
        </IconsContainer>
        {children}
      </ModalContainer>
    </ModalBackground>
  );
};

export default ModalLayout;
