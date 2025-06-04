import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabaseClient } from '@/lib/supabase/client';
export async function POST(req: NextRequest) {
  const body = await req.json();
  const password = bcrypt.hashSync(body.password, 10);
    const { data, error } = await supabaseClient.from("user").insert({
        name: body.name,
        password,
        role: body.role.id,
        username: body.username,
    });
    if (error) {
        console.log(error,"error");
        throw error;
    }
  return NextResponse.json({ message: 'Đăng ký thành công' });
}