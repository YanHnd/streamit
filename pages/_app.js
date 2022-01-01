import "../styles/globals.scss";
import { Sidebar } from "../components/sidebarLayout";
import styles from "../styles/Home.module.scss";
import App from "next/app";
import { SessionProvider } from "next-auth/react";

class MyApp extends App {
  render() {
    const {
      Component,
      pageProps: { session, ...pageProps },
    } = this.props;
    const getLayout =
      Component.getLayout || ((page) => <Sidebar children={page} />);
    return (
      <SessionProvider session={session}>
        {getLayout(<Component {...pageProps} />)}
      </SessionProvider>
    );
  }
}

export default MyApp;
