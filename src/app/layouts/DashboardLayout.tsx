import { AppSidebar } from "../../components/customs/sidebar/app-sidebar";
interface DashboardLayoutProps {
    children: React.ReactNode;
  }
  import { ReactNode } from 'react';

  
  interface DashboardLayoutProps {
    children: ReactNode;
  }
  
  const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
      <div className="flex">
        <AppSidebar />
        <div className="flex-1">
          <AppSidebar />
          <main className="p-6 bg-gray-100 min-h-screen">{children}</main>
        </div>
      </div>
    );
  };
  
  export default DashboardLayout;