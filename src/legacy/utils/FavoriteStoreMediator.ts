// Observer Pattern: Defines an interface for components that need to be updated when the favorite count changes.
interface FavoriteObserver {
    updateFavoritesCount(count: number): void;
}

// Memento Pattern: Manages state history by providing undo/redo methods.
interface FavoriteStateHistoryManager {
    undo(): void;
    redo(): void;
}

// Memento Pattern: Encapsulates the state of the favorites count to be saved and restored.
class FavoriteState {
    constructor(public readonly count: number) {}
}

// Mediator Pattern: Manages and coordinates the interactions related to favorites.
// - Manages favorite actions (add, remove) and subscription/unsubscription of observers.
interface FavoriteMediator {
    addFavorite(): void;
    removeFavorite(): void;
    subscribe(observer: FavoriteObserver): void;
    unsubscribe(observer: FavoriteObserver): void;
}

// Mediator + Memento Patterns: Coordinates state updates and observer notifications,
// while also managing a history of states for undo/redo functionality.
export class FavoriteStoreMediator implements FavoriteMediator, FavoriteStateHistoryManager {
    private favoritesCount: number = 0;
    private subscribers: Set<FavoriteObserver> = new Set();

    // Memento Pattern: Maintains a history of FavoriteState instances to enable undo/redo functionality.
    private favoriteState: FavoriteState[] = [];
    private currentStateIndex: number = -1;

    // Mediator Pattern: Manages the add favorite operation, coordinates the state change,
    // saves the new state, and notifies all observers.
    addFavorite(): void {
        this.favoritesCount++;
        this.saveState(); // Memento Pattern: Save current state for undo/redo
        this.notifySubscribers(); // Mediator Pattern: Notify observers of the new count
    }

    // Mediator Pattern: Manages the remove favorite operation, coordinates the state change,
    // saves the new state, and notifies all observers.
    removeFavorite(): void {
        if (this.favoritesCount > 0) {
            this.favoritesCount--;
            this.saveState(); // Memento Pattern: Save current state for undo/redo
            this.notifySubscribers(); // Mediator Pattern: Notify observers of the new count
        }
    }

    // Observer Pattern: Adds an observer that will be notified when favorites count changes.
    subscribe(observer: FavoriteObserver): void {
        this.subscribers.add(observer);
    }

    // Observer Pattern: Removes an observer from notifications.
    unsubscribe(observer: FavoriteObserver): void {
        this.subscribers.delete(observer);
    }

    // Mediator Pattern: Notifies all subscribers (observers) of changes in the favorites count.
    private notifySubscribers(): void {
        for (const observer of this.subscribers) {
            observer.updateFavoritesCount(this.favoritesCount);
        }
    }

    // StateHistoryManager (Memento Pattern): Allows for undoing the last state change.
    undo(): void {
        if (this.currentStateIndex > 0) {
            this.currentStateIndex--;
            this.restoreState(); // Restore the previous state and notify subscribers
        }
    }

    // StateHistoryManager (Memento Pattern): Allows for redoing the last undone state change.
    redo(): void {
        if (this.currentStateIndex < this.favoriteState.length - 1) {
            this.currentStateIndex++;
            this.restoreState(); // Restore the next state and notify subscribers
        }
    }

    // Memento Pattern: Saves the current favorites count as a new state in the history,
    // enabling undo/redo functionality.
    private saveState(): void {
        // Clear any future states if we've performed an undo and then add a new state
        this.favoriteState = this.favoriteState.slice(0, this.currentStateIndex + 1);
        this.favoriteState.push(new FavoriteState(this.favoritesCount));
        this.currentStateIndex++;
    }

    // Memento Pattern: Restores the favorites count from a previous state in the history.
    private restoreState(): void {
        const memento = this.favoriteState[this.currentStateIndex];
        if (memento) {
            this.favoritesCount = memento.count;
            this.notifySubscribers(); // Notify observers after restoring the state
        }
    }
}

export class Toolbar implements FavoriteObserver {
    constructor(private mediator: FavoriteStoreMediator) {
        // Subscribe to the mediator to get updates
        this.mediator.subscribe(this);
    }

    updateFavoritesCount(count: number): void {
        console.log(`Toolbar: Total Favorites - ${count}`);
    }
}

export class ImageFavoriteButton implements FavoriteObserver {
    private isFavorite: boolean = false;

    constructor(private mediator: FavoriteStoreMediator) {
        // Subscribe to the mediator to get updates
        this.mediator.subscribe(this);
    }

    toggleFavorite(): void {
        this.isFavorite = !this.isFavorite;
        if (this.isFavorite) {
            this.mediator.addFavorite();
        } else {
            this.mediator.removeFavorite();
        }
    }

    updateFavoritesCount(count: number): void {
        console.log(`Image Button: Favorites Count - ${count}`);
    }
}

/*
// Initialize the favorite state mediator
const favoriteStore = new FavoriteStore();

// Create toolbar and image button components
const toolbar = new Toolbar(favoriteStore);
const imageButton1 = new ImageFavoriteButton(favoriteStore);
const imageButton2 = new ImageFavoriteButton(favoriteStore);

// Simulate adding/removing favorites
imageButton1.toggleFavorite(); // Adds to favorites
imageButton2.toggleFavorite(); // Adds to favorites
imageButton1.toggleFavorite(); // Removes from favorites
 */
