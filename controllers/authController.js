const NextAuth = require("next-auth").default;
const CredentialsProvider = require("next-auth/providers/credentials").default;

const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        if (
          credentials.username === process.env.USERNAME &&
          credentials.password === process.env.PASSWORD
        ) {
          return { username: credentials.username };
        } else {
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.username = token.username;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  }
};

const handler = (req, res) => NextAuth(req, res, options);

module.exports = handler;