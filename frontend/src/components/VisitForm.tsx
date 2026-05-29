import { useState } from "react"
import type { Reservation } from "../types/Reservation"
import { makeReservation } from "../services/reservation.service"

type VisitFormProps = {
    onClose: () => void
}

function VisitForm({ onClose }: VisitFormProps) {
    const [formData, setFormData] = useState<Reservation>({
        entityType: '',
        place: '',
        responsibleEmail: '',
        responsibleName: '',
        date: '',
        peopleCount: 5
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
        makeReservation(formData)
    }

    return (
        <div className="visit-form-window centered">
            <div className="form-container">

                <h2>Visit Reservation</h2>

                <form onSubmit={handleSubmit}>
                    <label>Who's reserve?</label>
                    <select
                        name="entityType"
                        value={formData.entityType}
                        onChange={handleChange}
                        required
                    >   
                        <option value="">Select</option>
                        <option value="SCHOOL">School</option>
                        <option value="ORGNANIZATION">Organization</option>
                        <option value="COMPANY">Company</option>
                        <option value="PERSONAL_FAMILY">Personal - Family</option>
                    </select>

                    <label>Place of the visit</label>
                    <select
                        name="place"
                        value={formData.place}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="NUKA_PLANT">Nuka Plant</option>
                        <option value="NUKA_WORLD">Nuka World</option>
                    </select>

                    <label>Name of the person in charge</label>
                    <input
                        type="text"
                        name="responsibleName"
                        value={formData.responsibleName}
                        onChange={handleChange}
                        required
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        name="responsibleEmail"
                        value={formData.responsibleEmail}
                        onChange={handleChange}
                        required
                    />

                    <label>Desired date (approx.)</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />

                    <label>Number of people</label>
                    <input
                        type="number"
                        name="peopleCount"
                        min="5"
                        value={formData.peopleCount}
                        onChange={handleChange}
                        required
                    />
{/* 
                    CAMBIAR EL HANDLESUBMIT AL ONSUBMIT EN FORM */}
                    <div className="buttons">
                        <button type="submit" onClick={() => handleSubmit}>
                            Reserve
                        </button>

                        <button type="button" onClick={() => { onClose() }}>
                            Cancel
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default VisitForm