import { Link } from 'react-router-dom'

import data from '../assets/data/history.json'
import ceo from '../assets/images/ceo.jpg'
import nukaFabric from '../assets/images/nuka_cola_plant.png'
import nukaWorld from '../assets/images/nuka_world.png'

const info = data.history

const cards = [
    {
        imgSrc: nukaFabric,
        title: "Nuka Cola Fabric",
        overlayTitle: "Nuka Cola Fabric",
        description: "Visit the temple where the famous Nuka Cola drink is created",
        visitLink: '/visit'
    }, {
        imgSrc: nukaWorld,
        title: "Nuka World",
        overlayTitle: "Nuka World",
        description: "Come with family or friends to have fun at the Nuka World theme park!",
        visitLink: '/visit'
    }
]

function Cards() {
    return (
        <section className="info-section">
            <div className="info-header">
                <h2>Discover</h2>
                <p>Get a tour to learn more about the world of Nuka-Cola</p>
            </div>

            <div className="cards-container centered">
                {
                    cards.map((card, index) => (
                        <div className="card about-card" key={index}>
                            <img
                                src={card.imgSrc}
                                alt="Fábrica Nuka Cola"
                            />

                            <div className="card-title">
                                <h3>{card.title}</h3>
                            </div>

                            <div className="card-overlay centered">
                                <h3>{card.overlayTitle}</h3>
                                <p>{card.description}</p>
                                <Link to={card.visitLink} className='button'>See More</Link>
                            </div>
                        </div>
                    ))
                }

            </div>
        </section>
    )
}

function AboutPage() {

    return (
        <>
            <section className="about">
                <h1>Meet us</h1>

                <div className="history centered">
                    <div className="text">
                        <h2>Our Story</h2>
                        <br />
                        {info.map((p, i) => (
                            <p key={i}>{p.p}</p>
                        ))}
                    </div>

                    <div className="image centered">
                        <img
                            src={ceo}
                            alt="CEO de Nuka-Cola"
                        />
                    </div>
                </div>

            </section>
            <Cards />
        </>
    );
}

export default AboutPage