export type TagsProps = {
    id: string;
    name: string;
    description: string | undefined;
    color: string;
}

export class Tags {
    private constructor(private props: TagsProps) {}
    public static create(name: string, color: string, description?: string) {
        const props: TagsProps = {
            id: crypto.randomUUID().toString(),
            name,
            description,
            color
        };
        return new Tags(props);
    }
    public static assemble(props: TagsProps) {
        return new Tags(props);
    }
    public toPersistence() {
        return structuredClone(this.props);
    }

    public toJSON() {
        return {
            id: this.props.id,
            name: this.props.name,
            description: this.props.description,
            color: this.props.color
        };
    }

    public updateName(name: string) {
        this.props.name = name;
    }

    public updateDescription(description: string) {
        this.props.description = description;
    }

    public updateColor(color: string) {
        this.props.color = color;
    }

    public get id() {
        return this.props.id;
    }

    public get name() {
        return this.props.name;
    }

    public get description() {
        return this.props.description;
    }

    public get color() {
        return this.props.color;
    }
}