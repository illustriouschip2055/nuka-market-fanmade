function Contact() {
    return (
        <section className="contact" id="contacto">
            <div className="contact-container">

                <h2>¿Querés ser proveedor de Nuka-Cola?</h2>
                <p className="subtexto">
                    Sumate a la bebida más icónica del Yermo. Estamos buscando nuevos socios comerciales.
                </p>

                <form className="form">

                    <div className="input-group">
                        <label>Nombre / Empresa</label>
                        <input type="text" required />
                    </div>

                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" required />
                    </div>

                    <div className="input-group">
                        <label>Teléfono</label>
                        <input type="tel" />
                    </div>

                    <div className="input-group">
                        <label>Tipo de negocio</label>
                        <select required>
                            <option value="">Seleccionar...</option>
                            <option>Distribuidor</option>
                            <option>Tienda</option>
                            <option>Supermercado</option>
                            <option>Otro</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Mensaje</label>
                        <textarea placeholder="Contanos sobre tu negocio..." required></textarea>
                    </div>

                    <button type="submit" className="contact-btn">
                        Enviar solicitud
                    </button>

                </form>

            </div>
        </section>
    )
}

export default Contact