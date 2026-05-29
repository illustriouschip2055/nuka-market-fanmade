import { Link } from 'react-router-dom'

import NukaColaPlant from '../assets/images/nuka_cola_plant.png'
import NukaWorld from '../assets/images/nuka_world.png'

function Visit() {
    return (
        <section className="visit">
            <h2>Visitanos</h2>

            <div className="visit-row">
                <div className="text">
                    <h3>Fábrica Nuka-Cola</h3>
                    <p>
                        Descubre cómo se produce la bebida más icónica del Yermo.
                        Tecnología avanzada, ingredientes secretos… y quizás algo más.
                    </p>
                    <Link to="/visit">Explorar</Link>
                </div>
                <div className="visit-image">
                    <img src={NukaColaPlant} alt="" />
                </div>
            </div>

            <div className="visit-row reverse">
                <div className="text">
                    <h3>Nuka World</h3>
                    <p>
                        Vive la experiencia definitiva de Nuka-Cola.
                        Atracciones, historia y diversión en el corazón del Yermo.
                    </p>
                    <Link to="/visit">Explorar</Link>
                </div>
                <div className="visit-image">
                    <img src={NukaWorld} alt="" />
                </div>
            </div>

        </section>
    )
}

export default Visit