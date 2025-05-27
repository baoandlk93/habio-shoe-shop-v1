'use client'
import { useParams } from "next/navigation";

const ProductDetail = () => {
  const params = useParams();
  const id = params.id;

  return (
    <div className="flex justify-center items-center h-screen">
      <h1>Chi tiết sản phẩm ID: {id}</h1>
      
        {/* Chi tiết sản phẩm */}
    </div>
  );
};

export default ProductDetail;
