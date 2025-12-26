import { useEffect, useRef, useState } from "react";
import type { StringDivProps } from "../../models";
import images from "../../../public/exporter";
import './Carousel.css'


interface CarouselProps {
    elements: React.ReactElement<StringDivProps>[];
}


// Function that is going to accept a list of classes to add and a list of classes to remove
const adjustClasses = (elementId: string, toAdd: string[], toRemove: string[] = []) => {
    console.log("Inside the adjustClasses func")
    let elementFromDom = document.getElementById(elementId)
    console.log(elementFromDom)
    if (!elementFromDom) {
        throw new Error(`An element with the following id -> ${elementId} does not exist!`)
    }
    
    let classList = elementFromDom.classList
    if (toRemove) {
        classList.remove(...toRemove)
    }

    if (toAdd) {
        classList.add(...toAdd)
    }
}

const Carousel = ({elements}: CarouselProps) => {
    // const [currCentral, setCurrCentral] = useState(0)
    // const [isRightVisible, setIsRightVisible] = useState(false)
    // const [isLeftVisible, setIsLeftVisible] = useState(false)
    const currCentral = useRef(0)
    const [isRightVisible, setIsRightVisible] = useState(false)
    const [isLeftVisible,setIsLeftVisible] = useState(false)

    const lenElements = elements.length

    useEffect(
        () => {
            const currCentralVal = currCentral.current
            adjustClasses(elements[currCentralVal].props.id, ["central-frame"])
            if (currCentralVal < elements.length - 1) {
                setIsRightVisible(true)
                adjustClasses(elements[currCentralVal + 1].props.id, ["right-frame-blurred"])

                let divsToHide = elements.slice(currCentralVal + 2, lenElements)
                for (let div of divsToHide) {
                    adjustClasses(div.props.id, ["disappeared-element"])
                }

            }
        },[]
    )

    const arrowHandler = (isRight: boolean) => { 

        let currCentralLocal = currCentral.current

        if (isRight && currCentralLocal === lenElements - 1) {
            throw new Error("It's impossible to scroll to the next element in the carousel, because the latest element was reached already!")
        }

        if (!isRight && currCentralLocal === 0) {
            throw new Error("It's impossible to scroll back to the previous element in the carousel, because the first element was reached already!")
        }

        if (isRight) {

            if (currCentralLocal > 0) {
                let prevElemIdx = currCentralLocal - 1
                adjustClasses(elements[prevElemIdx].props.id, ["disappeared-element"], ["left-frame-blurred"])
            }

            // Set current to left
            adjustClasses(elements[currCentralLocal].props.id, ["left-frame-blurred"], ["central-frame"])

            // Set right to current
            currCentralLocal += 1
            adjustClasses(elements[currCentralLocal].props.id, ["central-frame"], ["right-frame-blurred"])

            // Set right from right to right from current
            if (currCentralLocal < lenElements - 1) {
                adjustClasses(elements[currCentralLocal+1].props.id, ["right-frame-blurred"], ["disappeared-element"])
            }
        }

        if (!isRight) {
            if (currCentralLocal < lenElements - 1) {
                let nextElemIdx = currCentralLocal + 1
                adjustClasses(elements[nextElemIdx].props.id, ["disappeared-element"], ["right-frame-blurred"])
            }

            // Set current to right
            adjustClasses(elements[currCentralLocal].props.id, ["right-frame-blurred"], ["central-frame"])

            // Set left to current
            currCentralLocal -= 1
            adjustClasses(elements[currCentralLocal].props.id, ["central-frame"], ["left-frame-blurred"])

            // Set left from left to left from current
            if (currCentralLocal > 0) {
                adjustClasses(elements[currCentralLocal-1].props.id, ["left-frame-blurred"], ["disappeared-element"])
            }
        }

        if (!isLeftVisible && currCentralLocal > 0){
            setIsLeftVisible(true)
        }

        if (currCentralLocal === 0) {
            setIsLeftVisible(false)
        }

        if (!isRightVisible && currCentralLocal < lenElements - 1){
            setIsRightVisible(true)
        }

        if (currCentralLocal === lenElements - 1) {
            setIsRightVisible(false)
        }

        currCentral.current = currCentralLocal 
    }
    
    return (
        <div className="carousel">  
            <input onClick={() => arrowHandler(false)} type="image" className={`carousel-arrow arrow-left ${!isLeftVisible ? "hidden-element" : ""}`} src={images["arrow.svg"]} /> 
            {elements}
            <input onClick={() => arrowHandler(true)} type="image" className={`carousel-arrow arrow-right ${!isRightVisible ? "hidden-element" : ""}`}  src={images["arrow.svg"]} /> 
        </div>
    )
}

export default Carousel;