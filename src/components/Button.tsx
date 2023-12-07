import styled from "@emotion/styled"

const Button = styled.button`
background-color: rgb(0, 0, 0);
font-family: 'Roboto', sans-serif;
border: none;
border-radius: 5px;
color: rgb(255, 255, 255);
padding: 15px 18px;
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
gap: 3px;
height: 25px;

&:hover {
    background-color: rgb(61, 61, 61);
}
`

export default Button
