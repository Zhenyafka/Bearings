interface User {
    passwordHash: string;
    id: number;
    username: string;
    password: string;
    role?: Role;
}


export enum Role {
    Admin = 'admin',
    User = 'user'
}

const users: User[] = [];

export default users;