class HttpRequestManager {
    private static instance: HttpRequestManager;
    private apiUrl: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private cache: Map<string, any>; // In-memory cache

    private constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
        this.cache = new Map();
    }

    static initialize(apiUrl: string): HttpRequestManager {
        if (!HttpRequestManager.instance) {
            HttpRequestManager.instance = new HttpRequestManager(apiUrl);
        }
        return HttpRequestManager.instance;
    }

    static getInstance(): HttpRequestManager {
        if (!HttpRequestManager.instance) {
            throw new Error('HttpRequestManager has not been initialized with an API URL.');
        }
        return HttpRequestManager.instance;
    }

    async request<T>(
        endpoint: string,
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
        body: unknown = null,
        headers: Record<string, string> = {},
    ): Promise<T> {
        const url = `${this.apiUrl}${endpoint}`;

        // Check cache first
        if (method === 'GET' && this.cache.has(url)) {
            return this.cache.get(url);
        }

        const config: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: body ? JSON.stringify(body) : null,
        };

        try {
            const response = await fetch(url, config);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            // Cache the response for GET requests
            if (method === 'GET') {
                this.cache.set(url, data);
            }

            return data;
        } catch (error) {
            console.error(`Request to ${url} failed:`, error);
            throw error;
        }
    }

    // Optional method to clear cache if needed
    clearCache() {
        this.cache.clear();
    }
}

export default HttpRequestManager;
