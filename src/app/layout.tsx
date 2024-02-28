import CssBaseline from '@mui/material/CssBaseline'
import { Inter } from "next/font/google"

import BaseProvider from "./components/BaseProvider"
import Layout from "./components/Layout"

import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "カレンダーのプロトタイプ",
  description: "カレンダーのプロトタイプ",
}

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
  )
}
