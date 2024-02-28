import type { Metadata } from "next";
import { Inter } from "next/font/google";
import CssBaseline from '@mui/material/CssBaseline';
import Layout from "./components/Layout";
import BaseProvider from "./components/BaseProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "カレンダーのプロトタイプ",
  description: "カレンダーのプロトタイプ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <CssBaseline />
      <body className={inter.className}>
        <BaseProvider>
          <Layout>
            {children}
          </Layout>
        </BaseProvider>
      </body>
    </html>
  );
}
