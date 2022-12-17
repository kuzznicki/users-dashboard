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

export function assertUser(user: User): asserts user is User {
    if (typeof user !== 'object') throw new Error('Invalid user data.');
    
    const requiredProps: { name: keyof User, type: string }[] = [
        { name: 'id', type: 'number'},
        { name: 'name', type: 'string' },
        { name: 'username', type: 'string' },
        { name: 'email', type: 'string' },
    ];
    
    requiredProps.forEach(prop => {
        if (typeof user[prop.name] !== prop.type) throw new Error(`Invalid user ${prop.name}.`);
    });

    if (user.address && typeof user.address.city !== 'string') throw new Error('Invalid user address.');
}

export type FetchStatus = 'idle' | 'loading' | 'complete' | 'failed';