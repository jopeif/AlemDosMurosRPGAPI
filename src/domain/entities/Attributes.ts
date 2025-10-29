export type AttributesProps = {
    body: number;
    mind: number;
    reflexes: number;
    emotion: number;
    energy: number;
}

export class Attributes {
    private constructor(private props: AttributesProps) {}
    public static create(body: number, mind: number, reflexes: number, emotion: number, energy: number) {
        if(body < 0 || mind < 0 || reflexes < 0 || emotion < 0 || energy < 0) {
            throw new Error("Attributes values must be non-negative");
        }

        const props: AttributesProps = {
            body,
            mind,
            reflexes,
            emotion,
            energy
        };
        return new Attributes(props);
    }
    public static assemble(props: AttributesProps) {
        return new Attributes(props);
    }
    public toPersistence(): AttributesProps {
        return structuredClone(this.props);
    }

    public toJSON(): AttributesProps {
        return {
            body: this.props.body,
            mind: this.props.mind,
            reflexes: this.props.reflexes,
            emotion: this.props.emotion,
            energy: this.props.energy
        };
    }

    public updateBody(body: number) {
        this.props.body = body;
    }
    public updateMind(mind: number) {
        this.props.mind = mind;
    }
    public updateReflexes(reflexes: number) {
        this.props.reflexes = reflexes;
    }
    public updateEmotion(emotion: number) {
        this.props.emotion = emotion;
    }
    public updateEnergy(energy: number) {
        this.props.energy = energy;
    }

    public get body() {
        return this.props.body;
    }
    public get mind() {
        return this.props.mind;
    }
    public get reflexes() {
        return this.props.reflexes;
    }
    public get emotion() {
        return this.props.emotion;
    }
    public get energy() {
        return this.props.energy;
    }
}