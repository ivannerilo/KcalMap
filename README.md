# KcalMap - Daily Calorie Tracker

## Overview
KcalMap is a single-page web application (SPA) designed to help users track their daily caloric intake in a simple, agile, and engaging way. Unlike traditional trackers that rely on complex forms and scattered menus, KcalMap focuses on a timeline-based dashboard that mirrors the user's day, allowing for quick logging, real-time feedback, and easy management of dietary habits.

The application is built with a decoupled architecture, utilizing Django (with Django Rest Framework) for a robust backend API and React for a dynamic, responsive frontend interface. It features secure JWT authentication, profile customization, a comprehensive food database, and an intuitive "in-place" editing system.

---

## Distinctiveness and Complexity
This project satisfies the distinctiveness and complexity requirements of the CS50 Web Capstone in several key ways:

### 1. Distinctiveness from Other Course Projects
* **Not a Social Network or E-commerce:** KcalMap is strictly a utility/health application. It does not feature user-to-user messaging, following mechanisms, or a "feed" of other users' content (Project 4: Network). Nor does it involve listings, bids, or auctions (Project 2: Commerce). It is a personal tool focused on data tracking and visualization.
* **Unique Domain Logic:** The core logic revolves around nutritional data management, time-based logging, and personalized goal tracking. This domain is fundamentally different from the wiki, email, commerce, or social network domains explored in previous projects.
* **Timeline Architecture:** Instead of standard CRUD pages, the application is designed around a chronological timeline of meals (Breakfast, Lunch, etc.), offering a unique user experience that differs significantly from the standard list/detail views of previous assignments.

### 2. Complexity Implementation
KcalMap implements a level of complexity that exceeds previous projects through advanced architectural patterns and features:

* **Decoupled Architecture (API + SPA):** Unlike previous projects that used Django templates, this project completely separates the backend (Django REST Framework) from the frontend (React). This required implementing a full RESTful API, handling CORS, and managing state on the client-side asynchronously.
* **Advanced Authentication (JWT):** Instead of standard Django sessions, the app implements stateless authentication using JSON Web Tokens (Simple JWT). This involves handling access tokens, refresh tokens, and automatic token rotation on the frontend via interceptors, ensuring a seamless user session.
* **Service Layer Pattern in Backend:** To keep views clean and "thin," business logic was abstracted into a dedicated `services/` layer. This separates the HTTP request handling from the actual data manipulation logic, making the codebase more modular and testable.
* **Optimized Database Queries:** The application utilizes advanced Django ORM features like `prefetch_related` with custom `Prefetch` objects to solve the N+1 query problem. Complex data structures (e.g., meals nested with logs and food details) are serialized efficiently using nested serializers.
* **Complex React State Management:** The frontend uses the Context API extensively to manage global state (User Data, Authentication, Food Database) while optimizing performance with `useMemo` and `useCallback` to prevent unnecessary re-renders.
* **Smart Search & Data Handling:**
    * **Debounced Search:** The food search feature implements debouncing to minimize API calls while the user types.
    * **Infinite Scroll:** The food list implements an intersection observer pattern to load data progressively (infinite scroll), rather than simple pagination links.
    * **In-Place Editing:** Users can edit quantities or delete items directly within the timeline component, requiring complex state updates and optimistic UI rendering.

---

## File Contents

### Backend (`backend/`)
* `core/`: Main project configuration settings.
    * `settings.py`: Configured for DRF, CORS headers, Simple JWT, and static/media files.
* `api/`: The main application handling the logic.
    * `models.py`: Defines the database schema for User, Profile, TemplateMeal, TemplateFood, Food, and FoodLog.
    * `views/`: Contains the API views separated by domain, that handle HTTP requests and responses.
    * `services/`: Contains business logic separated by domain (`user_services.py`, `meal_services.py`, `log_services.py`). Handles DB transactions and complex operations.
    * `serializers/`: DRF serializers separated by domain (`user_serializers.py`, `meal_serializers.py`, `food_serializers.py`) for data validation and transformation.
    * `urls.py`: Nested routing configuration for the API endpoints.
    * `management/commands/seed_foods.py`: Custom management command to populate the database with initial food data.

### Frontend (`frontend/`)
* `src/`: Source code for the React application.
    * `contexts/`: React Context providers (`AuthenticateContext`, `UserContext`, `FoodContext`, `WindowContext`) for global state management.
    * `hooks/`: Custom hooks like `useFetch` (for authenticated requests) and `useDebounce`.
    * `layouts/`: Layout wrappers for different sections (e.g., `SidebarLayout`, `AuthenticationLayout`).
    * `pages/`: Main view components (`Dashboard`, `Login`, `Register`, `ProfileForm`).
    * `components/`: Reusable UI components.
        * `Sidebar/`: Responsive navigation sidebar.
        * `CaloriesDash/`: Real-time calorie progress widget.
        * `Meal/`: Complex component handling meal display and interactions.
        * `AddFoodModal/`: Smart search modal with infinite scroll.
        * `form/`: Custom input and button components.
    * `index.css`: Global styles, CSS variables for theming (light/dark), and reset.

---

## How to Run the Application
This project requires Python and Node.js to be installed.

### 1. Backend Setup (Django)
Navigate to the backend directory:

```bash
cd backend
```

Create and activate a virtual environment:

```bash
python -m venv venv
# Windows:
# venv\Scripts\activate
# macOS/Linux:
# source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Apply migrations:

```bash
python manage.py migrate
```

(Optional) Seed the database with initial food data:

```bash
python manage.py seed_foods
```

Start the server:

```bash
python manage.py runserver
```

The backend will run at `http://127.0.0.1:8000/`.

### 2. Frontend Setup (React)
Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install Node dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

The application will open in your browser at `http://localhost:3000/`.

---

## Additional Information
* **Responsive Design:** The application is built with a "Mobile-First" CSS strategy. It adapts layout, font sizes, and visibility of elements (like the sidebar) based on the viewport width (`isMobile`, `isTablet`, `isDesktop` contexts).
* **Media Files:** The project handles profile picture uploads. In development mode, Django is configured to serve media files directly.
* **Security:** Passwords are hashed (via Django's default system), and API endpoints are protected via JWT. The frontend automatically handles token expiration and refreshing.
