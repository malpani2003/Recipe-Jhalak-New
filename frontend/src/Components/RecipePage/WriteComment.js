import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function WriteComment({ id }) {
  const [comment, setComment] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState(null);

  async function handleCommentFormSubmit(e) {
    e.preventDefault();
    if (comment.trim() !== "") {
      // Simulating a successful submission
      setSubmissionMessage({
        type: "success",
        text: "Comment submitted successfully!",
      });
      const json = {
        comment: comment,
        foodId: id,
        date: new Date().toISOString(),
      };
      const config = {
        headers: {
          Auth: localStorage.getItem("authToken"), // Assuming your authentication token is a Bearer token
          // Add other headers if needed
        },
      };
      try {
        const response = await axios.post(
          `http://localhost:3001/api/food/${id}`,
          json,
          config
        );
        console.log(response);
        // console.log(json);
        setComment(""); // Clear the comment after submission if needed
      } catch (err) {
        console.log("Error Occurred", err.me);
      }
      // Add logic to send the comment to the server or update state
    } else {
      setSubmissionMessage({
        type: "danger",
        text: "Please enter a valid comment before submitting.",
      });
    }
  }

  function handleChangeText(e) {
    const { value } = e.target;
    setComment(value);
  }

  return (
    <div className="my-4">
      <div className="d-flex flex-row justify-content">
        <h2 className="fw-bold">Write a Comment</h2>
        {localStorage.getItem("authToken") ? (
          <></>
        ) : (
          <p>
            <Link to="/login" className="text-danger fw-bold">
              Login
            </Link>{" "}
          </p>
        )}
      </div>
      {submissionMessage && (
        <div className={`alert alert-${submissionMessage.type}`} role="alert">
          {submissionMessage.text}
        </div>
      )}
      <form onSubmit={handleCommentFormSubmit}>
        <textarea
          className="form-control mt-3"
          id="comment"
          rows="5"
          onChange={handleChangeText}
          style={{ resize: "none" }}
          placeholder="Enter your comment here..."
          value={comment}
        ></textarea>
        <button type="submit" className="btn btn-warning my-3">
          Post Comment
        </button>
      </form>
    </div>
  );
}

export default WriteComment;
