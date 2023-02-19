import ky from "ky";
import {useMutation} from "react-query";
import {queryClient} from "../../../main";
import {RenameParams} from "../types";

function renameNode(params: RenameParams) {
  return ky
    .post(`${import.meta.env.VITE_API_URL}/api.user.tree.node.rename`, {
      searchParams: params,
    })
    .json();
}

export function useRenameNode() {
  const mutation = useMutation((params: RenameParams) => renameNode(params), {
    onSuccess: () => {
      queryClient.invalidateQueries("treeNodes");
    },
  });

  return {
    renameNode: mutation.mutate,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
  };
}
