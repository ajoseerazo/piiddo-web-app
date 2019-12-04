export const getCategoryName = (category) => {
  switch (category) {
    case "cakes":
      return "Tortas";
    default:
      return "Todos";
  }
}