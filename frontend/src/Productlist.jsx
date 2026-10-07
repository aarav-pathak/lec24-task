import { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5174';

export default function Productlist() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      .then(r => r.json())
      .then(data => setItems(Array.isArray(data) ? data : (data.products || [])))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  return (
    <div className="product-list">
      {items.length === 0 && <div className="loading">Loading products...</div>}
      {items.map(p => (
        <div key={p.id || p.title} className="card">
          {(p.thumbnail || (p.images && p.images[0])) && (
            <div className="img-wrapper">
              <img src={p.thumbnail || p.images[0]} alt={p.title} />
            </div>
          )}
          <div className="card-header">
            {p.brand && <span className="brand">{p.brand}</span>}
            {p.category && <span className="category">{p.category}</span>}
          </div>
          <h3 className="title">{p.title}</h3>
          {p.description && <p className="description">{p.description}</p>}
          <div className="card-details">
            <span className="price">${p.price}</span>
            {p.rating && <span className="rating">★ {p.rating}</span>}
          </div>
          {p.availabilityStatus && (
            <div className="status">{p.availabilityStatus}</div>
          )}
        </div>
      ))}
    </div>
  );
}
