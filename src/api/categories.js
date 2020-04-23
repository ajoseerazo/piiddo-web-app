import firebase, { db } from "../config/firebase";

class Categories {
  static getAll = async () => {
    let categoriesRef = await db.collection("categories").get();

    const categories = categoriesRef.docs.map((cat) => {
      return {
        id: cat.id,
        ...cat.data(),
      };
    });

    return categories;
  };

  static getCategoryBySlug = async (categorySlug) => {
    let categoryRef = await db
      .collection("categories")
      .where("slug", "==", categorySlug)
      .limit(1)
      .get();

    let category;

    if (categoryRef.docs.length) {
      category = {
        id: categoryRef.docs[0].id,
        ...categoryRef.docs[0].data(),
      };
    }

    return category;
  };
}

export default Categories;
