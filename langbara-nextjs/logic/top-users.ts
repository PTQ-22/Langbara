import { INTERNAL_URL } from "../data/constants";

export interface TopUser {
  display_name: string;
  points: number;
}

export async function fetchTopUsers(): Promise<TopUser[]> {
  const resp = await fetch(`${INTERNAL_URL}/user/top-users`);
  const json = await resp.json();
  
  let users = json['users'] as TopUser[];

  users = users.slice(0, 10);

  return users;
}