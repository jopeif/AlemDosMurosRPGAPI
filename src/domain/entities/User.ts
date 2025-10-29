import { HashingService } from './../../infra/utils/hashingService/hashingService';
import validator from "validator"; 

export type UserProps = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isBlocked: boolean;
    lastLogin?: Date;
    lastUpdate?: Date;
    createdAt: Date;
}

export class User {
    private constructor(private props: UserProps) {}

    public static async create(firstName: string, lastName: string, email: string, password: string, hashing: HashingService) {
        if (!validator.isEmail(email)) {
            throw new Error("Invalid E-mail");
        }

        if (validator.isEmpty(firstName.trim())) {
            throw new Error("First name cannot be empty");
        }

        if (validator.isEmpty(lastName.trim())) {
            throw new Error("Last name cannot be empty");
        }

        if (!validator.isLength(password, { min: 8 })) {
            throw new Error("Password must be at least 8 characters long");
        }

        const hashedPassword = await hashing.hash(password);
        const props: UserProps = {
            id: crypto.randomUUID().toString(),
            firstName,
            lastName,
            email,
            password: hashedPassword,
            isBlocked: false,
            createdAt: new Date(),
        };
        return new User(props);
    }

    public static assemble(props: UserProps) {
        return new User(props);
    }

    public getProps() {
        return this.props;
    }

    public async verifyPassword(password: string, hashing: HashingService): Promise<boolean> {
        return hashing.compare(password, this.props.password);
    }

    public async updatePassword(newPassword: string, hashing: HashingService): Promise<void> {
        const hashedPassword = await hashing.hash(newPassword);
        this.props.password = hashedPassword;
        this.props.lastUpdate = new Date();
    }

    public toggleBlockStatus(): void {
        this.props.isBlocked = !this.props.isBlocked;
        this.props.lastUpdate = new Date();
    }

    public updateLastLogin(): void {
        this.props.lastLogin = new Date();
    }

}