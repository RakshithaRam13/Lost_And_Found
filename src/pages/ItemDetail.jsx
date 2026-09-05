import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Phone } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function ItemDetail() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItem() {
      const { data, error } = await supabase
        .from("Lost_And_Found")
        .select("*")
        .eq("Product_id", id)
        .single();

      if (error) {
        console.error("Error fetching item:", error);
      } else {
        setItem(data);
      }

      setLoading(false);
    }

    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <main className="max-w-xl mx-auto text-center py-20 px-4 text-gray-500">
        <p>Loading details...</p>
      </main>
    );
  }

  if (!item) {
    return (
      <main className="max-w-xl mx-auto text-center py-20 px-4">
        <h2 className="text-xl font-bold text-gray-900">Item Not Found</h2>

        <p className="text-gray-500 text-sm mt-1">
          No matching item was found.
        </p>

        <Link
          to="/"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Lost & Found
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      {/* Back button */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Lost & Found
      </Link>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {/* Image */}
        <div className="w-full h-80 bg-gray-100">
          <img
            src={item.img_url}
            alt={item.product_name}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Details */}
        <div className="p-6">
          <p className="text-xs text-gray-400 mb-2">
            Product ID: {item.product_id}
          </p>

          <h1 className="text-3xl font-bold text-gray-900">
            {item.product_name}
          </h1>

          <div className="mt-6 border-t border-gray-100 pt-5">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-600" />

              <div>
                <p className="text-xs text-gray-500">Contact</p>

                <p className="text-base font-semibold text-gray-900">
                  {item.user_contact}
                </p>
              </div>
            </div>
          </div>

          {/* Contact button */}
          <a
            href={`tel:${item.user_contact}`}
            className="mt-6 inline-flex items-center justify-center gap-2 w-full px-5 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Contact Owner
          </a>
        </div>
      </div>
    </main>
  );
}