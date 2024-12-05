
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

async function AddComment(name, email, comment) {
  const newComment = {
    name,
    email,
    comment,
    date: new Date().toISOString()
  };

  try {
    const response = await fetch("http://localhost:5000/api/v1/client/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newComment),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to add comment:", error);
    return null;
  }
}

export { LoadComments, AddComment };


