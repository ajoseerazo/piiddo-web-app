export const getCategoryName = (category) => {
  switch (category) {
    case "cakes":
      return "Tortas";
    case "plush":
      return "Peluches";
    default:
      return "Todos";
  }
}

export const getCurrencyCode = (currency) => {
  switch (currency) {
    default:
      return "COP"
  }
}