import AdminSidebar from '@/components/admin/AdminSidebar'

export default function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-beige-50 flex">
      <AdminSidebar />
      <main className="flex-1 ml-56 p-8">
        {children}
      </main>
    </div>
  )
}
