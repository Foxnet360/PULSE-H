/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTACT_PHONE: string
  readonly VITE_CONTACT_EMAIL: string
  readonly VITE_PULSO_ADMIN_PASSWORD: string
  readonly VITE_API_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
