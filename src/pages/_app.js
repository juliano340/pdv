import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MyApp({ Component, pageProps }) {
  return (
    <>

      
      <title>PDV</title>
      
      <ToastContainer />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
