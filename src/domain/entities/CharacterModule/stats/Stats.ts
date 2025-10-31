import { HealthReserve } from "./HealthReserve"
import { KnowledgeReserve } from "./KnowledgeReserve"

export type StatsProps = {
    id: string
    healthReserve: HealthReserve
    knowledge: KnowledgeReserve
    lastUpdate?: Date
}

export class Stats{
    private constructor(private readonly props: StatsProps){}

    public static create(health:number, knowledgePoints: number): Stats{
        const id = crypto.randomUUID().toString()

        const healthReserve = HealthReserve.create(health)
        const knowledge = KnowledgeReserve.create(knowledgePoints)

        return new Stats({id, healthReserve, knowledge})
    }

    public static fromPersistence(props:StatsProps):Stats{
        return new Stats(props)
    }

    public toPersistence():StatsProps{
        return this.props
    }

    public toJSON():StatsProps{
        return this.props
    }

    public touch(){
        this.lastUpdate = new Date()
    }


    //Getters
    public get lastUpdate():Date | undefined{
        return this.props.lastUpdate
    }
    
    public get healthReserve():HealthReserve{
        return this.props.healthReserve
    }

    public get editHealth():HealthReserve{
        this.touch()
        return this.healthReserve
    }

    public get knowledge():KnowledgeReserve{
        return this.props.knowledge
    }

    public get editKnowledge():KnowledgeReserve{
        this.touch()
        return this.props.knowledge
    }


    //Setters
    private set lastUpdate(newDate: Date){
        this.props.lastUpdate = newDate
    }


}