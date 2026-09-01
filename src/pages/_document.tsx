import { Html, Head, Main, NextScript } from "next/document";

import { APP_NAME } from "@/lib/constants";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="icon" href="/landing/logo.svg" type="image/svg+xml" />
        <meta
          name="description"
          content={`${APP_NAME} gives eligible employees access to earned wages before payday.`}
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
