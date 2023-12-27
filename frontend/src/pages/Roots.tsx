import MainHeader from "@/components/Layout/MainHeader";
import { RootLayoutProps } from "@/types/user.types";

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div>
      <main>
        <MainHeader />
        {children}
      </main>
    </div>
  );
};

export default RootLayout;
