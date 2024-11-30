// import Comments from './comments.data.json';


// function InitializeComments() {
//     const storedComments = localStorage.getItem('comments');
//     if (!storedComments) {
//         localStorage.setItem('comments', JSON.stringify(Comments));
//     } else {
//         const parsedStoredComments = JSON.parse(storedComments);
//         const newComments = Comments.filter(comment => 
//             !parsedStoredComments.some(storedComment => storedComment.name === comment.name && storedComment.email === comment.email && storedComment.comment === comment.comment)
//         );
//         const updatedComments = [...parsedStoredComments, ...newComments];
//         localStorage.setItem('comments', JSON.stringify(updatedComments));
//     }
// }

// InitializeComments();

async function LoadComments() {
  try {
    const response = await fetch("http://localhost:5000/api/v1/admin/comments", {
      method: "GET",   
      credentials: "include",
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const programs = await response.json();
    return programs;
  } catch (error) {
    console.error("Failed to load comments:", error);
    return null;
  }
}
function AddComment(name, email, comment) {
  const newComment = {
    name,
    email,
    comment,
    date: new Date().toISOString()
  };

  const updatedComments = [...LoadComments(), newComment];
  localStorage.setItem('comments', JSON.stringify(updatedComments));
  console.log('Comment added');
}

export { LoadComments, AddComment };


