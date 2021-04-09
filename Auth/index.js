const passport = require("passport")
const passportJWT = require("passport-jwt")
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt
const LocalStrategy = require("passport-local").Strategy
const { User } = require("../models")
require("dotenv").config()
module.exports = () => {
  // Local Strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        // 이 부분에선 저장되어 있는 User를 비교하면 된다.
        try {
          const user = await User.findOne({ email, password })
          if (!user) return done(null, false, { message: "Incorrect email or password." })
          return done(null, user)
        } catch (err) {
          console.log(err)
          done(err)
        }
      }
    )
  )
  //JWT Strategy
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.TOKEN_KEY,
      },
      async (jwtPayload, done) => {
        try {
          const { userId } = jwtPayload
          const user = await User.findOne({ _id: userId })
          if (!user) return done(null, false, { message: "Incorrect user" })
          return done(null, user._id)
        } catch (err) {
          done(err)
        }
      }
    )
  )
}
