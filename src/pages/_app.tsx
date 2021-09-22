/* eslint-disable react/destructuring-assignment */
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { Layout } from "src/components/Layout";
import { AuthProvider } from "src/contexts/AuthContext";

// eslint-disable-next-line func-style
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
export default MyApp;
