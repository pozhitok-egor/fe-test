import { Button } from '@shared/ui/common';
import { Modal } from '@features/Modal';
import { ModalButtons } from './styles';
import React from 'react';

const DeleteModal = ({
  nodeName,
  toggle,
  onSubmit,
}: {
  nodeName: string;
  toggle: (value: boolean) => void;
  onSubmit: () => void;
}) => {
  function submit() {
    onSubmit();
    toggle(false);
  }

  return (
    <Modal title="Delete node?" onClose={() => toggle(false)}>
      <div>Are you sure you want to delete node &apos;{nodeName}&apos;?</div>
      <ModalButtons>
        <Button
          onClick={() => toggle(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') toggle(false);
          }}
          styleType="primary"
        >
          Cancel
        </Button>
        <Button
          styleType="cancelling"
          onClick={submit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              submit();
            }
          }}
        >
          Delete
        </Button>
      </ModalButtons>
    </Modal>
  );
};

export default DeleteModal;
