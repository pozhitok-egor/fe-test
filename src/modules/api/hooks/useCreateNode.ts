import ky from "ky";
import {useMutation} from "react-query";
import {queryClient} from "../../../main";
import {CreateParams} from "../types";

function createNode(params: CreateParams) {
  return ky
    .post(`${import.meta.env.VITE_API_URL}/api.user.tree.node.create`, {
      searchParams: params,
    })
    .json<{}>();
}

export function useCreateNode() {
  const {mutate, isLoading, isError} = useMutation(
    (params: CreateParams) => createNode(params),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("treeNodes");
      },
    }
  );

  return {
    createNode: mutate,
    isLoading: isLoading,
    isError: isError,
  };
}
