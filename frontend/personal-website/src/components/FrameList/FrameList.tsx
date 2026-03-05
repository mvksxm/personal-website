import { useEffect, useRef } from "react";
import type { StringDivProps } from "../../models/models";
import Utils from "../../utils/Utils";
import "./FrameList.css"


interface FrameListProps {
    elements: React.ReactElement<StringDivProps>[];
    baseClass: string;
}

const checkIsBelow = (element: Element): boolean => {
    const rect = element.getBoundingClientRect()
    return rect.top > window.innerHeight / 2
}

const FrameList = ({elements, baseClass}: FrameListProps) => {

    const scrollPosition = useRef(window.scrollY)
    const isScrollDown = useRef(true)

    const startObserver = (baseClass: string) => {
        var workFrames = document.getElementsByClassName(baseClass)
        const observer = new IntersectionObserver(
            (frames) => {
                frames.forEach(frame => {
                    let elem = frame.target
                    let elemId = elem.id

                    let frameIdSplitted = elemId.split("-")
                    let frameIdx = Number(frameIdSplitted[1])
                    let frameIdBase = frameIdSplitted[0]

                    if (frame.isIntersecting) {
                        console.log(`Intersection! Id - ${elemId}`)

                        // Adjust classes of a previous element on scroll down.
                        let prevFrameId = `${frameIdBase}-${frameIdx - 1}`
                        if (isScrollDown.current && document.getElementById(prevFrameId)) {
                            Utils.AdjustClasses(prevFrameId, ["top-position"], ["appear"])    
                        } 
                        
                        // Adjust classes of a next element on scroll up.
                        let nextFrameId = `${frameIdBase}-${frameIdx + 1}`
                        if (!isScrollDown.current && document.getElementById(nextFrameId)) {
                            Utils.AdjustClasses(nextFrameId, ["bottom-position"], ["appear"])  
                        }

                        let classToRemove = isScrollDown.current ? "bottom-position" : "top-position"

                        Utils.AdjustClasses(elemId, ["appear"], [classToRemove])
                        elem.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                            inline: 'center'
                        });
                    } 
                    else if (frameIdx === 0 && checkIsBelow(elem)) {
                        Utils.AdjustClasses(elemId, ["bottom-position"], ["appear"]) 
                    }
                })
            },
            {
                threshold: 0.6
            }
        )
        if (workFrames.length > 0) {
            for (let wf of workFrames) {
                observer.observe(wf)
            }
        } else {
            throw Error(`No elements containing the base class - ${baseClass} were found in the DOM.`)
        }
    }
     
    useEffect( 
        () => 
        {   

            // Make sure that all elements have a starting 'bottom-position' class by default
            for (var elem of elements) {
                Utils.AdjustClasses(elem.props.id, ["bottom-position"])
            }
            // Scroll Event Listener
            window.addEventListener('scroll', () => {

                if (window.scrollY > scrollPosition.current) {
                    isScrollDown.current = true
                } else if (window.scrollY < scrollPosition.current)  {
                    isScrollDown.current = false
                }
                scrollPosition.current = window.scrollY
            }, {passive: true})
            
            // Intersection Observer for the frames
            startObserver(baseClass)   
        },[]
    )

    return (
        <div>{elements}</div>
    )
}

export default FrameList