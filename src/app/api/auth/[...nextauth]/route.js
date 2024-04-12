import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import db from '@/utils/prisma'
import bcrypt from 'bcrypt'

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "****" },
      },
      async authorize(credentials, request) {
        const adminFound = await db.admin.findUnique({
          where: {
            username: credentials.username
          }
        })
        if (!adminFound) throw new Error("Invalid credentials")

        const matched = await bcrypt.compare(credentials.password, adminFound.password)
        if (!matched) throw new Error("Invalid credentials")

        return {
          id: adminFound.id,
          username: adminFound.username
        }
      } 
    })
  ],
  pages: {
    signIn: "/auth/admin"
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }