import { useRouter } from "next/router";

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Chi tiết sản phẩm ID: {id}</h1>
      {/* Chi tiết sản phẩm */}
    </div>
  );
};

export default ProductDetail;
