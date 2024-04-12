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
        password: { lable: "Password", type: "password", placeholder: "****" },
      },
      async authorize(credentials, request) {
        console.log(credentials);

        const adminFound = await db.admin.findUnique({
          where: {
            username: credentials.username
          }
        })
        if (!adminFound) return null

        const matched = await bcrypt.compare(credentials.password, adminFound.password)
        if (!matched) return null

        return {
          id: adminFound.id,
          username: adminFound.username
        }
      } 
    })
  ]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }