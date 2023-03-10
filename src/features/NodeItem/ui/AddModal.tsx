import React, { useState } from 'react';
import { Button } from '@shared/ui/common';
import { Modal } from '@features/Modal';
import { ModalButtons } from './styles';

const AddModal = ({
  toggle,
  onSubmit,
}: {
  toggle: (value: boolean) => void;
  onSubmit: (value: string) => void;
}) => {
  const [inputValue, setInputValue] = useState('');

  function submit() {
    if (inputValue) {
      onSubmit(inputValue);
      toggle(false);
    }
  }

  return (
    <Modal title={'Add new node'} onClose={() => toggle(false)}>
      <label htmlFor="name">Node title:</label>
      <input
        type="text"
        id="name"
        placeholder="title"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        autoComplete="off"
        onKeyDown={(e) => {
          if (e.key === 'Enter') submit();
        }}
      />
      <ModalButtons>
        <Button onClick={() => toggle(false)} styleType="primary">
          Cancel
        </Button>
        <Button styleType="applying" disabled={!inputValue} onClick={submit}>
          Add
        </Button>
      </ModalButtons>
    </Modal>
  );
};

export default AddModal;
