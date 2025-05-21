import { NextRequest, NextResponse } from 'next/server';
import { wonderwallUrl } from '@/app/util/miljø';
import nextConfig from '../../../../../next.config';

const loginUrl = `${wonderwallUrl}${nextConfig.basePath}`;

export async function GET(request: NextRequest) {
    return NextResponse.redirect(new URL(loginUrl, request.url));
}
