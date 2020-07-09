import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const useCity = () => {
  const [innerCity, setInnerCity] = useState(null);
  const { city } = useSelector((state) => state.App);
  const router = useRouter();

  useEffect(() => {
    if (!router.query.city) {
      setInnerCity(city);
    } else {
      setInnerCity(city || router.query.city);
    }
  }, [city, router.query]);

  return innerCity;
};

export default useCity;
