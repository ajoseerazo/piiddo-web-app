import React, { useState, useCallback, useRef } from "react";
import Dropzone from "../Dropzone";
import ImagePreview from "../ImagePreview";
import {
  PagoMovilWrapper,
  PagoMovilData,
  PaymentButton,
  DropzoneWrapper,
  BankInfo,
  BankInfoName,
  Wallet,
} from "./styled";
import AmountCrypto from "../AmountCrypto";
import LoadingSVG from "../../loading.svg";
import ImagesAPI from "../../api/images";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";

const roninAddress = "ronin:50c886642f0944334fa09b45dfe6a3b98a664bc1";

const AxieDeposit = ({ amount, onClickPayButton, loading, type }) => {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef();
  const tooltipRef = useRef();

  const onAddCapture = useCallback(
    (file, preview) => {
      setFile(file);
      setPreview(preview);
    },
    [setFile, setPreview]
  );

  const doPayment = useCallback(async () => {
    try {
      setIsLoading(true);
      const url = await ImagesAPI.uploadPaymentSupport(file);

      if (onClickPayButton) {
        onClickPayButton({
          supportUrl: url,
        });
      }
    } catch (err) {
      alert(err);
      alert("Hubo un error procesando el pago, intente de nuevo");
    } finally {
      setIsLoading(false);
    }
  }, [file]);

  const onCopyAddress = () => {
    inputRef.current.select();
  };

  return (
    <PagoMovilWrapper>
      <p>
        <span>Para finalizar la orden debes transferir</span>
      </p>

      <Wallet>
        <AmountCrypto currency={"SLP"} value={0.45} />
        <AmountCrypto currency={"USD"} value={10.5} size={"small"} />

        <img src="https://skymavis.com/static/branding.6f33c446.png" />
      </Wallet>

      <p>A la siguiente dirección desde tu billetera Ronin</p>

      <PagoMovilData>
        <input ref={inputRef} value={roninAddress} readOnly={true} />

        <a data-tip data-for="tooltip">
          <CopyToClipboard text={roninAddress} onCopy={onCopyAddress}>
            <FontAwesomeIcon icon={faCopy} color="#1578ed" />
          </CopyToClipboard>
        </a>

        <ReactTooltip
          id="tooltip"
          effect="solid"
          type="dark"
          data-event="click"
          aria-haspopup="true"
        >
          <span>Copiado al portapapeles</span>
        </ReactTooltip>
      </PagoMovilData>

      <p>Y agregar un capture de la transferencia</p>

      <DropzoneWrapper>
        <Dropzone onAddFile={onAddCapture}>
          {preview && <ImagePreview src={preview} />}
        </Dropzone>
      </DropzoneWrapper>

      <PaymentButton
        disabled={!file || isLoading || loading}
        onClick={doPayment}
      >
        {(isLoading || loading) && (
          <div>
            <LoadingSVG />
          </div>
        )}{" "}
        Finalizar pago
      </PaymentButton>
    </PagoMovilWrapper>
  );
};

export default AxieDeposit;
