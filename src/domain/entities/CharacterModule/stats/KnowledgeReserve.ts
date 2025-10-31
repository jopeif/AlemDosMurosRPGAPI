export type KnowledgeReserveProps = {
    reserve:number
    points:number
}

export class KnowledgeReserve{

    private constructor(private readonly props:KnowledgeReserveProps){}

    public static create(value: number):KnowledgeReserve{
        return new KnowledgeReserve({reserve:value, points:value})
    }

    public static fromPersistence(props:KnowledgeReserveProps):KnowledgeReserve{
        return new KnowledgeReserve(props)
    }

    public useReserve(amount:number):number{
        const value = Math.max(0, (this.reserve-amount))
        this.reserve = value
        return value 
    }

    public usePoints(amount:number):number{
        const value = Math.max(1, this.points - amount)
        this.points = value
        if(this.reserve > this.points){
            this.reserve= this.points
        }
        return this.points
    }



    public healReserve(amount:number):number{
        const value = Math.max(this.points, this.reserve+amount)
        this.points = value
        return value
    }

    public healPoints(amount:number):number{
        this.points += amount
        this.reserve += amount
        return this.points
    }

    public healReserveTotal():number{
        this.reserve = this.points
        return this.reserve
    }

    
    




    //GETTERS
    public get reserve():number{
        return this.props.reserve
    }

    public get points():number{
        return this.props.points
    }

    //SETTERS
    private set reserve(value:number){
        if(value>=0 && value<=this.points)
            this.props.reserve = value
    }

    private set points(value:number){
        if(value>=0)
            this.props.points = value
    }
}