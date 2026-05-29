function Footer() {
    return (
        <footer className="footer">

            <div className="footer-container">

                <div className="footer-col">
                    <h3>Nuka-Cola</h3>
                    <p>La bebida más icónica del Yermo.</p>
                </div>

                <div className="footer-col">
                    <h4>Secciones</h4>
                    <ul>
                        <li><a href="#inicio">Inicio</a></li>
                        <li><a href="#productos">Productos</a></li>
                        <li><a href="#contacto">Contacto</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Legal</h4>
                    <ul>
                        <li><a href="#">Términos</a></li>
                        <li><a href="#">Privacidad</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Seguinos</h4>
                    <div className="links">
                        <a href="#">🌐</a>
                        <a href="#">📷</a>
                        <a href="#">🐦</a>
                    </div>
                </div>

            </div>

            <div className="footer-bottom">
                <p>© 2026 Nuka-Cola Corporation. Todos los derechos reservados.</p>
            </div>

        </footer>
    )
}

export default Footer