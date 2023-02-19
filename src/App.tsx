import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";
import styled from "styled-components";
import {
  useTree,
  TreeNode,
  useCreateNode,
  useRenameNode,
  useDeleteNode,
} from "./modules/api";
import NodeItem from "./shared/ui/NoteItem/NodeItem";

const treeName = import.meta.env.VITE_NODE_NAME;

function App() {
  const {data, isLoading} = useTree();
  const [selectedNodeId, setSelectedNodeId] = useState<string>();
  const {createNode, isError: createError} = useCreateNode();
  const {renameNode, isError: renameError} = useRenameNode();
  const {deleteNode, isError: deleteError} = useDeleteNode();
  const error = createError || renameError || deleteError;

  const handleCreateNode = (parentNodeId: string, nodeName: string) => {
    createNode({nodeName, parentNodeId, treeName});
  };

  const handleDeleteNode = (nodeId: string) => {
    deleteNode({treeName, nodeId});
  };

  const handleRenameNode = (nodeId: string, newNodeName: string) => {
    renameNode({newNodeName, nodeId, treeName});
  };

  const handleSelectNode = (node: TreeNode) => {
    setSelectedNodeId(node.id);
  };

  if (isLoading)
    return (
      <Loader>
        <FontAwesomeIcon icon={faSpinner} className="fa-spin" size="2x" />
      </Loader>
    );

  return (
    <AppContainer>
      <TreeContainer>
        {data && (
          <NodeItem
            depth={0}
            selectedNodeId={selectedNodeId}
            onSelect={handleSelectNode}
            onCreate={handleCreateNode}
            onDelete={handleDeleteNode}
            onRename={handleRenameNode}
            node={data}
          ></NodeItem>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </TreeContainer>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  position: relative;
  display: flex;
  height: 100%;
`;

const Loader = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const TreeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  margin: 10px;
  padding: 10px;
  width: 100%;
  border: 1px solid #1a1a1a;
  border-radius: 8px;
`;

const ErrorMessage = styled.div`
  color: #df2828;
`;

export default App;
