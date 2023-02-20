import { useState } from 'react';

export const useModal = () => {
  const [visible, setVisible] = useState(false);
  function toggle() {
    setVisible(!visible);
  }
  return { toggle, visible };
};
