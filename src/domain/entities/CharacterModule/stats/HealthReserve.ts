export type HealthReserveProps = {
    current:number
    max:number
}

export class HealthReserve{

    private constructor(private readonly props:HealthReserveProps){}

    public static create(health: number):HealthReserve{
        return new HealthReserve({current:health, max:health})
    }

    public static fromPersistence(props:HealthReserveProps):HealthReserve{
        return new HealthReserve(props)
    }

    public takeDamage(amount:number):number{
        const value = Math.max(0, (this.current-amount))
        this.current = value
        return value 
    }

    public heal(amount:number):number{
        const value = Math.max(this.max, this.current+amount)
        this.current = value
        return value
    }

    public healTotal():number{
        this.current = this.max
        return this.current
    }

    public increaseMax(amount:number):number{
        this.max += amount
        this.current += amount
        return this.max
    }

    public decreaseMax(amount:number):number{
        const value = Math.max(1, this.max - amount)
        this.max = value
        if(this.current > this.max){
            this.current = this.max
        }
        return this.max
    }
    




    //GETTERS
    public get current():number{
        return this.props.current
    }

    public get max():number{
        return this.props.max
    }

    //SETTERS
    private set current(value:number){
        if(value>=0 && value<=this.max)
            this.props.current = value
    }

    private set max(value:number){
        if(value>0)
            this.props.max = value
    }
}