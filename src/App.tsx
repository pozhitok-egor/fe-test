import React, { useState } from 'react';
import {
  useCreateNode,
  useDeleteNode,
  useRenameNode,
  useTree,
} from '@entities/query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NodeItem } from '@features/NodeItem';
import { TreeNode } from '@entities/treeNode';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const treeName = import.meta.env.VITE_NODE_NAME;

function App() {
  const { data, isLoading, error: getError } = useTree();
  const [selectedNodeId, setSelectedNodeId] = useState<string>();
  const { createNode, error: createError } = useCreateNode();
  const { renameNode, error: renameError } = useRenameNode();
  const { deleteNode, error: deleteError } = useDeleteNode();
  const error = (getError ||
    createError ||
    renameError ||
    deleteError) as Error;

  const handleCreateNode = (parentNodeId: string, nodeName: string) => {
    createNode({ nodeName, parentNodeId, treeName });
  };

  const handleDeleteNode = (nodeId: string) => {
    deleteNode({ treeName, nodeId });
  };

  const handleRenameNode = (nodeId: string, newNodeName: string) => {
    renameNode({ newNodeName, nodeId, treeName });
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
        <>
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
          {error && <ErrorMessage>{error.message}</ErrorMessage>}
        </>
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
`;

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
