# Software Redesign Steps

## Project Outline

This exercise involves refactoring a simple image management application implemented in React with intentional "bad practices" to illustrate common issues that arise in tightly coupled, inflexible codebases. By progressively improving this codebase, the goal is to make it more modular, maintainable, and adaptable to new technical requirements, such as switching from Client-Side Rendering (CSR) with React Router to a more flexible framework like Next.js.

### Key Objectives
- Separate concerns to improve readability, testability, and scalability.
- Centralize data fetching, caching, and role management to reduce duplication and enhance maintainability.
- Implement architectural practices that make the codebase adaptable for future evolution, such as adding internationalization (i18n) and transitioning to server-side rendering (SSR) or static site generation (SSG).
- Reduce reliance on client-side-only routing to simplify future migration to Next.js’s file-based routing model.

### Exercise Structure: Step-by-Step Refactoring

#### Step 1: Initial Code Review and Problem Identification
- Review the current codebase to identify specific instances of tightly coupled logic, hardcoded values, and redundant patterns.
- Document these issues and evaluate their impact on maintainability, readability, and flexibility.

#### Step 2: Improve Folder Structure
- Restructure the application by organizing files according to a feature-based or domain-driven architecture.
- Move each component into its own folder and separate utilities, styles, and services into designated directories.

#### Step 3: Centralize Data Fetching and Caching
- Create a dedicated service for handling HTTP requests and caching logic.
- Use custom hooks to fetch data and manage caching consistently across components, reducing duplication.

#### Step 4: Encapsulate Complex Business Rules in Utility Functions
- Move complex logic, such as `calculatePopularity` and `canAddToFavorites`, into utility functions or a business logic service.
- Refactor components to use these functions, simplifying the component logic and making the rules easier to test and update.

#### Step 5: Implement Role Management Using Context or Custom Hook
- Establish a context or custom hook to manage user roles globally, ensuring consistent role-based access control across components.
- Move the role-fetching logic from `ImageDetailsPage` to the context provider for centralized role management.

#### Step 6: Refactor Styling with CSS Modules or Styled Components
- Replace inline styles with reusable CSS classes, CSS modules, or styled components.
- Move each component’s styles into separate files, improving consistency and making styles easier to maintain and update.

#### Step 7: Implement an Internationalization (i18n) Solution
- Introduce an i18n library or simple dictionary approach to manage text translations in a centralized location.
- Replace all hardcoded text with translation keys, enabling easy updates and multi-language support.

#### Step 8: Reduce Client-Side Navigation Dependency
- Replace instances of `useNavigate` and client-side-only navigation patterns with Next.js-compatible routing patterns.
- For future compatibility, limit programmatic navigation to necessary cases and avoid hard dependencies on client-side routing.

#### Step 9: Introduce Code Quality Metrics and Continuous Monitoring
- Establish code quality metrics using tools like ESLint and Code-Health-Meter to enforce consistent code standards.
- Integrate automated tools to track metrics such as cohesion, coupling, and complexity, maintaining a focus on long-term maintainability.

#### Step 10: Review and Evaluate Improvements
- Conduct a final review of the refactored codebase, checking for improved modularity, readability, and adherence to best practices.
- Assess the flexibility of the updated codebase to ensure it can adapt to future requirements, such as transitioning to Next.js or adding more advanced features.

## Current Problems

### Monolithic Design
- The application is structured with closely coupled components, logic, and styles, leading to a rigid codebase that’s difficult to scale or reorganize.

### Mixed Concerns
- Components handle HTTP requests, caching, UI rendering, and business logic within the same file, resulting in tightly coupled code and reducing readability and maintainability.

### Redundant and Scattered Logic
- **Data Transformation**: `ImageListPage` and `ImageDetailsPage` have separate rules for transforming data (e.g., handling missing titles and setting default values), leading to duplicated logic.
- **Conditional Logic**: Complex conditions for popularity calculation and favorites eligibility are embedded directly in `ImageDetailsPage`, increasing complexity and making testing difficult.

### Hardcoded and Inline Styles
- Inline styling within JSX makes it difficult to reuse or apply consistent styles across the application, leading to scattered and inconsistent UI styling.

### Hardcoded Text Strings and Lack of Internationalization Support
- All user-facing text (e.g., button labels, alerts, messages) is hardcoded within components, limiting adaptability and making it challenging to support multiple languages.

### Direct `localStorage` Access
- `localStorage` interactions are handled directly in components, resulting in duplicated logic and making state changes hard to manage centrally, especially in a server-rendered environment.

### Lack of Centralized Role Management
- `userRole` is fetched within `ImageDetailsPage` using a mock asynchronous function. This approach lacks consistency and prevents centralized management of role-based permissions across the app.

### Complexity in Favorites Logic
- The logic for adding images to favorites includes multiple checks (e.g., user role, image age, type), leading to a complex function that is difficult to read and maintain.

### Popularity Calculation Logic
- Popularity is calculated based on multiple criteria with conditions for `userRole`, increasing component complexity and reducing testability.

### Heavy Reliance on Client-Side Routing and Programmatic Navigation
- The app relies heavily on React Router’s `useNavigate` for programmatic client-side navigation. This dependency on client-side-only navigation would make migration to Next.js’s file-based routing model challenging.

## Refactoring Opportunities

### Improve Folder Structure
- Organize the project with a feature-based or domain-driven folder structure to separate components, services, and utilities, promoting modularity and scalability.

### Centralize Data Fetching and Caching
- Move HTTP requests and caching logic to dedicated service functions or custom hooks to separate concerns, reduce duplication, and enhance reusability.

### Encapsulate Complex Business Rules
- Extract complex business rules (e.g., `calculatePopularity`, `canAddToFavorites`) into utility functions or services, improving readability, reusability, and testability.

### Implement Centralized Role Management with Context or Custom Hook
- Create a context or custom hook to manage user roles and permissions, ensuring consistent access control across components.

### Organize Styles
- Move inline styles to dedicated CSS files or use styled components for a cleaner, reusable styling approach that can adapt more easily to design changes.

### Implement Internationalization (i18n)
- Introduce an i18n solution to manage translations in a single location, reducing text duplication and improving scalability. Store translatable strings in language-specific JSON files (e.g., `en.json`, `fr.json`), enabling easy access and updates.

### Reduce Client-Side Navigation Dependency
- Minimize usage of `useNavigate` and `onClick` navigation patterns to reduce reliance on client-side-only routing, simplifying any potential migration to a server-rendered framework like Next.js.

### Use Code Quality Metrics and Fitness Functions
- Establish code quality metrics like cohesion, coupling, complexity, and maintainability to assess the codebase’s long-term quality. Use tools like ESLint and Code-Health-Meter to enforce standards and measure code quality over time.
