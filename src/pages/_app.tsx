// pages/_app.tsx
import { type AppType } from 'next/app';
import { trpc } from '../utils/trpc';

// Import your global CSS if you have any
// import '../styles/globals.css';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    
    <Component {...pageProps} />
  );
};

export default trpc.withTRPC(MyApp);