export interface User {
	readonly id: string;
	readonly name: string;
	readonly email: string;
	readonly phone: string | null;
	readonly image_url: string | null;
	readonly last_password_change: Date;
}

export interface UserCredential {
	readonly email: string;
	readonly password: string;
}

export interface UserAuthentication {
	readonly user: User;
	readonly token: string;
}
