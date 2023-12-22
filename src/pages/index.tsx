import Head from "next/head";
import emotionStyled from "@emotion/styled";
import cards from "@/assets/cardContent";
import type { GetServerSideProps } from "next";
import axios from "axios";

//Components
import Card from "@/components/GeneralComponents/Card";
import Button from "@/components/GeneralComponents/Button";
import CenterElementsContainer from "@/components/GeneralContainers/CenterElementsContainer";
import NextLink from "@/components/GeneralComponents/NextLink";
import Title1 from "@/components/GeneralComponents/Title1";

const TilesSection = emotionStyled.section`
display: flex;
flex-direction: column;
margin: 0 50px;
@media (min-width: 650px) {
  flex-direction: row;
  justify-content: space-between;
}
`;

const SubText = emotionStyled.p`
text-align: center;
font-size: 16px;
margin-top: -20px;
@media (min-width: 650px) {
  font-size: 22px;
}
`;

const ArrowIcon = emotionStyled.i`
  font-size: 22px;
  height: 22px;
`;

const SectionContainer = emotionStyled(CenterElementsContainer)`
  margin: 0 5%;
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>milia</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SectionContainer>
          <Title1>
            Explore new places, uncover hidden gems, marvel at natural wonders,
            or document your surveys.
          </Title1>
          <SubText>
            Never miss a moment – tag your experiences and curate your own
            unique stories.
          </SubText>
          <NextLink href="/login">
            <Button>
              Start recording{" "}
              <ArrowIcon className="fi fi-rr-arrow-small-right" />
            </Button>
          </NextLink>
        </SectionContainer>
        <TilesSection>
          {cards.map(({ id, image, text }) => (
            <Card key={id} image={image} text={text} />
          ))}
        </TilesSection>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookies = context.req.headers.cookie;

    const token = cookies?.replace("authToken=", "");

    await axios.get("https://x8ki-letl-twmt.n7.xano.io/api:CnbfD9Hm/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      redirect: {
        permanent: false,
        destination: `/notes`,
      },
    };
  } catch (error) {
    console.log(error);
    return { props: {} };
  }
};
