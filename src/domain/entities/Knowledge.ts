import { Tags } from "./Tags";

export type KnowledgeProps = {
    id: string;
    name: string;
    level: number;
    relatedAttribute: "body" | "mind" | "reflexes" | "emotion" | "energy";
    description: string | undefined;
    tags: Tags[];
}

export class Knowledge {
    private constructor(private props: KnowledgeProps) {}

    public static create(name: string, level: number, relatedAttribute: "body" | "mind" | "reflexes" | "emotion" | "energy", description?: string, tags?: Tags[]) {
        const emptyTags: Tags[] = []
        const props: KnowledgeProps = {
            id: crypto.randomUUID().toString(),
            name,
            level,
            relatedAttribute,
            description,
            tags: tags ? tags : emptyTags,
        };
        return new Knowledge(props);
    }

    public static assemble(props: KnowledgeProps) {
        return new Knowledge(props);
    }
    public toPersistence(): KnowledgeProps {
        return structuredClone(this.props);
    }

    public toJSON(): KnowledgeProps {
        return {
            id: this.props.id,
            name: this.props.name,
            level: this.props.level,
            relatedAttribute: this.props.relatedAttribute,
            description: this.props.description,
            tags: this.props.tags,
        };
    }
    public updateName(name: string) {
        this.props.name = name;
    }
    public upgradeLevel() {
        this.props.level += 1;
    }
    public updateRelatedAttribute(relatedAttribute: "body" | "mind" | "reflexes" | "emotion" | "energy") {
        this.props.relatedAttribute = relatedAttribute;
    }
    public updateDescription(description: string) {
        this.props.description = description;
    }
    public updateTags(tags: Tags[]) {
        this.props.tags = tags;
    }

    public clearTags() {
        this.props.tags = [];
    }

    public addTag(name: string, color: string, description?: string) {
        const tag = Tags.create(name, color, description);

        if(!this.props.tags.find(t => t.name === name)) {
            this.props.tags.push(tag);
        }
    }
    public removeTag(tagId: string) {
        this.props.tags = this.props.tags.filter(t => t.id !== tagId);
    }

    // Getters
    public get id() {
        return this.props.id;
    }

    public get name() {
        return this.props.name;
    }

    public get level() {
        return this.props.level;
    }
    public get relatedAttribute() {
        return this.props.relatedAttribute;
    }
    public get description() {
        return this.props.description;
    }
    public get tags() {
        return this.props.tags;
    }
    
}