import Link from "next/link";
import { Wrapper } from "./styled";

const HorizontalCategories = ({ categories, categorySlug, currentUrl }) => {
  console.log(categorySlug);
  console.log(currentUrl);
  return (
    <Wrapper>
      <li
        className={
          currentUrl === undefined ? "selected" : undefined
        }
      >
        <Link href="/category/[category]" as={`/category/${categorySlug}`}>
          <a>Todos</a>
        </Link>
      </li>

      {categories.map((category) => (
        <li
          className={
            `/category/${categorySlug}/${category.slug}` === currentUrl
              ? "selected"
              : undefined
          }
        >
          <Link
            href="/category/[category]/[subcategory]"
            as={`/category/${categorySlug}/${category.slug}`}
            key={category.id || category.slug}
          >
            <a>{category.name}</a>
          </Link>
        </li>
      ))}
    </Wrapper>
  );
};

export default HorizontalCategories;
