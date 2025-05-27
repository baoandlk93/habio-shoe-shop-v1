import Link from 'next/link';

export default function About() {
  return (
    <main>
      {/* Phần giới thiệu */}
      <section className="py-24 px-6 bg-gradient-to-tr from-blue-600 via-indigo-500 to-fuchsia-500 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Về chúng tôi</h1>
        <p className="text-lg max-w-xl mx-auto">
          Tại <span className="font-bold">HABIO SHOP</span>, chúng tôi cam kết mang đến cho khách hàng những đôi giày chất lượng nhất, kết hợp giữa phong cách và sự thoải mái. 
          Chúng tôi tin rằng mỗi bước đi đều quan trọng và muốn đồng hành cùng bạn trên hành trình của mình.
        </p>
      </section>

      {/* Sứ mệnh của chúng tôi */}
      <section className="py-10 px-6 bg-gradient-to-r from-blue-50 to-fuchsia-50 text-gray-800">
        <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-6">Sứ mệnh của chúng tôi</h2>
        <p className="text-center max-w-3xl mx-auto text-gray-700">
          <span className="font-bold">HABIO SHOP</span> không chỉ là một cửa hàng giày, mà còn là nơi bạn tìm thấy sự tự tin và phong cách riêng. 
          Chúng tôi cung cấp các sản phẩm đa dạng, từ giày thể thao đến giày thời trang, phù hợp với mọi nhu cầu của bạn. 
          Sứ mệnh của chúng tôi là trở thành địa chỉ đáng tin cậy cho mọi tín đồ thời trang và đem lại trải nghiệm mua sắm tốt nhất.
        </p>
      </section>

      {/* Giá trị cốt lõi */}
      <section className="text-white py-10 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Phần văn bản */}
        <div>
          <h2 className="text-3xl font-semibold text-indigo-700 mb-6">Giá trị cốt lõi</h2>
          <ul className="list-disc pl-6 text-white text-lg">
            <li>Chất lượng sản phẩm luôn là ưu tiên hàng đầu.</li>
            <li>Luôn lắng nghe phản hồi của khách hàng để cải thiện.</li>
            <li>Cung cấp dịch vụ tận tâm, chuyên nghiệp.</li>
          </ul>
        </div>
        {/* Phần hình ảnh */}
        <div className="flex justify-center">
          <img
            src="/img/core-value.webp"
            alt="Giá trị cốt lõi của HABIO SHOP"
            className="rounded-xl shadow-md object-cover w-full h-64 md:h-72 max-w-md"
          />
        </div>
      </section>

      {/* Liên hệ */}
      <section className="py-8 px-6 bg-gradient-to-br from-indigo-500 to-blue-600 text-center text-white">
        <h2 className="text-3xl font-semibold mb-6">Liên hệ với chúng tôi</h2>
        <p className="max-w-xl mx-auto mb-6">
          Nếu bạn có bất kỳ thắc mắc hoặc cần hỗ trợ, đừng ngần ngại liên hệ với chúng tôi qua các kênh mạng xã hội hoặc email bên dưới:
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link
            href="/contact"
            className="px-6 py-3 bg-gradient-to-r from-fuchsia-500 to-blue-500 hover:from-blue-500 hover:to-fuchsia-500 text-white font-medium rounded-md transition"
          >
            Liên hệ với chúng tôi
          </Link>
          <Link
            href="/shoes"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-md transition"
          >
            Khám phá sản phẩm
          </Link>
        </div>
      </section>
    </main>
  );
}
