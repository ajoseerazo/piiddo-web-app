import React, { useEffect, useState } from "react"
import Link from "next/link"
import "./styles.scss"

const categories = [
  {
    name: "Tortas",
    url: '/tortas'
  },
  {
    name: "Peluches",
    url: '/peluches'
  },
  {
    name: "Flores",
    url: '/flores'
  },
  {
    name: "Chocolates",
    url: '/chocolates'
  },
  {
    name: "Comida",
    url: "/comida"
  },
  {
    name: "Ropa",
    url: "/ropa"
  },
  {
    name: "Bebidas",
    url: "/bebidas"
  },
  {
    name: "Experiencias",
    url: "/experiencias"
  },
  {
    name: "Otros",
    url: "/otros"
  }
]

const motives = [
  {
    name: "Para navidad",
    url: "/motivos/para-navidad"
  },
  {
    name: "Para cumpleaños",
    url: "/motivos/para-cumpleanos"
  },
  {
    name: "Para mi novi@",
    url: "/motivos/para-mi-novix"
  }
]

const Sidebar = (props) => {
  return (
    <div className={`sidebar-wrapper ${props.isSticky ? 'is-sticky' : ''}`}>
      <div className="sidebar" style={{
        maxHeight: props.height ? props.height : "auto"
      }}>
        <div>
          <div className="category-name">Motivos</div>
          <ul>
            {
              motives.map(motive => (
                <li>
                  <Link href={motive.url} key={motive.url}>
                    <a>
                      {motive.name}
                    </a>
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>

        <div>
          <div className="category-name">Tipos</div>
          <ul>
            {
              categories.map(category => (
                <li>
                  <Link href={category.url} key={category.url}>
                    <a>
                      {category.name}
                    </a>
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;