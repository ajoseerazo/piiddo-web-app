import Link from "next/link"
import "./styles.scss"

const Breadcumb = (props) => {
  return (
    <ul className="breadcumb list-group list-group-horizontal">
      {
        (props.items || []).map(it => (
          <li className="list-group-item" key={it.url}>
            <Link href={it.url}>
              <a className="link">{it.name}</a>
            </Link>
          </li>
        ))
      }
    </ul>
  )
}

export default Breadcumb