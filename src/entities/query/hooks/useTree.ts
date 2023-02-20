import { TreeNode } from '@entities/treeNode';
import fetchApi from '@entities/fetchApi';
import { useQuery } from 'react-query';

function getNode() {
  return fetchApi
    .get('api.user.tree.get', {
      searchParams: { treeName: process.env.VITE_NODE_NAME as string },
    })
    .json<TreeNode>();
}
export const useTree = () => {
  const { data, isLoading, error } = useQuery<TreeNode, Error>(
    'treeNodes',
    () => getNode()
  );

  return {
    data,
    isLoading,
    error,
  };
};
