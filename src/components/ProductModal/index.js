import { useState } from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"
import { bindActionCreators } from "redux"
import { connect } from "react-redux";

const ProductModal = (props) => {
  const {
    buttonLabel,
    className,
    product
  } = props;

  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  if (!product) {
    return <></>
  }

  return (
    <div>
      <Button color="danger" onClick={props.onClose}>{buttonLabel}</Button>
      <Modal isOpen={props.isOpen} toggle={props.onClose} className={className}>
        <ModalHeader toggle={props.onClose}>{product.name}</ModalHeader>
        <ModalBody>
          {product.description}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={props.onClose}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

function mapStateToProps(state, props) {
  const { product } = state.Products.toJS()

  console.log("PRODUCT", product);

  return {
    product: product
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ }, dispatch) }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductModal);