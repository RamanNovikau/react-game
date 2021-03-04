export const Footer = () => {
    return (
        <div className={"footer"}>
            <a className={'footer__author'} href="https://github.com/RamanNovikau">Raman Novikau</a> { `${new Date().getFullYear()}`}
            <a href="https://rs.school/react/"><img className={'footer__logo'} src={`static/rs_school_js.svg`} alt="Rs-React" /></a>
        </div>
    )
};