import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { User, Send, AlertCircle } from "lucide-react";

const WriteComment = ({ id }) => {
  const [comment, setComment] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setIsAuthenticated(!!authToken);
  }, []);

  const handleCommentFormSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim() !== "") {
      setIsSubmitting(true);
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
          type: "error",
          text: "Error submitting comment. Please try again.",
        });
        console.log("Error Occurred", err.message);
      } finally {
        setIsSubmitting(false);
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
    <div className="write-comment-section">
      <h2 className="write-comment-heading">
        <User size={24} />
        Write a Comment
      </h2>

      {submissionMessage && (
        <div className={`alert alert-${submissionMessage.type}`} role="alert">
          <AlertCircle size={18} />
          <span className="mx-2">{submissionMessage.text}</span>
        </div>
      )}

      {isAuthenticated ? (
        <form onSubmit={handleCommentFormSubmit} className="comment-form">
          <div className="form-group">
            <textarea
              className="comment-textarea"
              rows="4"
              onChange={handleChangeText}
              value={comment}
              placeholder="Share your thoughts on this recipe..."
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="submit-btn" 
            disabled={isSubmitting}
          >
            <Send size={18} />
            {isSubmitting ? "Posting..." : "Post Comment"}
          </button>
        </form>
      ) : (
        <div className="alert alert-info">
          <AlertCircle size={18} />
          Please <Link to="/login">login</Link> to post a comment.
        </div>
      )}
    </div>
  );
};

export default WriteComment;