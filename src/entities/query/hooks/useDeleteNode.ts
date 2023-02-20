import { DeleteParams } from '../types';
import fetchApi from '@entities/fetchApi';
import { queryClient } from '../QueryProvider';
import { useMutation } from 'react-query';

function deleteNode(params: DeleteParams) {
  return fetchApi
    .post('api.user.tree.node.delete', {
      searchParams: params,
    })
    .json();
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
