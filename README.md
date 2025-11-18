# rbxts-dev

A TypeScript application with distributed client-server architecture and reactive state management.

## Architecture

This project follows a structured client-server model with shared utilities and type-safe state management.

```
src/
├── client/          # Client-side runtime and controllers
├── server/          # Server-side services and logic
└── shared/          # Shared code between client and server
```

### Technology Stack

- **TypeScript** - Strongly-typed JavaScript superset
- **Reflex** - Predictable state management
- **Cmdr** - Command framework
- **React** - UI component library

## Project Structure

### Client

```
client/
├── controllers/     # Client-side behavior controllers
├── store/          # Client state management
├── ui/             # React-based user interface
│   ├── apps/       # Feature-specific UI applications
│   └── components/ # Reusable UI components
└── network.ts      # Client networking layer
```

**Controllers** handle specific client-side responsibilities including animation, movement, audio, and input management.

**UI Applications** are self-contained interface modules with their own components and logic.

### Server

```
server/
├── challenges/     # Challenge implementations
├── classes/        # Object-oriented systems
│   └── gizmos/     # Specialized object implementations
├── cmdr/           # Admin command definitions
├── components/     # ECS-style component systems
├── services/       # Core server functionality
│   ├── actions/    # Action handling
│   ├── game/       # Flow management
│   └── lobby/      # Pre-session systems
├── store/          # Server state management
└── util/           # Server-side utilities
```

**Services** provide core functionality including user data persistence, economy, progression systems, and state management.

**Classes** implement the gizmo system for dynamic object behavior.

**Challenges** contain modular implementations with base classes for extensibility.

### Shared

```
shared/
├── configs/        # Configuration data
│   ├── challenges/ # Challenge-specific config
│   └── items/      # Item definitions
├── store/          # Shared state definitions
│   ├── selectors/  # State query functions
│   └── slices/     # State slice definitions
└── utils/          # Cross-environment utilities
    └── functions/  # Pure utility functions
```

The **store** uses Reflex for type-safe state management with middleware for client-server synchronization.

## State Management

State is managed through a centralized store with slices for different domains:

- `players/*` - User-specific state (XP, inventory, currency, equipped items)
- `client/*` - Client-specific UI state

State synchronization between server and client is handled through custom middleware:
- **broadcaster** (server) - Broadcasts state changes to clients
- **receiver** (client) - Receives and applies state updates

## Development Tools

### Admin Commands

The project includes a Cmdr-based admin system with commands for:
- User data manipulation
- Currency and progression adjustment
- System testing and debugging

Commands are defined in `server/cmdr/commands/` with custom type definitions in `server/cmdr/types/`.

### Type Definitions

TypeScript definitions for system instances are located in `types/` and provide type safety for domain-specific objects.

## Build Configuration

- `tsconfig.json` - TypeScript compiler configuration
- `default.project.json` - Project configuration for sync
- `package.json` - Node dependencies and scripts
- `aftman.toml` - Toolchain management

## Scripts

```bash
npm install          # Install dependencies
npm run build       # Compile TypeScript
npm run watch       # Watch mode for development
npm run lint        # Run linter
npm run format      # Format code
```

## Component Systems

The project uses a component-based architecture on the server for attaching behavior to runtime instances. Components are located in `server/components/` and handle specific interactive elements.

## UI Development

UI components are built with React and organized by feature. Story files (`.story.tsx`) are provided for component development and testing.

---

*For questions or contributions, refer to the project structure above to locate relevant files.*

