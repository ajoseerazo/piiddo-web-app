import React from "react";
import "./styles.scss";
import { Row, Col } from "reactstrap";
import FontAwesome from "react-fontawesome";

const Footer = props => {
  return (
    <div className="footer">
      <Row style={{ width: "100%" }}>
        <Col md="4" className="v-center">
          <div className="logo">
            <img src="https://firebasestorage.googleapis.com/v0/b/genial-core-212201.appspot.com/o/piddo-color.png?alt=media&token=22e13946-57a0-490d-8b2b-42282273e88a" style={{
              width: 150
            }}/>
          </div>
        </Col>

        <Col md="4" className="center">
          <ul>
            <li>
              <a href="/">¿Porqué Piiddo?</a>
            </li>
            <li>
              <a href="/">¿Quiénes somos?</a>
            </li>
            <li>
              <a href="/">¿Cómo lo hacemos?</a>
            </li>
            <li>
              <a href="/">Áreas de cobertura</a>
            </li>
            <li>
              <a href="/">Contáctanos</a>
            </li>
          </ul>
        </Col>

        <Col md="4" className="center">
          <ul>
            <li>
              <a href="/">Terminos y condiciones</a>
            </li>
            <li>
              <a href="/">Preguntas frecuentes</a>
            </li>
            <li>
              <a href="/">Blog</a>
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
