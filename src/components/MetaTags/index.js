import Head from "next/head";

const DEFUALT_DESCRIPTION =
  "Pide lo que necesites y recíbelo en tu casa en minutos";
const DEFAULT_TITLE =
  "Piiddo | Compra lo que quieras y te lo llevamos en minutos";
const DEFAULT_URL = "https://piiddo.com";

const MetaTags = ({ title, description, url }) => {
  return (
    <Head>
      <title>{title || DEFAULT_TITLE} </title>
      <meta name="description" content={description || DEFUALT_DESCRIPTION} />

      {/* Facebook Meta Tags */}
      <meta property="fb:app_id" content="581544162797490" />
      <meta property="og:locale" content="es_VE" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || DEFAULT_TITLE} />
      <meta
        property="og:description"
        content={description || DEFUALT_DESCRIPTION}
      />
      <meta property="og:site_name" content="Piiddo" />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content="https://piiddo.com/static/images/piiddo-512x512.png"
      />
      <meta property="og:url" content={url || DEFAULT_URL} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:url" content="https://piiddo.com" />
      <meta name="twitter:title" content={title || DEFAULT_TITLE} />
      <meta
        name="twitter:description"
        content={description || DEFUALT_DESCRIPTION}
      />
      <meta name="twitter:creator" content="@piiddo" />
      <meta name="twitter:url" content={url || DEFAULT_URL} />
      <meta
        name="twitter:image"
        content="https://piiddo.com/static/images/piiddo-512x512.png"
      />
    </Head>
  );
};

export default MetaTags;
