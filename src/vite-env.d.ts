/// <reference types="vite/client" />
interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_BASE_URL_SERVER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
