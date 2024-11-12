export class HttpRequestManager {
    private static instance: HttpRequestManager;
    private requestQueue: Array<{
        request: () => Promise<unknown>;
        resolve: (value: unknown) => void;
        reject: (error: unknown) => void;
    }> = [];
    private isProcessing: boolean = false;

    // Private constructor to prevent direct instantiation
    private constructor() {}

    // Static method to get the singleton instance
    static getInstance(): HttpRequestManager {
        if (!HttpRequestManager.instance) {
            HttpRequestManager.instance = new HttpRequestManager();
        }
        return HttpRequestManager.instance;
    }

    // Method to add a GET request to the queue and return a promise
    addGetRequest(url: string): Promise<unknown> {
        const request = () => fetch(url).then((response) => response.json());
        return this.enqueueRequest(request);
    }

    // Method to add a POST request to the queue and return a promise
    addPostRequest(url: string, data: unknown): Promise<unknown> {
        const request = () =>
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }).then((response) => response.json());
        return this.enqueueRequest(request);
    }

    // Enqueue a request and return a promise that resolves when the request completes
    private enqueueRequest(request: () => Promise<unknown>): Promise<unknown> {
        return new Promise((resolve, reject) => {
            // Push the request and its associated resolve/reject functions to the queue
            this.requestQueue.push({ request, resolve, reject });

            // Start processing the queue if not already in progress
            if (!this.isProcessing) {
                this.processQueue();
            }
        });
    }

    // Process the request queue sequentially
    private async processQueue() {
        this.isProcessing = true;

        while (this.requestQueue.length > 0) {
            const { request, resolve, reject } = this.requestQueue.shift()!; // Get the next request in the queue

            try {
                const result = await request(); // Execute the request
                resolve(result); // Resolve the promise with the result
            } catch (error) {
                reject(error); // Reject the promise in case of an error
            }
        }

        this.isProcessing = false; // Mark as done processing when queue is empty
    }
}

/*
// Usage example: Shared access to HttpRequestManager across the application
const httpManager = HttpRequestManager.getInstance();

httpManager.addGetRequest("https://api.example.com/data")
    .then(data => console.log("GET Response:", data))
    .catch(error => console.error("GET Error:", error));

httpManager.addPostRequest("https://api.example.com/data", { name: "Sample" })
    .then(data => console.log("POST Response:", data))
    .catch(error => console.error("POST Error:", error));

// Another part of the application adding a request to the same queue
const anotherHttpManager = HttpRequestManager.getInstance();
anotherHttpManager.addGetRequest("https://api.example.com/another-data")
    .then(data => console.log("Another GET Response:", data))
    .catch(error => console.error("Another GET Error:", error));
*/
