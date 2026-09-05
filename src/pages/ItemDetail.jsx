import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

function ItemDetail() {
  const { product_id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchItemDetails() {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from("Lost_And_Found")
          .select("*")
          .eq("product_id", product_id)
          .single();

        if (error) throw error;
        setItem(data);
      } catch (err) {
        console.error("Error fetching item details:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (product_id) {
      fetchItemDetails();
    }
  }, [product_id]);

  if (loading) {
    return <div className="loading-state">Loading details...</div>;
  }

  if (error || !item) {
    return (
      <div className="error-state">
        <h2>Item Not Found</h2>
        <p>We couldn't find an item matching ID: {product_id}</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="item-detail-container">
      <div className="item-card">
        <div className="item-image-wrapper">
          <img
            src={item.img_url || "https://via.placeholder.com/300"}
            alt={item.product_name}
            className="item-image"
          />
        </div>

        <div className="item-info">
          <h2>{item.product_name}</h2>
          <p className="item-id">
            <strong>Item ID:</strong> {item.product_id}
          </p>

          <div className="contact-section">
            <h3>Contact Information</h3>
            <p>
              <strong>Phone Number:</strong> {item.user_phno}
            </p>
            <a href={`tel:${item.user_phno}`} className="call-btn">
              Call Owner
            </a>
          </div>

          <Link to="/" className="back-link">
            ← Back to All Items
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;