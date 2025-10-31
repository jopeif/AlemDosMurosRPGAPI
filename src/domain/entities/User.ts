import validator from 'validator';
import { UserRoles } from "./enums/UserRoles";
import { ProfilePicture } from "./media/ProfilePicture";

export type UserType = {
    id: string;
    userName: string;
    firstName: string;
    lastName: string
    profilePicture?: ProfilePicture;
    email: string;
    passwordHash: string;
    roles: UserRoles[];
    isBlocked: boolean;
    createdAt: Date;
    updatedAt?: Date;
    lastLogin?: Date;
}

export class User{
    private constructor(private readonly props: UserType) {}


    public static create(userName: string, firstName: string, lastName: string, email: string, passwordHash: string, rolesArray: string[]){

        //VALIDAÇÕES
        if(!validator.isEmail(email)){
            throw new Error("O email must be valid.")
        }
        if(validator.isEmpty(userName.trim())){
            throw new Error("Username must not be empty.")
        }
        if(validator.isEmpty(firstName.trim())){
            throw new Error("First Name must not be empty.")
        }

        //Criei o ID.
        const id = crypto.randomUUID().toString()

        //Conferi quais roles o usuário criado tem.
        let roles: UserRoles[] = [UserRoles.USER];
        if(rolesArray.includes("ADMIN")){
            roles.push(UserRoles.ADMIN)
        }
        if(rolesArray.includes("GM")){
            roles.push(UserRoles.GM)
        }

        const isBlocked = false
        const createdAt = new Date()

        return new User({
            id,
            userName,
            firstName,
            lastName,
            email,
            passwordHash,
            roles,
            isBlocked,
            createdAt,
        })      
    }

    public static fromPersistence(props: UserType): User {
        return new User(props);
    }

    public static validatePassword(password: string): boolean {
        if(validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })){
            return true
        }
        return false
    }

    public changeProfilePicture(profilePictureUrl: string): void {
        this.props.profilePicture = ProfilePicture.create(profilePictureUrl);
        this.touch()
    }

    public addRole(role: "GM" | "ADMIN"):boolean{
        if(role === "GM"){
            if(this.roles.includes(UserRoles.GM)){
                return false
            }
            this.roles.push(UserRoles.GM)
            this.touch()
            return true
        } else if(role === "ADMIN"){
            if(this.roles.includes(UserRoles.ADMIN)){
                return false
            }
            this.roles.push(UserRoles.ADMIN)
            this.touch()
            return true
        }   else {
            return false
        }

    }

    public removeRole(role: "GM" | "ADMIN"):boolean{
        if(role==="GM"){
            if(this.roles.includes(UserRoles.GM)){
                const index = this.roles.findIndex(r => r===UserRoles.GM)
                this.roles.splice(index, 1)
                this.touch()
                return true
            }
        }else if(role==="ADMIN"){
            if(this.roles.includes(UserRoles.ADMIN)){
                const index = this.roles.findIndex(r => r===UserRoles.ADMIN)
                this.roles.splice(index, 1)
                this.touch()
                return true
            }
        }
        return false
    }

    public toggleIsBlocked(){
        this.isBlocked = !this.isBlocked
    }

    public touch(){
        this.updatedAt = new Date()
    }

    //GETTERS

    public get toPersistance(){
        return this.props
    }



    public get id(): string {
        return this.props.id;
    }
    public get userName(): string {
        return this.props.userName;
    }
    public get firstName(): string {
        return this.props.firstName;
    }
    public get lastName(): string {
        return this.props.lastName;
    }
    public get fullName(): string {
        return `${this.props.firstName} ${this.props.lastName}`;
    }

    public get profilePicture(): ProfilePicture | undefined {
        return this.props.profilePicture;
    }

    public get email(): string {
        return this.props.email;
    }
    public get passwordHash(): string {
        return this.props.passwordHash;
    }
    public get roles(): UserRoles[] {
        return this.props.roles;
    }

    public get isBlocked():boolean{
        return this.props.isBlocked
    }

    public get createdAt(): Date {
        return this.props.createdAt;
    }

    public get updatedAt(): Date | undefined {
        return this.props.updatedAt;
    }

    public get lastLogin(): Date | undefined {
        return this.props.lastLogin;
    }


    //SETTER

    public set isBlocked(state: boolean){
        this.props.isBlocked = state
    }

    public set updatedAt(newDate: Date){
        this.props.updatedAt = newDate
    }
}