export type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    address?: {
        city?: string;
    };
}

export function isUser(user: any): user is User {
    return user 
        && typeof user.id === 'number' 
        && typeof user.name === 'string' 
        && typeof user.username === 'string' 
        && typeof user.email === 'string';
}