/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "snailyluke-twitch",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: { region: "us-east-2" },
      },
    };
  },
  async run() {
    const clientID = new sst.Secret("TwitchClientID");
    const clientSecret = new sst.Secret("TwitchClientSecret");

    const auth = new sst.aws.Auth("TwitchAuth", {
      issuer: {
        handler: "src/auth/issuer.handler",
        link: [clientID, clientSecret],
      },
    });

		const bucket = new sst.aws.StaticSite("SiteAssets", {

		})

		const site = new sst.aws.Function("CreateASnail", {
			handler: "src/snailmaker/index.handler",
			url: true,
			link: []
		})
  },
});
