import './globals.css'
import { Inter } from 'next/font/google'
import classNames from "classnames"
import { Analytics } from '@vercel/analytics/react';

import Header from "@/components/server/Header"
import Footer from "@/components/server/Footer"

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body className={classNames(inter.className)}>
          <Header />
          <div className="container mx-auto">
            <div className="flex justify-center bg-neutral-500 min-h-screen px-4">
              <div className="max-w-4xl mt-8 ">
                {children}
              </div>
            </div>
          </div>
          <Footer/>
        </body>
      </html>
      <Analytics/>
    </>
  )
}
