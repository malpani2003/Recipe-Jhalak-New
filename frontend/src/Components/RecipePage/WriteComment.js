import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaUser, FaPaperPlane } from "react-icons/fa";

const WriteComment = ({ id }) => {
  const [comment, setComment] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setIsAuthenticated(!!authToken);
  }, []);

  const handleCommentFormSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim() !== "") {
      try {
        const response = await axios.post(
          `http://localhost:3001/api/food/${id}`,
          {
            comment: comment,
            foodId: id,
            date: new Date().toISOString(),
          },
          {
            headers: {
              Auth: localStorage.getItem("authToken"),
            },
          }
        );
        setSubmissionMessage({
          type: "success",
          text: "Comment submitted successfully!",
        });
        setComment("");
        console.log(response);
      } catch (err) {
        setSubmissionMessage({
          type: "danger",
          text: "Error submitting comment. Please try again.",
        });
        console.log("Error Occurred", err.message);
      }
    } else {
      setSubmissionMessage({
        type: "warning",
        text: "Please enter a valid comment before submitting.",
      });
    }
  };

  const handleChangeText = (e) => {
    setComment(e.target.value);
  };

  return (
    <div className="my-4 p-4 bg-light rounded shadow-sm">
      <h2 className="fw-bold mb-4">
        <FaUser className="me-2" />
        Write a Comment
      </h2>

      {submissionMessage && (
        <div
          className={`alert alert-${submissionMessage.type} alert-dismissible fade show`}
          role="alert"
        >
          {submissionMessage.text}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setSubmissionMessage(null)}
          ></button>
        </div>
      )}

      {isAuthenticated ? (
        <form onSubmit={handleCommentFormSubmit}>
          <div className="mb-3">
            <textarea
              className="form-control"
              id="comment"
              rows="4"
              onChange={handleChangeText}
              value={comment}
              placeholder="Share your thoughts on this recipe..."
              style={{ resize: "none" }}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-25">
            <FaPaperPlane className="me-2" />
            Post Comment
          </button>
        </form>
      ) : (
        <div className="alert alert-info" role="alert">
          Please
          <Link to="/login" className="alert-link">
            login
          </Link>
          to post a comment.
        </div>
      )}
    </div>
  );
};

export default WriteComment;
