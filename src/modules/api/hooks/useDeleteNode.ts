import ky from "ky";
import {useMutation} from "react-query";
import {queryClient} from "../../../main";
import {DeleteParams} from "../types";

function deleteNode(params: DeleteParams) {
  return ky.post(`${import.meta.env.VITE_API_URL}/api.user.tree.node.delete`, {
    searchParams: params,
  });
}

export function useDeleteNode() {
  const mutation = useMutation((params: DeleteParams) => deleteNode(params), {
    onSuccess: () => {
      queryClient.invalidateQueries("treeNodes");
    },
  });

  return {
    deleteNode: mutation.mutate,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
  };
}
