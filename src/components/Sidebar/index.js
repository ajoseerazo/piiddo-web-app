import React, { useEffect, useState } from "react"
import "./styles.scss"

const Sidebar = (props) => {
  return (
    <div className={`sidebar-wrapper ${props.isSticky ? 'is-sticky' : ''}`}>
      <div className="sidebar" style={{
        maxHeight: props.height ? props.height : "auto"
      }}>
        <div>
          <div className="category-name">Motivos</div>
          <ul>
            <li>Para navidad</li>
            <li>Para cumpleaños</li>
            <li>Para mi novi@</li>
          </ul>
        </div>

        <div>
          <div className="category-name">Tipos</div>
          <ul>
            <li>Tortas</li>
            <li>Peluches</li>
            <li>Flores</li>
            <li>Chocolates</li>
            <li>Comida</li>
            <li>Ropa</li>
            <li>Bebidas</li>
            <li>Experiencias</li>
            <li>Otros</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;