interface User {
    passwordHash: string;
    id: number;
    username: string;
    password: string;
    role?: Role;
}
export enum Role {
    ADMIN = 'admin',
    USER = 'user',
}

const users: User[] = [];

export default users;