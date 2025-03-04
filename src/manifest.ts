export const manifest = {
    accountAssociation: {
      header: "base64url-encoded-header",
      payload: "base64url-encoded-payload",
      signature: "base64url-encoded-signature",
    },
    frame: {
      version: "1",
      name: "Your Frame Name",
      homeUrl: "https://snake-frame57.vercel.app/",
      iconUrl: "https://snake-frame57.vercel.app/icon.png",
      imageUrl: "https://snake-frame57.vercel.app/og-image.png",
      buttonTitle: "Start",
      splashImageUrl: "https://snake-frame57.vercel.app/splash.png",
      splashBackgroundColor: "#ffffff",
      webhookUrl: "https://snake-frame57.vercel.app/webhook",
    },
    triggers: [
      {
        type: "cast",
        id: "example-trigger",
        url: "https://snake-frame57.vercel.app/trigger",
        name: "Example Trigger",
      },
    ],
};