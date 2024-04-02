// Comment.js
import React, { useState, useRef, useEffect } from "react";
import {
  ThumbLike24Regular,
  ThumbDislike24Regular,
  ArrowCircleUp18Filled,
  ArrowCircleDown18Filled,
} from "@fluentui/react-icons";
const Comment = ({ handleInsertNode, handleEditNode, handleDeleteNode, comment }) => {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [hasLikedBefore, setHasLikedBefore] = useState(false);
  const [hasDislikedBefore, setHasDislikedBefore] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    // Check if the user has liked/disliked this comment before
    const likedBefore = localStorage.getItem(`comment_${comment.id}_liked`);
    const dislikedBefore = localStorage.getItem(`comment_${comment.id}_disliked`);
    if (likedBefore) {
      setHasLikedBefore(true);
      setLikes(true);
    }
    if (dislikedBefore) {
      setHasDislikedBefore(true);
      setDislikes(true);
    }
  }, [comment.id]);
  const handleLike = () => {
    // Check if the user has already liked this comment
    const likedBefore = localStorage.getItem(`comment_${comment.id}_liked`);
    if (likedBefore) {
      setLikes(0);
      localStorage.removeItem(`comment_${comment.id}_liked`);
      setHasLikedBefore(false);
    } else {
      setLikes(1);
      localStorage.setItem(`comment_${comment.id}_liked`, true);
      // Also remove dislike if user had disliked before
      if (hasDislikedBefore) {
        setDislikes(dislikes - 1);
        localStorage.removeItem(`comment_${comment.id}_disliked`);
        setHasDislikedBefore(false);
      }
      setHasLikedBefore(true);
    }
  };

  const handleDislike = () => {
    // Check if the user has already disliked this comment
    const dislikedBefore = localStorage.getItem(`comment_${comment.id}_disliked`);
    if (!dislikedBefore) {
      setDislikes(dislikes + 1);
      localStorage.setItem(`comment_${comment.id}_disliked`, true);
      // Also remove like if user had liked before
      if (hasLikedBefore) {
        setLikes(likes - 1);
        localStorage.removeItem(`comment_${comment.id}_liked`);
        setHasLikedBefore(false);
      }
      setHasDislikedBefore(true);
    }
  };

  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode]);

  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };

  const onAddComment = () => {
    if (editMode) {
      handleEditNode(comment.id, inputRef?.current?.innerText);
    } else {
      setExpand(true);
      handleInsertNode(comment.id, input);
      setShowInput(false);
      setInput("");
    }

    if (editMode) setEditMode(false);
  };

  const handleDelete = () => {
    handleDeleteNode(comment.id);
  };
  const Action = ({ handleClick, icon, type, className }) => {
    return (
      <div className={className} onClick={handleClick}>
        {icon}
        {type}
      </div>
    );
  };

  return (
    <div>
      <div className={comment.id === 1 ? "inputContainer" : "commentContainer"}>
        {comment.id === 1 ? (
          <>
            <input
              type="text"
              className="inputContainer__input first_input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="type..."
            />
            <Action className="reply comment" type="COMMENT" handleClick={onAddComment} />
          </>
        ) : (
          <>
            <span
              contentEditable={editMode}
              suppressContentEditableWarning={editMode}
              ref={inputRef}
              style={{ wordWrap: "break-word" }}
            >
              {comment.name}
            </span>
            <div style={{ display: "flex" }}>
              {editMode ? (
                <>
                  <Action className="reply" type="SAVE" handleClick={onAddComment} />
                  <Action
                    className="reply"
                    type="CANCEL"
                    handleClick={() => {
                      if (inputRef.current) inputRef.current.innerText = comment.name;
                      setEditMode(false);
                    }}
                  />
                </>
              ) : (
                <>
                  <Action className="reply" type={" REPLY"} handleClick={handleNewComment} />
                  <Action
                    className="reply"
                    type="EDIT"
                    handleClick={() => {
                      setEditMode(true);
                    }}
                  />
                  <Action className="reply" type="DELETE" handleClick={handleDelete} />

                  <Action
                    className="reply"
                    icon={<ThumbLike24Regular />}
                    type={` ${likes}`}
                    handleClick={handleLike}
                    disabled={hasDislikedBefore}
                  />
                  <Action
                    className="reply"
                    icon={<ThumbDislike24Regular />}
                    type={` ${dislikes}`}
                    handleClick={handleDislike}
                    disabled={hasLikedBefore}
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>
      <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
        {showInput && (
          <div className="inputContainer">
            <input type="text" className="inputContainer__input" onChange={(e) => setInput(e.target.value)} />
            <Action className="reply" type="REPLY" handleClick={onAddComment} />
            <Action
              className="reply"
              type="CANCEL"
              handleClick={() => {
                setShowInput(false);
                if (!comment?.items?.length) setExpand(false);
              }}
            />
          </div>
        )}
        {comment?.items?.map((cmnt) => {
          return (
            <Comment
              key={cmnt.id}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
              comment={cmnt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
