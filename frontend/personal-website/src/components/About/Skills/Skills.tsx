import "./Skills.css"
import images from "../../../../public/exporter";

// Constants
const skillsPerRow = 4;
const skillTypesLimit = 2;

interface SkillsProps {
    skillsMap: Map<string, Array<string>>;
}


const arrangeSkills = (skills: Array<string>) => {
    var rowRange: Array<number> = [];
    
    for (var rowId = 0; rowId < Math.ceil(skills.length / skillsPerRow); rowId++) {
        rowRange.push(rowId)
    }

    return (
        rowRange.map((colId: number) =>
            <div className="skills-row">
                {
                    skills.slice(colId * skillsPerRow, (colId + 1) * skillsPerRow).map(
                        skill => <div className="skill">{skill}</div>
                    )   
                }
            </div>
        )
    )
}

const skillsPerKey = (skillsMap: Map<string, Array<string>>) => {
    var skillsMapKeys = Array.from(skillsMap.keys())
    return (
        skillsMapKeys.map((key: string, idx: number) => 
            idx < skillTypesLimit ?
                <div className="col">
                    <div className="skills-box">
                        <div className="skills-row">
                            <img className="terminal-pic" src={images["terminal.svg"]}></img>
                            <div className="skills-header"><b>{key}</b></div>
                        </div>
                        {arrangeSkills(skillsMap.get(key) ?? [])}
                    </div>
                </div>
                : <div></div>
        )
    )
}

const Skills = ({skillsMap}: SkillsProps) => {

    if (skillsMap.keys.length > skillTypesLimit) {
        throw new Error(`
            Skills Map provided to the 'Skills' component has more skill 
            types than the number supported -> ${skillTypesLimit}!`
        )
    }


    return (
        skillsPerKey(skillsMap)
    )
}


export default Skills