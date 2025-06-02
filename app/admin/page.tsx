// app/admin/page.jsx
export default function AdminPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-y-auto overflow-x-hidden flex bg-gray-50">
      {children}
    </div>
  );
}
