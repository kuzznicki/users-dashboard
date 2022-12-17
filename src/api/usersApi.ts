import { isUser, User } from '../types';

const API_URL = 'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data';

export default {
    getUsers: async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error(response.statusText);
    
            const json = await response.json();
    
            const users: User[] = json.map((userData: any) => {
                if (isUser(userData)) {
                    const { id, name, username, email, address } = userData;
                    
                    const user = { id, name, username, email } as User;
                    if (address && address.city) user.address = { city: address.city };
                    return user;
                } else {
                    throw new Error('Invalid user data.');
                }
            });
    
            return users;
        } catch (e) {
            throw new Error('Failed to fetch users data from the API.');
        }
    }
}
