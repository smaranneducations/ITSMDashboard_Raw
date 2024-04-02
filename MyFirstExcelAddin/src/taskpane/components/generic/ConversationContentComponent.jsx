import * as React from 'react';
import  { useState } from "react";
import Comment from "./Comment";
import "./ConversationContentComponent.css";



const comments = {
  id: 1,
  items: [],
};
const useNode = () => {
  const insertNode = function (tree, commentId, item) {
    if (tree.id === commentId) {
      // new node is created  and added to the items array
      tree.items.push({
        id: new Date().getTime(),
        name: item,
        items: [],
      });

      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      return insertNode(ob, commentId, item);
    });


    // function return a new object with properites of original tree object placed with the leatest node arrayx
    return { ...tree, items: latestNode };
  };

  const editNode = (tree, commentId, value) => {
    if (tree.id === commentId) {
      tree.name = value;
      return tree;
    }
// fucntion recusively searhces for it appropirate postion
    tree.items.map((ob) => {
      return editNode(ob, commentId, value);
    });

    return { ...tree };
  };

  const deleteNode = (tree, id) => {
    for (let i = 0; i < tree.items.length; i++) {
      const currentItem = tree.items[i];
      if (currentItem.id === id) {
        tree.items.splice(i, 1);
        return tree;
      } else {
        deleteNode(currentItem, id);
      }
    }
    return tree;
  };

  return { insertNode, editNode, deleteNode };
};
const ConversationContentComponent = () => {
  const [commentsData, setCommentsData] = useState(comments);

  const { insertNode, editNode, deleteNode } = useNode(); // custom hook to create 

  const handleInsertNode = (folderId, item) => {
    const finalStructure = insertNode(commentsData, folderId, item);
    setCommentsData(finalStructure);
  };

  const handleEditNode = (folderId, value) => {
    const finalStructure = editNode(commentsData, folderId, value);
    setCommentsData(finalStructure);
  };

  const handleDeleteNode = (folderId) => {
    const finalStructure = deleteNode(commentsData, folderId);
    const temp = { ...finalStructure };
    setCommentsData(temp);
  };

  return (
    <div className="conversation-container">
    <div className="App" style={{ overflowY: 'auto', maxHeight: '55vh' }}>
      <Comment
        handleInsertNode={handleInsertNode}
        handleEditNode={handleEditNode}
        handleDeleteNode={handleDeleteNode}
        comment={commentsData}
      />
    </div>
  </div>
  );
};

export default ConversationContentComponent;
