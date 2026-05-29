import { Link } from 'react-router-dom'

const categories = [
  { name: 'Kitchen', icon: '🍳', path: 'kitchen' },
  { name: 'Toilet', icon: '🚽', path: 'toilet' },
  { name: 'Bathroom', icon: '🚿', path: 'bathroom' },
  { name: 'Air Conditioner', icon: '❄️', path: 'air-conditioner' },
]

export default function Home() {
  return (
    <div>
      <div className="hero">
        <h1>Welcome to EasyHomes</h1>
        <p>Your one-stop shop for premium plumbing materials — kitchens, toilets, bathrooms & AC supplies.</p>
      </div>
      <h2 style={{ marginBottom: 24, color: '#1a237e' }}>Shop by Category</h2>
      <div className="categories">
        {categories.map(cat => (
          <Link key={cat.path} to={`/products/${cat.path}`} className="category-card">
            <div className="icon">{cat.icon}</div>
            <h3>{cat.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}
