/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly APP_NAME: string;
	readonly API_HOSTNAME: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
