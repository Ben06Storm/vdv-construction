import type { ReactNode } from 'react';

import './AdminLayout.scss';

type AdminLayoutProps = {
  children: ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="admin-layout">
      {children}
    </div>
  );
};

export default AdminLayout;