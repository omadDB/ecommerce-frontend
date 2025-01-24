import Container from "@/components/Container"
import Sidebar from "@/components/Sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <div className="grid grid-cols-[20%_1fr] gap-8 h-[calc(100vh-154px)] my-8">
        <Sidebar />
        <div className="py-1">{children}</div>
      </div>
    </Container>
  )
}
