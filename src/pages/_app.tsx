import { type AppType } from 'next/app';
import { trpc } from '../utils/trpc';

// Import your global CSS if you have any
//import '../styles/globals.css';

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

// This line is crucial - it wraps our app with tRPC
export default trpc.withTRPC(MyApp);