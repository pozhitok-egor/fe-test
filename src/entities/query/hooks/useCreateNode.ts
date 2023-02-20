import { CreateParams } from '../types';
import ky from 'ky';
import { queryClient } from '../QueryProvider';
import { useMutation } from 'react-query';

function createNode(params: CreateParams) {
  return ky.post(`${import.meta.env.VITE_API_URL}/api.user.tree.node.create`, {
    searchParams: params,
  });
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
