import { parseCookies, setCookie } from "nookies";
import 'antd/dist/antd.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

// MyApp.getInitialProps = async ({ctx}) => {
//   const cookies = parseCookies(ctx);
//   return { cookies }
// }


export default MyApp
