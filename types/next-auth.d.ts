import { DefaultSession } from "next-auth";
import { userRole } from ".";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    role: userRole;
  }
  interface Session {
    user: {
      role: userRole;
    } & DefaultSession["user"];
  }
  interface JWT {
    sub: string;
    name: string;
    role: userRole;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    id: string;
    name: string;
    email: string;
    role: userRole;
  }
}
