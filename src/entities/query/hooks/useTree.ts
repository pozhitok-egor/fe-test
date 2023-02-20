import { TreeNode } from '@entities/treeNode';
import ky from 'ky';
import { useQuery } from 'react-query';

function getNode() {
  return ky
    .get(`${import.meta.env.VITE_API_URL}/api.user.tree.get`, {
      searchParams: { treeName: import.meta.env.VITE_NODE_NAME },
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
