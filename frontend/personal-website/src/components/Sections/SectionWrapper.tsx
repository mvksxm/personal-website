import "./SectionWrapper.scss"
import images from "../../../public/exporter"
import { useEffect, useRef, type ReactNode } from 'react'; 

interface Props { 
    sectionId: string,  
    children: ReactNode;
}

const SectionWrapper = ({sectionId, children}: Props) => {
    
    const isRecentlyObservedRef = useRef(false);

    const animateImages = (images: Array<HTMLImageElement>, isRollback: boolean = false) => {
        
        // const getMainClass = (populatedClass: string) => populatedClass.split(" ")[0]
        images.forEach(image => {

            var isLeft = image.id.includes("left")

            if (!isRollback) {
                // image.className = getMainClass(image.className)
                // image.className = `${getMainClass(image.className)} rollout-animation-${isLeft ? "left" : "right"}`
                image.classList.remove(`rollback-animation-${isLeft ? "left" : "right"}`)
                image.classList.add(`rollout-animation-${isLeft ? "left" : "right"}`)
            }

            if (isRollback) {
                // image.className = getMainClass(image.className)
                // image.className = `${getMainClass(image.className)} rollback-animation-${isLeft ? "left" : "right"}`
                image.classList.remove(`rollout-animation-${isLeft ? "left" : "right"}`)
                image.classList.add(`rollback-animation-${isLeft ? "left" : "right"}`)
            }
        })
    }

    const sectionListen = (filteredImages: Array<HTMLImageElement>) => {
        
        let monitoredSection = document.getElementById(sectionId)
        const observer = new IntersectionObserver(
            (sections) => {
                sections.forEach(section => {

                    if (section.intersectionRatio >= 0.5 && section.isIntersecting) {
                        isRecentlyObservedRef.current = true;
                        animateImages(filteredImages)
                    }


                    if (section.intersectionRatio < 0.5  && isRecentlyObservedRef.current ) {
                        console.log("No advance intersection")
                        isRecentlyObservedRef.current = false; 
                        animateImages(filteredImages, true)
                    }

                })

            },
            {
                threshold: 0.5
            }
        )

        if (monitoredSection) {
            observer.observe(monitoredSection)
        } else {
            throw Error(`Section with the following id - ${sectionId} does not exist!`)
        }
    }

    useEffect(() => {  
            var allImages = document.querySelectorAll("img")
            var filteredImages = Array.from(allImages).filter(
                img => img.id.startsWith("cloud-animated") 
                       && img.id.endsWith(sectionId) 
            )
            sectionListen(filteredImages)
        }, []
    )

    return (
        <div className="shared-bg">
            <img id={`cloud-animated-left-top-${sectionId}`} src={images["cloud-trans-left.png"]} className="cloud"></img>
            <img id={`cloud-animated-left-bottom-${sectionId}`} src={images["cloud-trans-left.png"]} className="cloud"></img>
            <img id={`cloud-animated-right-top-${sectionId}`} src={images["cloud-trans-right.png"]} className="cloud"></img>
            <img id={`cloud-animated-right-bottom-${sectionId}`} src={images["cloud-trans-right.png"]} className="cloud"></img>
            <img id={`section-divider-${sectionId}`} src={images["section-divider-cropped.svg"]} className="section-divider"></img>
            <section id={sectionId} className="section">
                {children}
            </section>
            <hr />
        </div>
    )
}


export default SectionWrapper;
 