// import React from "react";
// import { useState, useEffect } from "react";
// import styles from "./RecipePage.module.css";

// function RecipeReview({ comment }) {
//   const [review, setReview] = useState([]);
//   const [orderReview, setOrderReview] = useState([]);

//   function handleSelectInput(event) {
//     event.preventDefault();
//     const changeReview = [...review];
//     if (event.target.value === "new") {
//       changeReview.sort(
//         (a, b) => new Date(b.date || Date.now) - new Date(a.date || Date.now)
//       );
//     } else {
//       changeReview.sort(
//         (a, b) => new Date(a.date || Date.now) - new Date(b.date || Date.now)
//       );
//     }
//     setOrderReview(changeReview);
//   }
//   useEffect(() => {
//     comment.sort(
//       (a, b) => new Date(b.date || Date.now) - new Date(a.date || Date.now)
//     );
//     setReview(comment);
//     setOrderReview(comment);
//   }, [comment]);

//   return (
//     <div className={`mt-3 ${styles.recipe_reviews}`}>
//       <div className="d-flex flex-row justify-content-start">
//         <h1 className="fw-bold mb-3">Comments ({review.length})</h1>

//         {orderReview.length > 0 ? (
//           <select
//             id="reviewOrder"
//             name="reviewOrder"
//             onChange={handleSelectInput}
//             className="mx-5"
//           >
//             <option value="old">Oldest</option>
//             <option value="new">Newest</option>
//           </select>
//         ) : (
//           <></>
//         )}
//       </div>

//       {orderReview.length > 0 ? (
//         <div>
//           {orderReview.map((item, index) => (
//             <div key={index}>
//               <h5>
//                 <img
//                   src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fmobile%2Fallrecipes%2Fimages%2Ficon-user-default_v2.png&w=1200&h=1200&c=sc&poi=face&q=60"
//                   alt="user avatar"
//                 />
//                 {item.userName}
//                 <span className="mx-5">
//                   {item.date ? item.date.split("T")[0] : "8/12/23"}
//                 </span>
//               </h5>

//               <p className="">{item.comment}</p>
//               <hr className="" />
//             </div>
//           ))}
//         </div>
//       ) : (
  //         <div></div>
//         // <div className="fw-bold text-center fs-i">Be the First One to Comment</div>
//       )}
//     </div>
//   );
// }

// export default RecipeReview;
// CommentSection.js - CommentSection Component

import React from 'react';
import styles from './RecipePage.module.css';

const Comment = ({ comment }) => {
  console.log(comment);
  return (
    <div className={styles.comment}>
    <img src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" alt='user-icon' className={styles.avatar} />
    <div className={styles['comment-content']}>
      <p className={styles.username}>{comment.userName}</p>
      <p className={styles.text}>{comment.comment}</p>
      <div className={styles['comment-actions']}>
        <span className={styles.timestamp}>{new Date().toLocaleDateString()}</span>
        {/* <button className={styles['like-button']}>Like</button> */}
        {/* <button className={styles['reply-button']}>Reply</button> */}
      </div>
    </div>
  </div>
  
  );
};


// CommentSection.js


const RecipeReview = ({ comment }) => {
  return (
    <div className={styles['comment-section']}>
      {comment.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </div>
  );
};


export default RecipeReview;
