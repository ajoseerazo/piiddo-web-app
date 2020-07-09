import Link from "next/link";
import useCity from "../../hooks/useCity";
import { useRouter } from "next/router";

const DynamicLink = ({ as, href, ...props }) => {
  const city = useCity();
  const router = useRouter();
  const { city: queryCity } = router.query;

  return (
    <Link
      as={city || queryCity ? `/${city || queryCity}${as}` : `/merida${as}`}
      href={city || queryCity ? `/[city]${href}` : `/[city]${href}`}
      {...props}
    />
  );
};

export default DynamicLink;
