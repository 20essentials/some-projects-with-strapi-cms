const getPreviewPathname = (uid, { locale, document }): string | null => {
  if (uid === 'api::homepage.homepage') {
    return locale ? `/${locale}` : '/';
  }

  return null;
};

export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET')
  },
  apiToken: {
    salt: env('API_TOKEN_SALT')
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT')
    }
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY')
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true)
  },
  preview: {
    enabled: true,
    config: {
      allowedOrigins: [env("CLIENT_URL")],

      async handler(uid, { documentId, locale, status }) {
        const document = await strapi.documents(uid).findOne({ documentId });

        const pathname = getPreviewPathname(uid, {
          locale,
          document
        });

        if (!pathname) {
          return null;
        }

        const params = new URLSearchParams({
          url: pathname,
          secret: env("PREVIEW_SECRET"),
          status
        });

        return `${env("CLIENT_URL")}/api/preview?${params.toString()}`;
      }
    }
  }
});
