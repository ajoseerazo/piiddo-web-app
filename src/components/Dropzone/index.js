import React, { useCallback } from "react";
import Dropzone from "react-dropzone";
import { DropzoneWrapper } from "./styled";

function isFileImage(file) {
  const acceptedImageTypes = ["image/jpeg", "image/png"];

  return file && acceptedImageTypes.includes(file["type"]);
}

const generatePreview = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      resolve(e.target.result);
    };

    reader.onerror = function (e) {
      console.log(e);
      reject();
    };

    reader.readAsDataURL(file);
  });
};

const DropzoneComponent = ({ onAddFile, children }) => {
  const processFile = useCallback(
    async (files) => {
      if (isFileImage(files[0])) {
        const preview = await generatePreview(files[0]);
        onAddFile(files[0], preview);
      } else {
        alert("Solo debes subir imágenes");
      }
    },
    [onAddFile]
  );

  return (
    <DropzoneWrapper>
      <Dropzone onDrop={processFile}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {children ? (
                children
              ) : (
                <p>Debes agregar un capture o foto de la transacción</p>
              )}
            </div>
          </section>
        )}
      </Dropzone>
    </DropzoneWrapper>
  );
};

export default DropzoneComponent;
