import { CreateParams } from '../types';
import fetchApi from '@entities/fetchApi';
import { queryClient } from '../QueryProvider';
import { useMutation } from 'react-query';

function createNode(params: CreateParams) {
  return fetchApi
    .post('api.user.tree.node.create', {
      searchParams: params,
    })
    .json();
}

export function useCreateNode() {
  const { mutate, isLoading, error } = useMutation(
    (params: CreateParams) => createNode(params),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('treeNodes');
      },
    }
  );

  return {
    createNode: mutate,
    isLoading: isLoading,
    error,
  };
}
