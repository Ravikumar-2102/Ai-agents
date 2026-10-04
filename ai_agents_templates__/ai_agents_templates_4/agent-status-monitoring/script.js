 /* =========================================================
   1. UI HELPER OBJECT
   ========================================================= */

const UI = {

    /* -----------------------------------------------------
       Select ONE element
       Example:
       UI.$('#toast')
       ----------------------------------------------------- */

    $: (selector, root = document) => {
        return root.querySelector(selector);
    },


    /* -----------------------------------------------------
       Select MULTIPLE elements
       Returns an array
       ----------------------------------------------------- */

    $$: (selector, root = document) => {
        return [...root.querySelectorAll(selector)];
    },


    /* -----------------------------------------------------
       SHOW TOAST MESSAGE
       ----------------------------------------------------- */

    toast(message) {

        let toast = this.$('#toast');


        // Create toast if it doesn't already exist
        if (!toast) {

            toast = document.createElement('div');

            toast.id = 'toast';

            toast.className = 'toast';

            document.body.appendChild(toast);
        }


        // Put message inside toast
        toast.textContent = message;


        // Show toast
        toast.classList.add('show');


        // Cancel previous timer
        clearTimeout(window.__toastTimer);


        // Hide toast after 2.2 seconds
        window.__toastTimer = setTimeout(() => {

            toast.classList.remove('show');

        }, 2200);
    },


    /* -----------------------------------------------------
       SAVE DATA
       Uses browser localStorage
       ----------------------------------------------------- */

    save(key, value) {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );
    },


    /* -----------------------------------------------------
       LOAD DATA
       ----------------------------------------------------- */

    load(key, fallback) {

        try {

            return (
                JSON.parse(
                    localStorage.getItem(key)
                ) ?? fallback
            );

        } catch {

            return fallback;
        }
    },


    /* -----------------------------------------------------
       DARK / LIGHT THEME
       ----------------------------------------------------- */

    theme() {

        // Check whether dark mode is stored
        const dark =
            localStorage.getItem('agent_theme') === 'dark';


        // Add/remove "dark" class from <html>
        document.documentElement.classList.toggle(
            'dark',
            dark
        );


        // Change button text
        this.$$('.theme-toggle').forEach(button => {

            button.textContent =
                dark
                    ? '☀ Light mode'
                    : '☾ Dark mode';
        });
    },


    /* -----------------------------------------------------
       NAVIGATION
       ----------------------------------------------------- */

    navigate(path) {

        window.location.href = path;
    }
};


/* =========================================================
   2. RUN CODE AFTER HTML HAS LOADED
   ========================================================= */

document.addEventListener(
    'DOMContentLoaded',
    () => {

        /* -----------------------------------------------
           Apply saved theme
           ----------------------------------------------- */

        UI.theme();


        /* -----------------------------------------------
           Find all theme buttons
           ----------------------------------------------- */

        UI.$$('.theme-toggle').forEach(button => {

            button.addEventListener(
                'click',
                () => {

                    /* -----------------------------------
                       Check current theme
                       ----------------------------------- */

                    const currentTheme =
                        localStorage.getItem(
                            'agent_theme'
                        );


                    /* -----------------------------------
                       Toggle theme
                       ----------------------------------- */

                    if (currentTheme === 'dark') {

                        localStorage.setItem(
                            'agent_theme',
                            'light'
                        );

                    } else {

                        localStorage.setItem(
                            'agent_theme',
                            'dark'
                        );
                    }


                    /* -----------------------------------
                       Apply new theme
                       ----------------------------------- */

                    UI.theme();
                }
            );
        });
    }
);


/* =========================================================
   3. PAGE TEMPLATES / NAVIGATION DATA
   ========================================================= */

const templates = [

    [
        '1',
        'AI Agent Dashboard',
        '../ai-agent-dashboard/index.html'
    ],

    [
        '2',
        'AI Agent List',
        '../ai-agent-list/index.html'
    ],

    [
        '3',
        'AI Agent Profile',
        '../ai-agent-profile/index.html'
    ],

    [
        '4',
        'Agent Status Monitoring',
        '../agent-status-monitoring/index.html'
    ]
];


/* =========================================================
   4. CREATE COMMON PAGE HEADER / SIDEBAR
   ========================================================= */

function renderShell(active, title, subtitle) {

    /* -----------------------------------------------------
       Create navigation links
       ----------------------------------------------------- */

    const nav = templates
        .map(
            ([icon, name, href]) => {

                return `
                    <a
                        class="${name === active ? 'active' : ''}"
                        href="${href}"
                    >
                        <span class="icon">${icon}</span>

                        <span>${name}</span>
                    </a>
                `;
            }
        )
        .join('');


    /* -----------------------------------------------------
       Return common HTML structure
       ----------------------------------------------------- */

    return `
        <div class="app">

            <!-- SIDEBAR -->
            <aside class="sidebar">

                <div class="brand">

                    <div class="logo">
                        ✦
                    </div>

                    <span>
                        AgentOS UI
                    </span>

                </div>


                <!-- NAVIGATION -->
                <nav class="nav">
                    ${nav}
                </nav>


                <!-- DARK MODE BUTTON -->
                <div class="sidebar-bottom">

                    <button class="theme-toggle">
                        ☾ Dark mode
                    </button>

                </div>

            </aside>


            <!-- MAIN CONTENT -->
            <main class="main">

                <!-- TOP BAR -->
                <header class="topbar">

                    <div class="crumb">

                        AgentOS /
                        <strong>
                            ${title}
                        </strong>

                    </div>


                    <div class="top-actions">

                        <!-- Refresh -->
                        <button
                            class="icon-btn"
                            onclick="location.reload()"
                        >
                            ↻
                        </button>


                        <!-- User Avatar -->
                        <div class="avatar">
                            H
                        </div>

                    </div>

                </header>


                <!-- PAGE CONTENT -->
                <section class="content">

                    <div class="page-head">

                        <div>

                            <h1>
                                ${title}
                            </h1>

                            <p>
                                ${subtitle}
                            </p>

                        </div>

                    </div>
    `;
}


/* =========================================================
   5. CLOSE COMMON PAGE STRUCTURE
   ========================================================= */

function closeShell() {

    return `
                </section>

            </main>

        </div>


        <!-- TOAST -->
        <div
            id="toast"
            class="toast"
        ></div>


        <!-- SHARED JAVASCRIPT -->
        <script src="../shared/core.js"></script>

        <script src="../shared/nav.js"></script>
    `;
}
