import { NextRequest, NextResponse } from 'next/server';

let products = [
  { id: 1, name: "Nike Air", price: "2.000.000đ" },
  { id: 2, name: "Adidas Ultra Boost", price: "2.500.000đ" },
  { id: 3, name: "Converse Classic", price: "1.100.000đ" },
  { id: 4, name: "Puma Suede", price: "1.500.000đ" },
  { id: 5, name: "Nike Air Max", price: "2.000.000đ" },
  { id: 6, name: "Nike Air Max", price: "2.000.000đ" },
  { id: 7, name: "Nike Air Max", price: "2.000.000đ" },
  { id: 8, name: "Nike Air Max", price: "2.000.000đ" },
  { id: 9, name: "Nike Air Max", price: "2.000.000đ" },
  { id: 10, name: "Nike Air Max", price: "2.000.000đ" },
];

// GET: Lấy danh sách sản phẩm
export async function GET() {
  return NextResponse.json(products);
}

// POST: Thêm sản phẩm
export async function POST(request: NextRequest) {
  const body = await request.json();
  const newProduct = {
    id: Date.now(),
    ...body,
  };
  products.push(newProduct);
  return NextResponse.json(newProduct);
}

// PUT: Sửa sản phẩm
export async function PUT(request: NextRequest) {
  const body = await request.json();
  const index = products.findIndex((p) => p.id === body.id);
  if (index !== -1) {
    products[index] = { ...products[index], ...body };
    return NextResponse.json(products[index]);
  }
  return NextResponse.json({ error: "Product not found" }, { status: 404 });
}

// DELETE: Xoá sản phẩm theo id truyền trong body
export async function DELETE(request: NextRequest) {
  const body = await request.json();
  products = products.filter((p) => p.id !== body.id);
  return NextResponse.json({ success: true });
}
