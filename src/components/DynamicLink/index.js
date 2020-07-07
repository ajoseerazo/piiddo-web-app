import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

const DynamicLink = ({ as, href, ...props }) => {
  const { city } = useSelector((state) => state.App);
  const router = useRouter();
  const { city: queryCity } = router.query;

  console.log(queryCity);

  return (
    <Link
      as={city || queryCity ? `/${city || queryCity}${as}` : as}
      href={city || queryCity ? `/[city]${href}` : href}
      {...props}
    />
  );
};

export default DynamicLink;
