import { AttributesEnum } from "./Enums/Attributes"
import validator from 'validator';

export type KnowledgeProps = {
    id: string,
    name: string,
    level: number,
    relatedAttribute: AttributesEnum,
    description?: string,
    createdAt: Date,
    lastUpdate?: Date
}

export class Knowledge{
    private constructor(private readonly props:KnowledgeProps){}

    public static create(name: string, relatedAttributeString: string, description?:string):Knowledge{
        
        
        if(validator.isEmpty(name)){
            throw new Error("Name cannot be empty.")
        }

        if(validator.isEmpty(relatedAttributeString)){
            throw new Error("RelatedAttribute cannot be empty.")
        }
        
        const id = crypto.randomUUID().toString()
        const level = 1
        
        let relatedAttribute: AttributesEnum

        switch (relatedAttributeString.toUpperCase()) {
            case "BODY":
                relatedAttribute = AttributesEnum.BODY
                break;
            case "MIND":
                relatedAttribute = AttributesEnum.MIND
                break;
            case "ENERGY":
                relatedAttribute = AttributesEnum.ENERGY
                break;
            case "REFLEXES":
                relatedAttribute = AttributesEnum.REFLEXES
                break;
            case "EMOTION":
                relatedAttribute = AttributesEnum.EMOTION
                break;
            default:
                throw new Error("Invalid Attribute")
        }

        const createdAt = new Date()

        const props: KnowledgeProps = { id, name, level, relatedAttribute, createdAt }
        if (description) {
            props.description = description
        }

        return new Knowledge(props)

    }

    public static fromPersistence(props: KnowledgeProps):Knowledge{
        return new Knowledge(props)
    }

    public edit(editProps:{
        name?: string,
        relatedAttribute?: string,
        description?: string,
    }):Knowledge{
        if(editProps.name){
            this.name = editProps.name
            this.touch()
        }
        if(editProps.relatedAttribute){
            this.relatedAttribute = editProps.relatedAttribute
            this.touch()
        }
        if(editProps.description){
            this.description = editProps.description
            this.touch()
        }

        return this
    }

    public increaseLevel(amount:number):number{
        const level = this.level+amount

        if(level<=10){
            this.level=level
            this.touch()
        }
        else
            throw new Error("Knowledge level cannot be more than ten.")

        return this.level
    }

    public decreaseLevel(amount:number):number{
        const level = this.level-amount
        if(level>=1){
            this.level=level
            this.touch()
        }
        else
            throw new Error("Knowledge level cannot be less than one.")
        return this.level
    }

    public toPersistence():KnowledgeProps{
        return this.props
    }

    public toJSON():KnowledgeProps{
        return this.props
    }

    public touch(){
        this.props.lastUpdate = new Date()
    }

    //Getters
    public get id():string{
        return this.props.id
    }

    public get name():string{
        return this.props.name
    }

    public get relatedAttribute():AttributesEnum{
        return this.props.relatedAttribute
    }

    public get description():string | undefined{
        return this.props.description
    }


    public get level():number{
        return this.props.level
    }

    //Setters
    private set name(name:string){
        this.props.name=name
    }

    private set description(description:string){
        this.props.description=description
    }

    private set relatedAttribute(attribute:string){

        let relatedAttribute: AttributesEnum
        switch (attribute.toUpperCase()) {
            case "BODY":
                relatedAttribute = AttributesEnum.BODY
                break;
            case "MIND":
                relatedAttribute = AttributesEnum.MIND
                break;
            case "ENERGY":
                relatedAttribute = AttributesEnum.ENERGY
                break;
            case "REFLEXES":
                relatedAttribute = AttributesEnum.REFLEXES
                break;
            case "EMOTION":
                relatedAttribute = AttributesEnum.EMOTION
                break;
            default:
                throw new Error("Invalid Attribute")
        }

        this.props.relatedAttribute=relatedAttribute
    }
    

    private set level(level:number){
        if(!(level>10))
            this.props.level=level
    }


}