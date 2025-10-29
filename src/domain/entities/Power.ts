//this file is a placeholder for the Power entity referenced in Character.ts, eventually to be implemented

import { Tags } from "./Tags";

export type PowerProps = {
    id: string;
    name: string;
    description: string | undefined;
    type: "passive" | "active";
    tags: Tags[];
}

export class Power {
    private constructor(private props: PowerProps) {}

    public static create(name: string, description: string | undefined, type: "passive" | "active", tags?: Tags[]) {
        const emptyTags: Tags[] = []
        const props: PowerProps = {
            id: crypto.randomUUID().toString(),
            name,
            description,
            type,
            tags: tags ? tags : emptyTags
        };
        return new Power(props);
    }

    public static assemble(props: PowerProps) {
        return new Power(props);
    }

    public toPersistence() {
        return structuredClone(this.props);
    }

    public toJSON() {
        return {
            id: this.props.id,
            name: this.props.name,
            description: this.props.description,
            type: this.props.type,
            tags: this.props.tags,
        };
    }

    public updateName(name: string) {
        this.props.name = name;
    }

    public updateDescription(description: string | undefined) {
        this.props.description = description;
    }

    public updateType(type: "passive" | "active") {
        this.props.type = type;
    }

    //Getters
    public get id() {
        return this.props.id;
    }
    public get name() {
        return this.props.name;
    }
    public get description() {
        return this.props.description;
    }
    public get type() {
        return this.props.type;
    }

    public get tags() {
        return this.props.tags;
    }

}