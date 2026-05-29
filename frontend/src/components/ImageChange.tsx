import { useState, useEffect } from 'react'

import nukaPlantOne from '../assets/images/visit/nuka_plant_1.png'
import nukaPlantTwo from '../assets/images/visit/nuka_plant_2.png'
import nukaPlantThree from '../assets/images/visit/nuka_plant_3.png'

import nukaWorldOne from '../assets/images/visit/nuka_world_1.png'
import nukaWorldTwo from '../assets/images/visit/nuka_world_2.png'
import nukaWorldThree from '../assets/images/visit/nuka_world_2.png'

const imgSets = {
    plant: [nukaPlantOne, nukaPlantTwo, nukaPlantThree],
    world: [nukaWorldOne, nukaWorldTwo, nukaWorldThree]
}

function ImageChange({ type }: { type: "plant" | "world" }) {
    const [index, setIndex] = useState(0)
    const [fade, setFade] = useState(true)
    const interval = 5000

    const images = imgSets[type]

    useEffect(() => {
        const i = setInterval(() => {
            setFade(false)

            setTimeout(() => {
                setIndex((prev) => (prev + 1) % images.length)
                setFade(true)
            }, 300);

        }, interval);

        return () => clearInterval(i)
    }, [images, interval])

    return (
        <img src={images[index]} alt="Image" className={`${fade ? "fade-in" : "fade-out"}`} />
    )
}

export default ImageChange