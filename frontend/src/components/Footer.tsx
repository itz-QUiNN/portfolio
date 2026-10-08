export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-muted">
        <p>&copy; {new Date().getFullYear()} Ishara</p>
        <p className="font-mono">Built with React and FastAPI</p>
      </div>
    </footer>
  )
}
