import styled from "@emotion/styled"

const FooterContainer = styled.footer`
background-color: rgb(255, 204, 0);
height: 100px;
font-size: 12px;
`

const Bullet = styled.li`
list-style-type: none;
`

const Footer = () => {
    return (
        <FooterContainer>
            <p>Credits</p>
            <ul>
                <Bullet> UIcons by <a href="https://www.flaticon.com/uicons">Flaticon</a></Bullet>
                <Bullet><a href="https://storyset.com/people">People illustrations by Storyset</a></Bullet>
                <Bullet><a href="https://www.flaticon.com/free-icons/maps" title="maps icons">Maps icons created by Smashicons - Flaticon</a></Bullet>
            </ul>
            
               
                
        
       
        </FooterContainer>
    )
}

export default Footer