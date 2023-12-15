import MainHeader from "@/components/header/MainHeader";
import { RootLayoutProps } from "@/types/user.types";

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div>
      <MainHeader />
      <main>{children}</main>
    </div>
  );
};

export default RootLayout;
