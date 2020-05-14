import { useState, useCallback, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import {
  ModalStyled,
  ModalBodyStyled,
  ModalBodyLeftStyled,
  ModalBodyRightStyled,
  ProductTitleStyled,
  ProductDescriptionStyled,
  ProductCustomSectionTitle,
  ProductCustomSection,
  ProductCustomSectionBody,
  ProductCustomItemStyled,
} from "./styled";
import PrettyCheckbox from "../PrettyCheckbox";
import ProductOperator from "../ProductOperator";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const ProductModal = (props) => {
  const { buttonLabel, className, product } = props;
  const [options, setOptions] = useState();
  const [extras, setExtras] = useState();
  const [companions, setCompanions] = useState();
  const [totalPrice, setTotalPrice] = useState();

  const onChangeOptions = useCallback(
    (selected, opt) => {
      let opts = [];

      if (!selected) {
        const index = options.findIndex((o) => {
          return o.name === opt.name;
        });

        for (let i = 0; i < options.length; i++) {
          if (i !== index) {
            opts.push(options[i]);
          }
        }
      } else {
        opts = (options || []).splice();
        opts.push(opt);
      }

      setOptions(opts);
    },
    [setOptions, options]
  );

  const onChangeCompanions = useCallback(
    (selected, companion) => {
      let comp = [];

      if (!selected) {
        const index = companions.findIndex((o) => {
          return o.id === companion.id;
        });

        for (let i = 0; i < companions.length; i++) {
          if (i !== index) {
            comp.push(companions[i]);
          }
        }
      } else {
        comp = (companions || []).splice();
        comp.push(companion);
      }

      setCompanions(comp);
    },
    [setCompanions, companions]
  );

  const onChangeExtras = useCallback(
    (selected, extra) => {
      let ext = [];

      if (!selected) {
        const index = extras.findIndex((o) => {
          return o.id === extra.id;
        });

        for (let i = 0; i < extras.length; i++) {
          if (i !== index) {
            ext.push(extras[i]);
          }
        }
      } else {
        ext = (extras || []).splice();
        ext.push(extra);
      }

      setExtras(ext);
    },
    [setExtras, extras]
  );

  useEffect(() => {
    if (product) {
      setTotalPrice(product.usdPrice);
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      let extraPrices = 0;
      if (extras) {
        for (let i = 0; i < extras.length; i++) {
          extraPrices += extras[i].usdPrice;
        }
      }

      let companionPrices = 0;
      if (companions) {
        for (let i = 0; i < companions.length; i++) {
          companionPrices += companions[i].usdPrice;
        }
      }
      
      setTotalPrice(product.usdPrice + extraPrices + companionPrices);
    }
  }, [product, extras, companions]);

  const onAddToCart = useCallback(() => {
    props.onAccept({
      product,
      options,
      companions,
      extras
    });
  }, [options, extras, companions, product])

  if (!product) {
    return <></>;
  }

  return (
    <div>
      <Button color="danger" onClick={props.onClose}>
        {buttonLabel}
      </Button>
      <ModalStyled
        isOpen={props.isOpen}
        toggle={props.onClose}
        className={className}
      >
        <ModalBodyStyled>
          <ModalBodyLeftStyled>
            <img src={product.image} alt={product.name} />
          </ModalBodyLeftStyled>
          <ModalBodyRightStyled>
            <ProductTitleStyled>{product.name}</ProductTitleStyled>
            <ProductDescriptionStyled>
              {product.description}
            </ProductDescriptionStyled>

            {product.options && product.options.length && (
              <ProductCustomSection>
                <ProductCustomSectionTitle>
                  Personaliza tu pedido
                </ProductCustomSectionTitle>

                <ProductCustomSectionBody>
                  <ul>
                    {product.options.map((opt) => {
                      return (
                        <ProductCustomItemStyled key={opt.name}>
                          <PrettyCheckbox
                            label={opt.name}
                            onChange={({ target }) => {
                              onChangeOptions(target.checked, opt);
                            }}
                          />
                        </ProductCustomItemStyled>
                      );
                    })}
                  </ul>
                </ProductCustomSectionBody>
              </ProductCustomSection>
            )}

            {product.extras && product.extras.length && (
              <ProductCustomSection>
                <ProductCustomSectionTitle>
                  Adicionales
                </ProductCustomSectionTitle>

                <ProductCustomSectionBody>
                  <ul>
                    {product.extras.map((extra) => {
                      return (
                        <ProductCustomItemStyled key={extra.id}>
                          <PrettyCheckbox
                            label={extra.name}
                            rightLabel={`+ ${extra.usdPrice}$`}
                            onChange={({ target }) => {
                              onChangeExtras(target.checked, extra);
                            }}
                          />
                        </ProductCustomItemStyled>
                      );
                    })}
                  </ul>
                </ProductCustomSectionBody>
              </ProductCustomSection>
            )}

            {product.companions && product.companions.length && (
              <ProductCustomSection>
                <ProductCustomSectionTitle>
                  Acompañantes
                </ProductCustomSectionTitle>

                <ProductCustomSectionBody>
                  <ul>
                    {product.companions.map((companion) => {
                      return (
                        <ProductCustomItemStyled key={companion.id}>
                          <PrettyCheckbox
                            label={companion.name}
                            rightLabel={`+ ${companion.usdPrice}$`}
                            onChange={({ target }) => {
                              onChangeCompanions(target.checked, companion);
                            }}
                          />
                        </ProductCustomItemStyled>
                      );
                    })}
                  </ul>
                </ProductCustomSectionBody>
              </ProductCustomSection>
            )}
          </ModalBodyRightStyled>

          <ProductOperator basePrice={totalPrice} onAddToCart={onAddToCart} />
        </ModalBodyStyled>
      </ModalStyled>
    </div>
  );
};

export default ProductModal;

/*function mapStateToProps(state, props) {
  const { product } = state.Products.toJS()

  return {
    product: product
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ }, dispatch) }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductModal);*/
