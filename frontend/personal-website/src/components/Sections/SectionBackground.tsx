import "./SectionBackground.scss"
import images from "../../../public/exporter"
import { useEffect, useRef, type ReactNode, type RefObject } from 'react'; 

interface Props { 
    sectionRef: RefObject<Element | null>;  
    children: ReactNode;
}

const SectionBackground = ({sectionRef, children}: Props) => {
    
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

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }
    }


    useEffect(() => {  
            var allImages = document.querySelectorAll("img")
            var filteredImages = Array.from(allImages).filter(img => img.id.startsWith("cloud-"))
            sectionListen(filteredImages)
        }, []
    )

    return (
        <div className="shared-bg">
            <img id="cloud-left-top" src={images["cloud-trans-left.png"]} className="cloud"></img>
            <img id="cloud-left-bottom" src={images["cloud-trans-left.png"]} className="cloud"></img>
            <img id="cloud-right-top" src={images["cloud-trans-right.png"]} className="cloud"></img>
            <img id="cloud-right-bottom"src={images["cloud-trans-right.png"]} className="cloud"></img>
            {children}
        </div>
    )
}


export default SectionBackground;
 