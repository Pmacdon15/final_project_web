import '../../../App.css';
export default function ButtonLink({ text, link }) {
    return (
        <a href={link}>
            <button className="LoginHomePageButtonLink">Login as {text}</button>
        </a>
    )
}