src/
├── app/
│ ├── (auth)/ # Grupo de rutas de autenticación
│ │ ├── layout.tsx # Layout para páginas de auth
│ │ ├── login/
│ │ │ └── page.tsx
│ │ └── register/
│ │ └── page.tsx
│ │
│ ├── (public)/ # Grupo de rutas públicas
│ │ ├── layout.tsx
│ │ ├── page.tsx # Home
│ │ └── products/
│ │ ├── page.tsx # Listado
│ │ └── [id]/
│ │ └── page.tsx # Detalle
│ │
│ ├── (private)/ # Grupo de rutas privadas
│ │ ├── layout.tsx # Layout con protección
│ │ ├── checkout/
│ │ │ └── page.tsx
│ │ ├── profile/
│ │ │ └── page.tsx
│ │ └── orders/
│ │ └── page.tsx
│ │
│ └── middleware.ts # Protección de rutas
│
├── features/
│ └── auth/
│ ├── components/
│ │ ├── LoginForm.tsx
│ │ ├── RegisterForm.tsx
│ │ └── ProtectedRoute.tsx
│ │
│ ├── hooks/
│ │ ├── useAuth.ts
│ │ └── useAuthRedirect.ts
│ │
│ ├── providers/
│ │ └── AuthProvider.tsx
│ │
│ ├── types/
│ │ └── auth.types.ts
│ │
│ └── utils/
│ ├── jwt.utils.ts
│ └── auth.utils.ts
│
├── lib/
│ ├── storage.ts # LocalStorage wrapper
│ └── constants.ts
│
└── types/
└── user.types.ts
