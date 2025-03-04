export const manifest = {
    accountAssociation: {
      header: "base64url-encoded-header",
      payload: "base64url-encoded-payload",
      signature: "base64url-encoded-signature",
    },
    frame: {
      version: "1",
      name: "Your Frame Name",
      homeUrl: "https://snake-frame.vercel12.app/",
      iconUrl: "https://snake-frame.vercel12.app/icon.png",
      imageUrl: "https://snake-frame.vercel12.app/og-image.png",
      buttonTitle: "Start",
      splashImageUrl: "https://snake-frame.vercel12.app/splash.png",
      splashBackgroundColor: "#ffffff",
      webhookUrl: "https://snake-frame.vercel12.app/webhook",
    },
    triggers: [
      {
        type: "cast",
        id: "example-trigger",
        url: "https://snake-frame.vercel12.app/trigger",
        name: "Example Trigger",
      },
    ],
};