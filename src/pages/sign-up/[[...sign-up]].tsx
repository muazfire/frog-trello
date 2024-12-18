// pages/sign-up/[[...sign-up]].tsx
import { SignUp } from '@clerk/nextjs';
import type { NextPage } from 'next';

const SignUpPage: NextPage = () => {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <SignUp 
        appearance={{
          elements: {
            formButtonPrimary: 'bg-green-600 hover:bg-green-700',
            footerActionLink: 'text-green-600 hover:text-green-700',
            card: 'bg-white shadow-xl border border-green-100',
          },
          variables: {
            colorPrimary: '#16a34a',
            colorTextOnPrimaryBackground: 'white',
          }
        }}
        routing="path"
        path="/sign-up"
      />
    </div>
  );
};

export default SignUpPage;