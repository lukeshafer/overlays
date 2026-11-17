import { handle } from "@hono/aws-lambda";
import { issuer } from "@openauthjs/openauth";
import { TwitchProvider } from "@openauthjs/openauth/provider/twitch";
import { subjects } from "./subjects";
import { Resource } from "sst";
import { decode } from "hono/jwt";

const app = issuer({
  subjects,
  providers: {
    twitch: TwitchProvider({
      clientSecret: Resource.TwitchClientSecret.value,
      clientID: Resource.TwitchClientID.value,
      scopes: ["openid"],
    }),
    luke: TwitchProvider({
      clientSecret: Resource.TwitchClientSecret.value,
      clientID: Resource.TwitchClientID.value,
      scopes: [
        "openid",
        // need to add more scopes for reading chat and stuff
        // "channel:read:redemptions",
        // "channel:read:subscriptions",
        // "moderator:read:chatters",
      ],
    }),
  },
  success: async (ctx, value) => {
    const { payload: claims } = decode(value.tokenset.raw.id_token);
    const userID = claims.sub;

    if (typeof userID !== "string") {
      return ctx.subject("public", {});
    }

    // TODO: check luke's user ID and provider and save tokens, register events/webhooks, etc

    return ctx.subject("user", { userID });
  },
});

export const handler = handle(app);
