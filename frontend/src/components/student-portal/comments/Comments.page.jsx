import { AddComment } from '../../../placeholders/comments/comments.action';

export default function StudentPortalComments() {
    const handleSubmit = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const comment = event.target.comment.value;
        console.log({ name, email, comment });
        AddComment(name, email, comment);
        window.location.reload();
    };

    return (
        <>
            <div className=" bg-blue-100 shadow-lg gap-4 p-4 md:p-8 border rounded-lg">
                <h1>Comments</h1>
                <p>Here you will be able to send comments to the admin.</p>
            </div>
            <div className="flex flex-col w-full md:w-4/6 bg-blue-100 shadow-lg p-4 border rounded-lg mb-8">
                <div className="bg-white w-full rounded-lg p-4">
                    <div className="flex flex-col w-full h-fit bg-slate-50 border shadow-lg ">
                        <form onSubmit={handleSubmit}>
                        <p className="flex flex-row  p-4">
                                Name:
                                <input 
                                    type="text"
                                    name="name"
                                    className="border-2 border-gray-300 p-2 ml-2 w-full rounded-lg"
                                />
                            </p>
                            <p className="flex flex-row  p-4">
                                Email:
                                <input 
                                    type="text"
                                    name="email"
                                    className="border-2 border-gray-300 p-2 ml-2 w-full rounded-lg"
                                />
                            </p>
                            <p className="flex flex-col text-start p-4 ">
                                Comment:
                                <textarea
                                    name="comment"
                                    className="h-52 border-2 border-gray-300 mt-2 p-2 w-full rounded-lg"
                                />
                            </p>
                            <div className="flex justify-end">
                                <button className="bg-blue-500 w-28 text-white p-2 rounded-lg m-4 hover:scale-110">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
