import { User } from './User';
import { Knowledge } from "./Knowledge";
import { Power } from "./Power";
import { Tags } from './Tags';
import { Attributes } from './Attributes';

export type CharacterProps = {
    id: string;
    name: string;
    age: number;
    occupation: string;
    level: number;
    attributes: Attributes
    hp: {
      current: number;
      max: number;
    };
    knlg:{
      reserve: number;
      points: number;
    },

    knowledge: Knowledge[];
    powers: Power[];
    player: User;
    levelUpAvailable: boolean;
    status: "alive" | "dead" | "unknown";
    createdAt: Date;
    lastUpdate?: Date;
}

export class Character {
    private constructor(private props: CharacterProps) {}

    public static create(
        name: string,
        age: number,
        occupation: string,
        attributes: {
          body: number,
          mind: number,
          reflexes: number,
          emotion: number,
          energy: number
        },
        player: User
    ): Character {
      
      const id = crypto.randomUUID().toString()
      const level = 1
      const attributesInstance = Attributes.create(
        attributes.body,
        attributes.mind,
        attributes.reflexes,
        attributes.emotion,
        attributes.energy
      )
      const hp = {
        current: this.calculateHP(attributes.body, attributes.energy, level),
        max: this.calculateHP(attributes.body, attributes.energy, level)
      }
      const knlg = {
        reserve: 5,
        points: 5
      }
      const knowledge:Knowledge[] = []
      const powers:Power[] = []
      const levelUpAvailable = false
      const status = "alive"
      const createdAt = new Date()

      const characterInstance = new Character({
        id,
        name,
        age,
        occupation,
        level,
        attributes:attributesInstance,
        hp,
        knlg,
        knowledge,
        powers,
        player,
        levelUpAvailable,
        status,
        createdAt
      })
      return characterInstance


    }


    public static calculateHP(body: number, energy: number, level: number, extra?:number):number{
      let total = body+energy+level

      if(extra){
        total+=extra
      }

      return total
    }

    public static assemble(props: CharacterProps) {
        return new Character(props);
    }

    public toPersistence(): CharacterProps {
      return structuredClone(this.props);
    }

    public toJSON() {
      return {
        ...this.props,
        attributes: this.props.attributes.toJSON(),
        knowledge: this.props.knowledge.map(k => k.toJSON()),
        powers: this.props.powers.map(p => p.toJSON()),
      };
    }

    public getKnowledgeTags(): Tags[]{
      const tagsSet: Set<string> = new Set();
      const tagsArray: Tags[] = [];
      this.props.knowledge.forEach(knowledge => {
        knowledge.tags.forEach(tag => {
          if (!tagsSet.has(tag.id)) {
            tagsSet.add(tag.id);
            tagsArray.push(tag);
          }
        });
      });
      return tagsArray;
    }

    public getPowerTags(): Tags[]{
      const tagsSet: Set<string> = new Set();
      const tagsArray: Tags[] = [];
      this.props.powers.forEach(power => {
        power.tags.forEach(tag => {
          if (!tagsSet.has(tag.id)) {
            tagsSet.add(tag.id);
            tagsArray.push(tag);
          }
        });
      });
      return tagsArray;
    }

    public touch(): void {
      this.props.lastUpdate = new Date();
    }

    public createKnowledge(name: string, level: number, relatedAttribute: "body" | "mind" | "reflexes" | "emotion" | "energy", description?: string, tags?: Tags[]): void {
      if (this.props.knlg.points < 1) {
        throw new Error("Not enough knowledge points");
      }
      const newKnowledge = Knowledge.create(name, level, relatedAttribute, description, tags);
      this.props.knowledge.push(newKnowledge);
      this.props.knlg.points -= 1;
      this.touch();
    }

    public upgradeKnowledge(knowledgeId: string): void {
      const knowledge = this.props.knowledge.find(k => k.id === knowledgeId);
      if (!knowledge) {
        throw new Error("Knowledge not found");
      }
      if (this.props.knlg.points < 1) {
        throw new Error("Not enough knowledge points");
      }
      knowledge.upgradeLevel();
      this.spendKnowledgePoint();
      this.touch();
    }


    public spendKnowledgePoint(): void {
      if (this.props.knlg.points < 1) {
        throw new Error("Not enough knowledge points");
      }
      this.props.knlg.points -= 1;
    }

    public gainKnowledgePoint(): void {
      this.props.knlg.points += 1;
    }

    public createPower(name: string, description: string | undefined, type: "passive" | "active", tags?: Tags[]): void {
      const newPower = Power.create(name, description, type, tags);
      this.props.powers.push(newPower);
      this.touch();
    }

    public toggleLevelUpAvailability(): void {
      this.props.levelUpAvailable = !this.props.levelUpAvailable;
      this.touch();
    }

    public takeDamage(amount: number) {
      this.props.hp.current = Math.max(0, this.props.hp.current - amount);
      this.touch();
    }

    public heal(amount: number) {
      this.props.hp.current = Math.min(this.props.hp.max, this.props.hp.current + amount);
      this.touch();
    }

    //Getters
    public get id() {
      return this.props.id;
    }
    public get player() {
      return this.props.player;
    }
    public get level() {
      return this.props.level;
    }
    public get attributes() {
      return this.props.attributes;
    }

    

}