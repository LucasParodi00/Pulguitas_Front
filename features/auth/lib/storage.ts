// lib/storage.ts

const STORAGE_KEYS = {
    AUTH_TOKEN: 'auth_token',
    REDIRECT_URL: 'redirect_after_login',
} as const;

class StorageService {
    private isClient = typeof window !== 'undefined';

    // Auth Token
    getToken(): string | null {
        if (!this.isClient) return null;
        return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    }

    setToken(token: string): void {
        if (!this.isClient) return;
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    }

    removeToken(): void {
        if (!this.isClient) return;
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    }

    // Redirect URL
    getRedirectUrl(): string | null {
        if (!this.isClient) return null;
        return localStorage.getItem(STORAGE_KEYS.REDIRECT_URL);
    }

    setRedirectUrl(url: string): void {
        if (!this.isClient) return;
        localStorage.setItem(STORAGE_KEYS.REDIRECT_URL, url);
    }

    removeRedirectUrl(): void {
        if (!this.isClient) return;
        localStorage.removeItem(STORAGE_KEYS.REDIRECT_URL);
    }

    // Clear all auth data
    clearAuthData(): void {
        this.removeToken();
        this.removeRedirectUrl();
    }
}

export const storage = new StorageService();
export { STORAGE_KEYS };
