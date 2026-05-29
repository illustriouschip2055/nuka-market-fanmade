import { useState } from "react"

import VisitForm from "../components/VisitForm"
import ImageChange from "../components/ImageChange"

import data from '../assets/data/visit.json'

const info = data.visit_info

type InfoProps = {
    title: string
    content: string[]
    imageGroup: string
}

function VisitInfo({ title, content, imageGroup }: InfoProps) {
    let type = imageGroup
    return (
        <section className="visit-block">
            <div className="visit-content centered">

                <div className="visit-text">
                    <h2>{title}</h2>
                    {
                        content.map((p, i) => (
                            <p key={i}>{p}</p>
                        ))
                    }
                </div>

                <div className="visit-img">
                    <ImageChange type={type as "plant" | "world"} />
                </div>

            </div>
        </section>
    )
}

function VisitPage() {
    const [showForm, setShowForm] = useState(false)

    return (
        <section className="visit-container">
            <h1 className="visit-title">Reserve a Visit</h1>
            {
                info.map((info, index) => (
                    <VisitInfo 
                        key={index} 
                        title={info.title} 
                        content={info.content} 
                        imageGroup={info.imageGroup} 
                    />
                ))
            }

            <div 
                className="visit-button" 
                onClick={() => setShowForm(true)}
            >
                Reserve Now
            </div>

            {
                showForm && (
                    <VisitForm onClose={() => setShowForm(false)} />
                )
            }
        </section>
    )
}

export default VisitPage