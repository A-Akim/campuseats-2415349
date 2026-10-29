import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <div className="card">
      <h2>404 — Page not found</h2>
      <p className="muted">The page you are looking for does not exist.</p>
      <Link to="/">← Go home</Link>
    </div>
  )
}