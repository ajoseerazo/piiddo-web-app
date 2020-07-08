import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import partnersActions from "../redux/actions/partners";

const { fetchPartners } = partnersActions;

const usePartners = (initialCity, category) => {
  let { city } = useSelector((state) => state.App);
  const { partners, isLoading } = useSelector((state) => state.Partners);
  const dispatch = useDispatch();

  if (!city) {
    city = initialCity;
  }

  useEffect(() => {
    if (city && category) {
      dispatch(fetchPartners(city, category.slug));
    }
  }, [city]);

  return { partners, isLoading };
};

export default usePartners;
