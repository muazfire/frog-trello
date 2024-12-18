// pages/_app.tsx
import { type AppType } from 'next/app';
import { ClerkProvider } from '@clerk/nextjs';
import { trpc } from '../utils/trpc';

// Import your global CSS if you have any
//import '../styles/globals.css';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

// This line is crucial - it wraps our app with tRPC
export default trpc.withTRPC(MyApp);