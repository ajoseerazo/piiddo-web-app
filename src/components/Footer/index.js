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
            <FontAwesome name="gift" />
            <span style={{ marginLeft: 8, fontWeight: 100 }}>Veket</span>
          </div>
        </Col>

        <Col md="4" className="center">
          <ul>
            <li>
              <a href="/">¿Porqué Veket?</a>
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
