import type { NextPageContext } from "next";
import nookies from "nookies";
import { INTERNAL_URL } from "../data/constants";

interface Admin {
  isLoggedIn: boolean;
  name: string;
}

export async function getAdminData(ctx: NextPageContext): Promise<Admin> {

  const cookies = nookies.get(ctx);

  let adminAuth = cookies['adminauth'] || -1;

  if(ctx.query.adminauth) {
    adminAuth = ctx.query.adminauth as string;
  }

  if(adminAuth === -1) {
    return {
      isLoggedIn: false,
      name: ''
    }
  }

  const resp = await fetch(`${INTERNAL_URL}/admin/cookie?authcookie=${adminAuth}`);
  const json = await resp.json();
  return {
    isLoggedIn: json.isCorrect,
    name: json.name
  }
}

interface AdminIs2FA
{
  is2FA?: boolean;
}

export async function getAdmin2FAData(ctx: NextPageContext): Promise<AdminIs2FA> {

  const cookies = nookies.get(ctx);

  let adminAuth = cookies['adminauth'] || -1;

  if(ctx.query.adminauth) {
    adminAuth = ctx.query.adminauth as string;
  }

  if(adminAuth === -1) {
    return {
      is2FA: undefined,
    }
  }

  const resp = await fetch(`${INTERNAL_URL}/admin/2fa?authcookie=${adminAuth}`);
  const json = await resp.json();
  return {
    is2FA: json.is2FA
  }
}