import Link from "next/link";
import { UlWrapper, ChevronRight } from "./styled";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

library.add([faChevronRight]);

import "./styles.scss";

const Breadcumb = (props) => {
  return (
    <UlWrapper className="">
      {(props.items || []).map((it, index) => (
        <li className="" key={it.url}>
          <Link href={it.as} as={it.url}>
            <a className="link">{it.name}</a>
          </Link>

          {index !== props.items.length - 1 && (
            <ChevronRight icon="chevron-right" />
          )}
        </li>
      ))}
    </UlWrapper>
  );
};

export default Breadcumb;
