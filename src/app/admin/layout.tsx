import Sidebar from "@/components/Sidebar"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="grid grid-cols-[250px_1fr]">
      <Sidebar />
      {children}
    </div>
  )
}
