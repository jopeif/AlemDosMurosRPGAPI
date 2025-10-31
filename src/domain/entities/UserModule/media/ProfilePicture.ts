export type ProfilePictureProps = {
    id: string;
    url: string;
    createdAt: Date;
} 

export class ProfilePicture {
    private constructor(private readonly props: ProfilePictureProps) {}

    public static create(url: string): ProfilePicture {
        const id = crypto.randomUUID();
        const createdAt = new Date();
        const props: ProfilePictureProps = { id, url, createdAt };
        return new ProfilePicture(props);

    }

    public static fromPersistence(props: ProfilePictureProps): ProfilePicture {
        return new ProfilePicture(props);
    }
}

