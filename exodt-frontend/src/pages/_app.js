import "@/styles/globals.css";
import { Provider } from "react-redux";
import { wrapper } from "../redux/Store";
import { ThemeProvider } from "next-themes";
import Layout from "@/components/Layout";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" attribute="class">
        <Layout>
          <ToastContainer />
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}
