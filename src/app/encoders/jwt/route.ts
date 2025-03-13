import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

type Data = {
  header: object;
  payload: object;
  message: string;
};

// Hàm giải mã JWT
const decodeJWT = (token: string): { header: object; payload: object } => {
  try {
    const decoded = jwt.decode(token, { complete: true });
    if (decoded && typeof decoded === 'object') {
      return {
        header: decoded.header,
        payload: decoded.payload,
      };
    }
    throw new Error('Invalid token format');
  } catch (error) {
    throw new Error('Error decoding token');
  }
};

// Xử lý yêu cầu GET
export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  if (!token) {
    return NextResponse.json({ message: 'Token is required', header: {}, payload: {} }, { status: 400 });
  }

  try {
    const { header, payload } = decodeJWT(token);

    return NextResponse.json({
      header,
      payload,
      message: 'Token decoded successfully',
    });
  } catch (error) {
    return NextResponse.json({
      header: {},
      payload: {},
      message: `Error decoding token: ${error.message}`,
    }, { status: 400 });
  }
}
