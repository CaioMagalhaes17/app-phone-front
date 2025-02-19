export function Sidebar({ children, style }: { style?: React.CSSProperties, children: React.ReactNode }) {
  return (
    <nav style={style ? style : {}} className="leftbar">
      {children}
    </nav>
  )
}