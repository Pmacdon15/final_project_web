import '../../../App.css';
export default function ButtonLink({ link }) {
    return (
        <a href={link}>
            <button className="LoginHomePageButtonLink">Login</button>
        </a>
    )
}