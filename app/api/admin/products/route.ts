import { NextRequest, NextResponse } from 'next/server';
import { supabaseClient } from '@/lib/supabase/client';

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
  const { data, error } = await supabaseClient.from("product").select("*");
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// POST: Thêm sản phẩm
export async function POST(request: NextRequest) {
  const body = await request.json();
  const newProduct = {
    ...body,
  };
  const { data, error } = await supabaseClient.from("product").insert([newProduct]);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// PUT: Sửa sản phẩm
export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { data, error } = await supabaseClient.from("product").update(body).eq("id", body.id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// DELETE: Xoá sản phẩm theo id truyền trong body
export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const { data, error } = await supabaseClient.from("product").delete().eq("id", body.id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
