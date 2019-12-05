export const getCategoryName = (category) => {
  if (!category) return "Todos";
  if (category === 'para-cumpleanos') return "Para Cumpleaños"
  if (category === 'para-mi-novix') return "Para Mi Novi@"
  return category.replace(/\-/g, ' ')
}

export const getCurrencyCode = (currency) => {
  switch (currency) {
    default:
      return "COP"
  }
}