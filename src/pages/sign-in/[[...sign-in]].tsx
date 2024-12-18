// pages/sign-in/[[...sign-in]].tsx
import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <SignIn />
    </div>
  );
};

export default SignInPage;