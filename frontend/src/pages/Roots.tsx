import { RootLayoutProps } from "@/types/user.types";

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default RootLayout;
