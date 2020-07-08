import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import partnersActions from "../redux/actions/partners";

const { fetchPartners } = partnersActions;

const usePartners = (category) => {
  const { city } = useSelector((state) => state.App);
  const { partners, isLoading } = useSelector((state) => state.Partners);
  const dispatch = useDispatch();

  useEffect(() => {
    if (city && category) {
      console.log(category);
      console.log(category.slug);
      console.log(city);
      dispatch(fetchPartners(city, category.slug));
    }
  }, [city]);

  console.log(partners);

  return { partners, isLoading };
};

export default usePartners;
