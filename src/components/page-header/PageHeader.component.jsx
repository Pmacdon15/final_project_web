export default function PageHeader({ title, description}) {
    return (
        <div className='bg-blue-100 shadow-lg gap-4 p-4 md:p-8 border rounded-lg items-center justify-center text-center'>
        <h1 className="text-2xl">{title}</h1>
        <p>{description}</p>
    </div>
    )
}