import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className='dark' >
      <Head />
      <body className='dark:text-white-50 dark:bg-black-200'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
