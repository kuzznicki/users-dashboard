export const userRequiredProps = ['id', 'name', 'username', 'email'] as const;
export type UserRequiredProp = (typeof userRequiredProps[number]) & (keyof User);
export type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    address?: {
        city: string;
    };
};

export function isUser(user: any): user is User {
    return user 
        && typeof user.id === 'number' 
        && typeof user.name === 'string' && user.name.trim() !== ''
        && typeof user.username === 'string' && user.username.trim() !== ''
        && typeof user.email === 'string' && user.email.trim() !== '';
}

export function assertUser(user: User): asserts user is User {
    if (typeof user !== 'object') throw new Error('Invalid user data.');
    if (user.address && typeof user.address.city !== 'string') throw new Error('Invalid user address.');
    
    const requiredProps: { name: keyof User, type: string }[] = [
        { name: 'id', type: 'number'},
        { name: 'name', type: 'string' },
        { name: 'username', type: 'string' },
        { name: 'email', type: 'string' },
    ];
    
    requiredProps.forEach(prop => {
        const val = user[prop.name]; 

        if (typeof val !== prop.type || (typeof val === 'string' && !val.trim().length)) {
            throw new Error(`Invalid user ${prop.name}.`);
        }
    });
}

export type FetchStatus = 'idle' | 'loading' | 'complete' | 'failed';