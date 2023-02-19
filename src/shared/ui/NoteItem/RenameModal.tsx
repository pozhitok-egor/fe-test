import React, {useState} from "react";
import {Modal} from "../../../modules/Modal";
import {Button} from "../common/Button";
import {ModalButtons} from "./styles";

export const RenameModal = ({
  nodeName,
  toggle,
  onSubmit,
}: {
  nodeName: string;
  toggle: (value: boolean) => void;
  onSubmit: (value: string) => void;
}) => {
  const [inputValue, setInputValue] = useState("");

  function submit() {
    if (inputValue) {
      onSubmit(inputValue);
      toggle(false);
    }
  }

  return (
    <Modal
      title={`Rename node '${nodeName}'`}
      onClose={() => toggle(false)}
    >
      <label htmlFor="name">New node title:</label>
      <input
        type="text"
        id="name"
        placeholder="title"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        autoFocus={true}
        autoComplete="off"
        onKeyDown={(e) => {if (e.key === 'Enter') submit()}}
      />
      <ModalButtons>
        <Button onClick={() => toggle(false)} onKeyDown={(e) => {if (e.key === 'Enter') toggle(false)}} styleType="primary">
          Cancel
        </Button>
        <Button
          styleType="applying"
          disabled={!inputValue}
          onClick={submit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submit();
            }
          }}
        >
          Rename
        </Button>
      </ModalButtons>
    </Modal>
  );
};
