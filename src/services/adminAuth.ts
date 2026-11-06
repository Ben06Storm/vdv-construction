export const ADMIN_AUTH_EXPIRED_EVENT =
  'admin-auth-expired';

export const handleAdminAuthExpired = () => {
  localStorage.removeItem('adminToken');

  window.dispatchEvent(
    new Event(ADMIN_AUTH_EXPIRED_EVENT),
  );
};