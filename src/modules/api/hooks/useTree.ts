import ky from "ky";
import {useQuery} from "react-query";
import {TreeNode} from "../types";

function getNode() {
  return ky
    .get(`${import.meta.env.VITE_API_URL}/api.user.tree.get`, {
      searchParams: {treeName: import.meta.env.VITE_NODE_NAME},
    })
    .json<TreeNode>();
}
export const useTree = () => {
  const {data, isLoading, isError} = useQuery<TreeNode, Error>("treeNodes", () =>
    getNode()
  );

  return {
    data,
    isLoading,
    isError,
  };
};
