export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const notAlphanumericOrSpaceRegex = /[^a-zA-Z0-9 ]/g;

export function generateUsername(name: string) {
    return name.trim().replace(notAlphanumericOrSpaceRegex, '').replaceAll(' ', '_').toLowerCase();
}