import React, { useState, useCallback } from "react";
import Dropzone from "../Dropzone";
import ImagePreview from "../ImagePreview";
import {
  PagoMovilWrapper,
  PagoMovilData,
  PaymentButton,
  DropzoneWrapper,
  BankInfo,
  BankInfoName,
} from "./styled";
import Amount from "../Amount";
import LoadingSVG from "../../loading.svg";
import ImagesAPI from "../../api/images";

const bankAccounts = [
  {
    name: "Banco de Venezuela",
    accountNumber: "0102-0437-2600-0107-7870",
    accountType: "Ahorros",
    accountName: "Miglenys Adrian",
    accountDocumentType: "Cédula",
    accountDocumnetNumber: "8.981.562",
  },
];

const PagoMovil = ({ amount, onClickPayButton, loading, type }) => {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <PagoMovilWrapper>
      <p>
        <span>
          Para confirmar la orden debes realizar un pago del siguiente monto
        </span>
      </p>

      <Amount currency={type === "zelle" ? "$" : "Bs"} value={amount || 0} />

      <p>
        {type === "pago-movil" && <span>Al siguiente pago movil</span>}
        {type === "bank-transfer" && (
          <span>A alguna de las siguientes cuentas bancarias</span>
        )}
        {type === "zelle" && <span>A la siguiente cuenta de Zelle</span>}
      </p>

      <PagoMovilData>
        {type === "pago-movil" && (
          <div>
            <div>Numero de teléfono: 04145745049</div>
            <div>Cédula: 8055385</div>
            <div>Banco: Mercantil</div>
          </div>
        )}
        {type === "bank-transfer" && (
          <div>
            {bankAccounts.map((ba) => {
              return (
                <BankInfo>
                  <BankInfoName>{ba.name}</BankInfoName>
                  <div>Numero de cuenta: {ba.accountNumber}</div>
                  <div>Tipo de cuenta: {ba.accountType}</div>
                  <div>Titular de la cuenta: {ba.accountName}</div>
                  <div>Tipo de documento: {ba.accountDocumentType}</div>
                  <div>Número de documento: {ba.accountDocumnetNumber}</div>
                </BankInfo>
              );
            })}
          </div>
        )}
        {type === "zelle" && (
          <div>
            <div>Correo: johyamer@gmail.com</div>
            <div>Nombre: Juhayna abou amer Keyssieh</div>
          </div>
        )}
      </PagoMovilData>

      <p>Y agregar el capture del pago</p>

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

export default PagoMovil;
