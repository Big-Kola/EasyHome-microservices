import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const API = 'http://localhost:3000/api'

const categoryIcons = {
  kitchen: '🍳',
  toilet: '🚽',
  bathroom: '🚿',
  'air-conditioner': '❄️',
}

export default function ProductList() {
  const { category } = useParams()
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get(`${API}/products?category=${category}`)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err))
  }, [category])

  return (
    <div>
      <h1 className="page-title">{category.replace('-', ' ')} Products</h1>
      {products.length === 0 ? (
        <p style={{ color: '#888' }}>No products found in this category.</p>
      ) : (
        <div className="product-grid">
          {products.map(product => (
            <Link key={product._id} to={`/product/${product._id}`} className="product-card">
              <div className="product-card-image">{categoryIcons[category] || '🔧'}</div>
              <div className="product-card-body">
                <h3>{product.name}</h3>
                <p className="price">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
