import 'nextra-theme-docs/style.css'
import '../styles/globals.css'
import { Inter, JetBrains_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html,
        body,
        button,
        input,
        select,
        textarea {
          font-family: ${inter.style.fontFamily}, ui-sans-serif, system-ui,
            -apple-system, 'Segoe UI', Roboto, sans-serif;
        }
        code,
        kbd,
        pre,
        samp,
        .knit-method,
        .knit-endpoint__path,
        .knit-field__name,
        .knit-field__type {
          font-family: ${mono.style.fontFamily}, ui-monospace, SFMono-Regular,
            Menlo, Consolas, monospace;
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}
