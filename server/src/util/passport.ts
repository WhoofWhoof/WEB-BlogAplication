import { User } from "../models/user/user";
import * as passportObj from "passport";
import * as Jwt from "passport-jwt";
import { Strategy as AnonymousStrategy } from "passport-anonymous";
import { logger } from "./logger";

// // const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = Jwt.Strategy;
const ExtractJwt = Jwt.ExtractJwt;

class Auth {

  private secret = process.env.JWT_SECRET;

  constructor() {
    const opts: any = {};

    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    // opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = this.secret;

    const strategy = new JwtStrategy(opts, (payload, done) => {
      if (payload.id) {
        const user = new User();
        user.where({id: payload.id}).fetch({require: false})
        .then((model: User) => {
          if (model === undefined || model === null) {
            logger.error("User is undefined for", payload, payload.id);
            return done(undefined, false);
          } else {
            let valid = true;
            if (model.get("email") !== payload.email) {
              valid = false;
            }
            if (!valid) {
              return done(undefined, false);
            }
            return done(undefined, payload);
          }
        });

      } else {
        return done(undefined, false);
      }
    });
    passportObj.use(strategy);
    passportObj.use(new AnonymousStrategy());
  }

  initialize() {
    return passportObj.initialize();
  }

  authenticate() {
    return passportObj.authenticate("jwt", {session: false});
  }

  authorize() {
    return passportObj.authorize("jwt", {session: false});
  }

  optionalAuthenticate() {
    return passportObj.authenticate(["jwt", "anonymous"], {session: false});
  }
}

const auth = new Auth();

export { auth };