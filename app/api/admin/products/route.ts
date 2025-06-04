import { NextRequest, NextResponse } from 'next/server';
import { supabaseClient } from '@/lib/supabase/client';


// GET: Lấy danh sách sản phẩm
export async function GET(request: NextRequest) {
  const from = Number(request.nextUrl.searchParams.get("from") || "0");
  const to = Number(request.nextUrl.searchParams.get("to") || "9");
  const category = request.nextUrl.searchParams.get("category") || "";
  const name = request.nextUrl.searchParams.get("name") || "";
  let query = supabaseClient.from("product").select("*");
  if (category) {
    query = query.eq("category", category);
  }
  if (name) {
    query = query.ilike("name", `%${name}%`);
  }
  query = query.range(from, to);
  const { data, error } = await query;
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
