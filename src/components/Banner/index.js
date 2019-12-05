import { Carousel } from "react-responsive-carousel";
import "./styles.scss";
import "./carousel.scss";

const FirstItem = () => (
  <div className="banner-item">
    <h1
      style={{
        fontSize: "1.6rem",
        color: "#546068",
        marginBottom: 10
      }}
    >
      Haz regalos a tus seres queridos en{" "}
      <span style={{ color: "#f969b3" }}>Mérida</span>, estés donde estés
    </h1>
    <h1
      style={{
        fontSize: "1.6rem",
        color: "#546068"
      }}
    >
      y pagando en tu <span style={{ color: "#f969b3" }}>moneda local</span>
    </h1>
  </div>
);

const SecondItem = () => (
  <div className="banner-item">
    <h1
      style={{
        fontSize: "1.6rem",
        color: "#546068",
        marginBottom: 10
      }}
    >
      Elige lo que quieras <span style={{ color: "#f969b3" }}>regalar</span>
    </h1>
    <h1
      style={{
        fontSize: "1.6rem",
        color: "#546068"
      }}
    >
      y nosotros nos encargamos de llevárselo a{" "}
      <span style={{ color: "#f969b3" }}>tu ser querido</span>
    </h1>
  </div>
);

const ThirdItem = () => (
  <div className="banner-item">
    <h1
      style={{
        fontSize: "1.6rem",
        color: "#546068",
        marginBottom: 10
      }}
    >
      Si deseas atención <span style={{ color: "#f969b3" }}>personalizada</span>
    </h1>
    <h1
      style={{
        fontSize: "1.6rem",
        color: "#546068"
      }}
    >
      escríbenos a nuestro{" "}
      <a
        href={`https://api.whatsapp.com/send?phone=+573208664593&text=Buenas, me gustaría recibir información para realizar un regalo`}
        target="_blank"
      >
        <span style={{ color: "#25D366" }}>Whatsapp</span>
      </a>
    </h1>
  </div>
);

const Banner = () => {
  return (
    <div className="banner">
      <Carousel
        showThumbs={false}
        showArrows={false}
        showStatus={false}
        autoPlay={true}
        interval={5000}
        infiniteLoop={true}
      >
        <FirstItem />

        <SecondItem />

        <ThirdItem />
      </Carousel>
    </div>
  );
};

export default Banner;
