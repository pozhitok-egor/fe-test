import React, { useEffect, useState } from 'react';
import {
  faCaretDown,
  faCaretRight,
  faPencil,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import AddModal from './AddModal';
import DeleteModal from './DeleteModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RenameModal from './RenameModal';
import { TreeNode } from '@entities/treeNode';
import styled from 'styled-components';

type Props = {
  node: TreeNode;
  selectedNodeId?: string;
  depth: number;
  onRename: (nodeId: string, newNodeName: string) => void;
  onDelete: (nodeId: string) => void;
  onCreate: (parentNodeId: string, nodeName: string) => void;
  onSelect: (node: TreeNode) => void;
};

export const NodeItem = (props: Props) => {
  const [isOpened, setIsOpened] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const {
    node,
    depth,
    selectedNodeId,
    onSelect,
    onCreate,
    onDelete,
    onRename,
  } = props;
  const isSelected = selectedNodeId === node.id;
  const isRoot = depth === 0;
  const hasChildren = node.children.length > 0;

  const handleToggle = () => {
    setIsOpened((prevIsOpened) => !prevIsOpened);
  };

  const handleAddNode = (nodeName: string) => {
    onCreate(node.id, nodeName);
  };

  const handleRenameNode = (newNodeName: string) => {
    onRename(node.id, newNodeName);
  };

  const handleDeleteNode = () => {
    onDelete(node.id);
  };

  useEffect(() => {
    if (!hasChildren && isOpened) setIsOpened(false);
  }, [hasChildren]);

  return (
    <>
      <Wrapper
        selected={isSelected}
        onMouseDown={() => onSelect(node)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            onSelect(node);
          }
        }}
        tabIndex={0}
      >
        {hasChildren && (
          <FontAwesomeIcon
            onClick={handleToggle}
            icon={isOpened ? faCaretDown : faCaretRight}
          />
        )}
        <div>{isRoot ? 'Root' : node.name}</div>
        {isSelected && (
          <Buttons>
            <button onClick={() => setShowAddModal(true)}>+</button>
            {!isRoot && (
              <>
                <button onClick={() => setShowRenameModal(true)}>
                  <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
                </button>
                {!hasChildren && (
                  <button onClick={() => setShowDeleteModal(true)}>
                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                  </button>
                )}
              </>
            )}
          </Buttons>
        )}
      </Wrapper>

      {isOpened && node.children.length && (
        <Padding>
          {node.children.map((child) => (
            <NodeItem
              key={child.id}
              {...props}
              node={child}
              depth={depth + 1}
            />
          ))}
        </Padding>
      )}
      {showDeleteModal && (
        <DeleteModal
          nodeName={node.name}
          toggle={setShowDeleteModal}
          onSubmit={handleDeleteNode}
        />
      )}
      {showRenameModal && (
        <RenameModal
          nodeName={node.name}
          toggle={setShowRenameModal}
          onSubmit={handleRenameNode}
        />
      )}
      {showAddModal && (
        <AddModal toggle={setShowAddModal} onSubmit={handleAddNode} />
      )}
    </>
  );
};

const Padding = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  padding-left: 20px;
`;

const Buttons = styled.div`
  display: flex;
  gap: 5px;
`;

const Wrapper = styled.div<{ selected: boolean }>`
  cursor: pointer;
  padding: 2px 5px;
  display: flex;
  gap: 10px;
  align-items: center;
  background-color: ${({ selected }) =>
    selected ? 'rgba(255,255,255,0.1)' : 'transparent'};
`;
