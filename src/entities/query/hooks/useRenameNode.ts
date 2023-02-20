import { RenameParams } from '../types';
import fetchApi from '@entities/fetchApi';
import { queryClient } from '../QueryProvider';
import { useMutation } from 'react-query';

function renameNode(params: RenameParams) {
  return fetchApi
    .post('api.user.tree.node.rename', {
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
