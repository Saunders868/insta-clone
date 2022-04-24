import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
      })
    ],
    jwt: {
      encryption: true
    },
    secret: "secret token",
    // theme: {
    //     logo: 'https://links.papareact.com/sq0',
    //     brandColor: '#F13287',
    //     colorScheme: 'auto',
    // },
    pages:{
        signIn: '/auth/signin',
    },
    callbacks: {
      async session({ session,token, user }) {
        session.user.username = session.user.name.split(' ').join('').toLocaleLowerCase();

        session.user.uid = token.sub;
        return session;
      }
    }
    //Callback here
  });
