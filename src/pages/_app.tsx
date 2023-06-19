import '@/styles/globals.css'
import '@/styles/welcome.css'
import '@/styles/about.css'
import '@/styles/catacpol.css'
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app'
import { trpc } from '../utils/trpc';




function App({ Component, pageProps }: AppProps) {
  
  return(
    <Component {...pageProps} />
  ) 
}

export default trpc.withTRPC(App);

