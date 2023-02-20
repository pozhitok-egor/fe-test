import { DeleteParams } from '../types';
import ky from 'ky';
import { queryClient } from '../QueryProvider';
import { useMutation } from 'react-query';

function deleteNode(params: DeleteParams) {
  return ky.post(`${import.meta.env.VITE_API_URL}/api.user.tree.node.delete`, {
    searchParams: params,
  });
}

export function useDeleteNode() {
  const { mutate, isLoading, error } = useMutation(
    (params: DeleteParams) => deleteNode(params),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('treeNodes');
      },
    }
  );

  return {
    deleteNode: mutate,
    isLoading,
    error,
  };
}
