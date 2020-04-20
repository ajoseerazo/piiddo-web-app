import firebase, { db } from "../config/firebase";

class Categories {
  static getAll = async () => {
    let categoriesRef =  await db.collection("categories").get();

    const categories = categoriesRef.docs.map(cat => {
      return {
        id: cat.id,
        ...cat.data()
      }
    })

    return categories;
  }
}

export default Categories;