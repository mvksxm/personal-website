import "./Head.css"
import { useEffect, useState } from "react"

const HeadSection = () => {

    const phrasesToDisplay = [
        `echo "I'm a Software Engineer"`,
        `echo "Platform Engineer"`, 
        `echo "Cloud Engineer"`
    ]

    const [currentPhrase, changeCurrentPhrase] = useState("")
    const [phraseIterIdx, changeIterIdx] = useState(0)
    const [phraseIdx, changePhraseIdx] = useState(0)
    const [isDelete, setIsDelete] = useState(false)


    // const modifyPhraseDisplayed = () => {

    //     // Change back to the initial phrase.
    //     if (phraseIdx >= phrasesToDispaly.length) {
    //         changePhraseIdx(0)
    //     }

    //     const phraseToDisplay = phrasesToDispaly[phraseIdx]
    //     var displayedContent = ""

    //     for(var i = 0; i<phraseToDisplay.length; i++) {
    //         displayedContent += phraseToDisplay[i]
    //         changeCurrentPhrase(displayedContent)
    //     }

    //     for(var i = phraseToDisplay.length - 1; i>=0; i--) {
    //         displayedContent = displayedContent.slice(0,i)
    //         changeCurrentPhrase(displayedContent)
    //     }

    //     changePhraseIdx(phraseIdx + 1)
    // }

    const modifyPhraseDisplayed = () => {
        
        var currPhrase = phrasesToDisplay[phraseIdx]

        if (phraseIterIdx === currPhrase.length) {
            setIsDelete(true)
            changeIterIdx(currPhrase.length - 1)
            return
        }

        if (isDelete && phraseIterIdx < 0) {
            setIsDelete(false)
            changePhraseIdx((phraseIdx + 1) % phrasesToDisplay.length)
            changeIterIdx(0)
            return
        }

        if (isDelete) {
            changeCurrentPhrase(currPhrase.slice(0, phraseIterIdx))
            changeIterIdx(i=> i - 1)
        } 
        else {
            changeCurrentPhrase(currPhrase.slice(0, phraseIterIdx+1))
            changeIterIdx(i => i + 1 )
        }

    }

    useEffect(() => {
        console.log("triggered")
        const timeout = setTimeout
        (
            modifyPhraseDisplayed, 
            100
        )
        return () => clearTimeout(timeout);
    }, [currentPhrase,phraseIterIdx, phraseIdx, isDelete])

    return (
        <>  
            <section className="section-head">
                <div className="container-head">
                    <div className="row row-cols-1" style={{"marginBottom":"200px"}}>
                        <h4 className="head-text">Greetings! My name is</h4>
                        <h1 className="head-text head-name">Maksim Turtsevich</h1>
                        <div className="terminal space terminal-shadow">
                            <div className="top">
                                <div className="btns">
                                    <span className="circle red"></span>
                                    <span className="circle yellow"></span>
                                    <span className="circle green"></span>
                                </div>
                                <div className="title">bash</div>
                            </div>
                            <pre className="terminal-body">
                                {`> ${currentPhrase}`}
                            </pre>
                        </div>
                    </div>
                 </div>
            </section>
        </>
    )
}


export default HeadSection;