export const getCategoryName = (category) => {
  switch (category) {
    case "tortas":
      return "Tortas";
    case "peluches":
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