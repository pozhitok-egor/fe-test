import { RenameParams } from '../types';
import ky from 'ky';
import { queryClient } from '../QueryProvider';
import { useMutation } from 'react-query';

function renameNode(params: RenameParams) {
  return ky
    .post(`${import.meta.env.VITE_API_URL}/api.user.tree.node.rename`, {
      searchParams: params,
    })
    .json();
}

export function useRenameNode() {
  const { mutate, isLoading, error } = useMutation(
    (params: RenameParams) => renameNode(params),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('treeNodes');
      },
    }
  );

  return {
    renameNode: mutate,
    isLoading,
    error,
  };
}
