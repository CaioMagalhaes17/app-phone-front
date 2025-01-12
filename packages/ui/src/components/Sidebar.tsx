export function Sidebar({ children }: {children: React.ReactNode}) {
  return (
    <nav className="leftbar">
      {children}
    </nav>
  )
}