import { Button } from "reactstrap"

const BuyButton = (props) => {
  const { product } = props

  return (
    <a href={`https://api.whatsapp.com/send?phone=+573208664593&text=Buenas, me gustaría hacer este regalo: ${(product || {}).name} - https://Piiddo.co/products/${(product || {}).id}`} target="_blank">
      <Button color="primary" block className="buy-button">Lo quiero comprar</Button>
    </a>
  )
}

export default BuyButton