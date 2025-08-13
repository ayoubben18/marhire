# CLAUDE.md - AI Assistant Instructions

## Important Database Guidelines

### NEVER Write Tests That Modify the Database

-   Do NOT create PHPUnit tests that use RefreshDatabase trait
-   Do NOT write tests that insert, update, or delete database records
-   Do NOT use database factories in tests
-   The production database contains important data that must not be modified by tests

### Alternative Testing Approaches

-   Write unit tests that mock database interactions
-   Use in-memory testing if absolutely necessary
-   Focus on testing business logic without database operations
-   For integration testing, use read-only queries or mock data

## Project-Specific Instructions

### MarHire Project

-   This is a Laravel + React booking platform
-   The database contains production data for listings, bookings, agencies, etc.
-   Always preserve existing data integrity
-   When implementing features, test manually or with non-destructive methods

## Commands to Run After Code Changes

### Linting and Type Checking

```bash
npm run production  # Build React components
npm run dev  # Compile new changes instead of npm run production
```

## Database Information

-   Database name: marhire
-   Important tables: listings, bookings, agencies, cities, categories
-   The cities table uses `city_name` column, not `name`

## Development Notes

-   Prefer using `npm run dev` over `npm run production` for development work

please always use your agents to minimize the total context window, identify the convinient agent for the task you want to do and make him do it

-   do not get out of the services defined in this project like mysql database and php and react and also we're using a cpanel server the app is very normal and simple, no need for extra bullshit
-   always fallback to the english translation of the thing, so in case the other language was not maintained or something we have something to display and our app does not break
-   when you add something to the transalation.json files verify that there are no errors in that json because it cuases the entire page to fallback to english
-   when you modify something critical in the client side or server side please ensure it correlates between the 2 and does not have an inconsistent side

-   The admin routes should not have any internationalization it's just english

# Claude Code Instructions

## AB Method

The AB Method is installed in this project. Use the following command to get started:

```
/ab-master
```

This will show you all available workflows for incremental task management.

### Key Workflows:

-   `analyze-project` - Analyze project architecture
-   `create-task` - Create a new development task
-   `create-mission` - Create a mission for current task
-   `resume-task` - Resume an existing task
-   `resume-mission` - Resume an in-progress mission

### Important Files:

-   `.ab-method/structure/index.yaml` - Configuration for paths and structure
-   `docs/architecture/` - Generated architecture documentation
-   `tasks/` - Task and mission tracking

Remember: Always check `.ab-method/structure/index.yaml` first to see where files should be created or read from.

NEVER FUCKING RESTORE THE FILE STATUS USING GIT JUST REMOVE WHAT YOU WANT TO REMOVE AND NEVER DO THAT UNLESS I TELL YOU TO BECAUSE THERE MIGHT BE SOME IMPORTANT CHANGES AND YOU WILL DELETE THEM YOU FUCKING IDIOT

- remember that the category id for car is 2, 3 for private driver, 4 boat rental, 5 things to do
- Database column: droppoff_location (has a typo but we can't change it without a migration) so we are not changing it at all just use it as it is