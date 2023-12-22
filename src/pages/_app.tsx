import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/state/store";
import Footer from "@/components/GeneralComponents/Footer";
import NavBar from "@/components/GeneralComponents/NavBar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}
