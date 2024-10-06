import Comments from './comments.data.json';

function LoadComments() {
  const storedComments = localStorage.getItem('comments');
  return storedComments ? JSON.parse(storedComments) : Comments;
}

function AddComment(email, comment) {
  const newComment = {
    email,
    comment,
    date: new Date().toISOString()
  };

  const updatedComments = [...LoadComments(), newComment];
  localStorage.setItem('comments', JSON.stringify(updatedComments));
  console.log('Comment added');
}

export { LoadComments, AddComment };