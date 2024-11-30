import { LoadComments } from '../../../placeholders/comments/comments.action';
import { useState, useEffect } from 'react';
export default function AdminPortalComments() {

    const { comments } = useFetchComments();

    return (
        <>
            <div className=" bg-blue-100 shadow-lg gap-4 p-4 md:p-8 border rounded-lg">
                <h1>Comments</h1>
                <p>Here you will be able to View comments from users.</p>
            </div>

            {comments && comments.map((comment, index) => (
                <div
                    key={index}
                    className="flex flex-col w-full md:w-4/6 bg-blue-100 shadow-lg p-4 border rounded-lg mb-8"
                >
                    <div className="bg-white w-full rounded-lg p-4">
                        <div className="flex flex-col w-full h-fit  rounded-lg ">
                            <p className="flex flex-row border-2 border-gray-300 p-2 w-full rounded-lg">
                                Name: {comment.name}
                            </p>
                            <p className="flex flex-row border-2 border-gray-300 p-2 w-full rounded-lg">
                                Email: {comment.email}
                            </p>
                            <div className="flex flex-col items-start gap-2 min-h-36 max-h-fit shadow-lg p-2  border-2 w-full rounded-lg">
                                <p>Comment:</p>
                                <p>{comment.comment}</p>
                                <p>Date:</p>
                                <p>{comment.date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {comments.length < 1 && <div>No comments to load</div>}
        </>
    );
}

const useFetchComments = () => {
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        try {
            const fetchComments = await LoadComments();
            setComments(fetchComments);
            console.log(fetchComments);
        } catch (error) {
            console.error("Failed to load comments:", error);
        }
    }

    useEffect(() => {
        fetchComments();
    }, []);

    return { comments };
}
