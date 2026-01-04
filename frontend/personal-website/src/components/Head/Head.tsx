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
        const timeout = setTimeout
        (
            modifyPhraseDisplayed, 
            100
        )
        return () => clearTimeout(timeout);
    }, [currentPhrase,phraseIterIdx, phraseIdx, isDelete])

    return (
        <>  
            <section id="home" className="section-head">
                <div className="container-head">
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
                        <div className="personal-links">
                            <a className="personal-link" href="#">
                                <svg className="personal-link-icon" viewBox="0 0 98 96"> 
                                    <path d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/>
                                </svg>
                            </a>
                            <a className="personal-link" href="#">
                                <svg className="personal-link-icon" fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="4.983" cy="5.009" r="2.188" />
                                    <path
                                        d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z" />
                                </svg>
                            </a>
                            <a className="personal-link" style={{width: "100vw"}} href="#">
                                <svg style={{marginTop: "4px", width: "45px"}} className="personal-link-icon" id="svg8" version="1.1" viewBox="4.096 111.616 502.784 288.768" xmlns="http://www.w3.org/2000/svg">
                                    <title id="title833">CV</title>
                                    <defs id="defs2"/>
                                    <g id="layer6">
                                        <path id="path2" d="m 249.17973,328.32402 c -9.78758,15.38441 -19.17851,30.4337 -40.22128,45.05521 -11.25687,7.89055 -37.16464,23.30604 -73.9908,23.30604 -70.258325,0 -126.9676516,-51.07979 -126.9676516,-140.88446 0,-78.48565 53.3447156,-140.48607 128.4662816,-140.48607 30.4337,0 57.47396,10.52167 77.38654,26.30447 18.41392,14.65033 27.03796,29.30348 34.56291,42.45573 l -52.58013,26.27338 c -3.76134,-8.62631 -8.28954,-17.64933 -19.91259,-27.40585 -12.78437,-10.15549 -25.53991,-13.15224 -36.45998,-13.15224 -42.821335,0 -65.364452,39.82459 -65.364452,84.14459 0,58.23852 29.700162,87.14305 65.364452,87.14305 34.5629,0 48.47976,-24.0418 57.47396,-39.42563 l 52.24332,26.67235 z M 433.37382,123.57317 H 504 L 411.96314,388.7947 H 344.36647 L 253.46212,123.57317 h 70.62446 l 54.84337,188.60017 z"/>
                                    </g>
                                </svg>
                            </a>
                        </div>
                 </div>
            </section>
        </>
    )
}


export default HeadSection;