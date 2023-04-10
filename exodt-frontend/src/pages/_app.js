import "@/styles/globals.css";
import { Provider } from "react-redux";
import { wrapper } from "../redux/Store";
import { ThemeProvider } from "next-themes";

export default function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <ThemeProvider enableSystem={true} attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
