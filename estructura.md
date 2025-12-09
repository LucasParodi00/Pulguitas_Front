src/
│
├── app/ → Rutas (cada carpeta = ruta)
│ ├── (public)/ → Layouts públicos (login, registro, landing)
│ ├── (private)/ → Layouts privados (dashboard)
│ ├── api/ → Route Handlers (si usás API dentro de Next)
│ └── layout.tsx → Layout raíz
│
├── components/ → Componentes reutilizables (UI y lógicos)
│ ├── ui/ → shadcn + wrappers propios
│ ├── forms/ → Formularios reusables
│ └── navigation/ → Navbar, Sidebar, etc.
│
├── features/ → **_Carpeta más importante_** (arquitectura escalable)
│ ├── auth/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── services/
│ │ └── types/
│ ├── productos/
│ ├── turnos/
│ ├── usuarios/
│ └── ... → Cada feature aislada
│
├── lib/ → Utilidades puras / helpers / configs
│ ├── utils/
│ ├── validations/
│ ├── http/
│ └── auth/
│
├── hooks/ → Hooks globales
│
├── store/ → Zustand/Recoil/Jotai
│
├── types/ → Tipos globales
│
├── styles/ → Archivos .css o .scss globales
│
├── constants/ → Constantes globales
│
└── config/ → Configs globales (axios, env, etc.)

app/
└── (private)/
└── dashboard/
├── page.tsx
├── layout.tsx
└── loading.tsx
components/
├── ui/ → Botones, Inputs, Alerts (shadcn)
├── forms/
└── navigation/ → Navbar, Sidebar

features/
└── turnos/
├── components/ → ListadoTurnos, CardTurno
├── services/ → llamadas a API
├── hooks/ → useTurnos()
├── utils/
└── types/
