# AI Agent UI Template Collection

A focused collection of four standalone web UI templates for AI agent products. Each template is completely self-contained with its own HTML, CSS, and JavaScript files.

## Templates

### 1. AI Agent Dashboard
Overview of agents, health, activity, usage, and key metrics.

### 2. AI Agent List
Searchable and filterable list of agents with status, model, tasks, and actions.

### 3. AI Agent Profile
Detailed agent information with editable configuration, capabilities, activity, and metadata.

### 4. Agent Status Monitoring
Real-time-style monitoring view for agent health, runtime status, latency, uptime, errors, and activity.

## Project Structure

```text
ai_agents_templates_4/
├── index.html
├── style.css
├── script.js
├── README.md
├── ai-agent-dashboard/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── ai-agent-list/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── ai-agent-profile/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── agent-status-monitoring/
    ├── index.html
    ├── style.css
    └── script.js
```

## Design

- White and blue visual system
- Glassmorphism cards and panels
- Responsive layouts
- Light/dark theme support
- Clean SaaS-style interface
- Reusable UI patterns without shared runtime dependencies

## Functionality

The root launcher also has its own CSS and JavaScript. Each of the four templates includes its own independent HTML, CSS, and JavaScript and can run independently. Interactive features include navigation, theme switching, search/filter controls, agent actions, editing, status indicators, notifications, and local browser persistence where applicable.

## Running the Templates

No build step is required. Open any template's `index.html` directly in a modern browser.

## Scope

This project intentionally contains only the four AI agent templates listed above. Other AI, SaaS, automation, workflow, and unrelated templates are excluded.
