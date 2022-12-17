import { isUser, User } from '../types';

const API_URL = 'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data';
let maxId = 0;
const generateId = () => ++maxId; // API doesn't return the id

export default {
    getUsers: async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error(response.statusText);
    
            const json = await response.json();
    
            const users: User[] = json.map((userData: any) => {
                if (isUser(userData)) {
                    return apiDataToUser(userData);
                } else {
                    throw new Error('Invalid user data.');
                }
            });

            maxId = Math.max(...users.map(user => user.id));
            
            return users;
            
        } catch (e) {
            throw new Error('Failed to fetch users.');
        }
    },
    postUser: async (user: Omit<User, 'id'>) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });
            if (!response.ok) throw new Error(response.statusText);
    
            const json = await response.json();
            json.id = generateId(); 
            if (!isUser(json)) throw new Error('Invalid user data.');
                
            return apiDataToUser(json);

        } catch (e) {
            throw new Error('Failed to post user.');
        }
    },
    patchUser: async (user: User) => {
        try {
            const response = await fetch(`${API_URL}/${user.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });
            if (!response.ok) throw new Error(response.statusText);
    
            const json = await response.json();
            if (!isUser(json)) throw new Error('Invalid user data.');

            return apiDataToUser(json);

        } catch (e) {
            throw new Error('Failed to patch user.');
        }
    },
    deleteUser: async (id: number) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error(response.statusText);
            return id;

        } catch (e) {
            throw new Error('Failed to delete user.');
        }
    }
}

function apiDataToUser(userData: User): User {
    return {
        id: userData.id,
        name: userData.name,
        username: userData.username,
        email: userData.email,
        address: userData.address ? { city: userData.address.city } : { city: '(empty)' },
    };
}