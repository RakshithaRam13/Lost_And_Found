import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("Lost_And_Found")
          .select("*");

        if (error) throw error;
        setItems(data || []);
      } catch (err) {
        console.error("Error fetching items:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="home-container">
      <h2>Lost & Found Items</h2>
      <div className="items-list">
        {items.map((item, index) => {
          // Uses product_id if present; falls back to index if undefined
          const uniqueKey = item?.product_id ?? index;

          return (
            <div key={uniqueKey} className="item-card">
              <img 
                src={item.img_url || "https://via.placeholder.com/150"} 
                alt={item.product_name || "Lost item"} 
              />
              <h3>{item.product_name}</h3>
              <p>Contact: {item.user_phno}</p>
              <Link to={`/item/${item.product_id}`}>View Details</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;