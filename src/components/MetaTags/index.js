import Head from "next/head";

const DEFUALT_DESCRIPTION =
  "Pide lo que necesites y recíbelo en tu casa en minutos";
const DEFAULT_TITLE =
  "Piiddo | Compra lo que quieras y te lo llevamos en minutos";
const DEFAULT_URL = "https://piiddo.com";

const MetaTags = ({ title, description, url }) => {
  return (
    <Head>
      <title key="app_title">{title || DEFAULT_TITLE} </title>
      <meta
        name="description"
        content={description || DEFUALT_DESCRIPTION}
        key="app_description"
      />

      {/* Facebook Meta Tags */}
      <meta property="fb:app_id" content="581544162797490" key="fb_app_id" />
      <meta property="og:locale" content="es_VE" key="og_locale" />
      <meta
        property="og:title"
        content={title || DEFAULT_TITLE}
        key="og_title"
      />
      <meta
        property="og:description"
        content={description || DEFUALT_DESCRIPTION}
        key="og_description"
      />
      <meta property="og:site_name" content="Piiddo" key="og_site_name" />
      <meta property="og:type" content="website" key="og_type" />
      <meta
        property="og:image"
        content="https://piiddo.com/static/images/piiddo-512x512.png"
        key="og_image"
      />
      <meta property="og:url" content={url || DEFAULT_URL} key="og_url" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:url" content={url || DEFAULT_URL} key="twitter_url" />
      <meta
        name="twitter:title"
        content={title || DEFAULT_TITLE}
        key="twitter_title"
      />
      <meta
        name="twitter:description"
        content={description || DEFUALT_DESCRIPTION}
        key="twitter_description"
      />
      <meta name="twitter:creator" content="@piiddo" key="twitter_creator" />
      <meta
        name="twitter:image"
        content="https://piiddo.com/static/images/piiddo-512x512.png"
        key="twitter_image"
      />
      <meta property="al:android:app_name" content="Piiddo" />
      <meta property="al:android:package" content="com.piiddo" />
    </Head>
  );
};

export default MetaTags;
