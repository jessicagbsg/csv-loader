import { ChangeEvent, useRef } from "react";

import { ButtonContainer, ConfirmButton } from "./FileUploadButton.styles"

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}

export const FileUploadButton = ({ onChange, onClick }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <ButtonContainer>

      <input
        type="file"
        accept=".csv"
        ref={inputRef}
        onChange={onChange}
      />

      <ConfirmButton onClick={onClick}>
        confirm
      </ConfirmButton>

    </ButtonContainer>
  )
}
