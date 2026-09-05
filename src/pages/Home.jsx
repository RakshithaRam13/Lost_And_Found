import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      try {
        setLoading(true);
        // Corrected table name case: "Lost_And_Found"
        const { data, error } = await supabase
          .from("Lost_And_Found") 
          .select("*");

        if (error) throw error;
        setItems(data || []);
      } catch (error) {
        console.error("Error fetching items:", error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, []);

  if (loading) return <div>Loading lost items...</div>;

  return (
    <div className="home-container">
      <h2>Recent Lost Items</h2>
      <div className="items-grid">
        {items.map((item) => (
          <div key={item.product_id} className="item-card">
            <img src={item.img_url} alt={item.product_name} />
            <h3>{item.product_name}</h3>
            <Link to={`/item/${item.product_id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;