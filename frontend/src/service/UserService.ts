import type { User, UserAuthentication, UserCredential } from '@/resource/IAM';

const FAKE_USER_PASSWORD = '12345678';
const FAKE_USER_TOKEN = '1fb52f43-6f2b-4fed-9d45-3df17783ad09';
const FAKE_USER: User = {
	id: '287cc01c-9955-4508-8a19-f6848e66f881',
	name: 'Fake user',
	email: 'fake.usr@cred.com',
	phone: null,
	image_url:
		'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8',
	last_password_change: new Date(),
};

export async function authenticateUser(
	credential: UserCredential
): Promise<UserAuthentication | Error> {
	if (FAKE_USER.email !== credential.email) {
		return new Error('UserNotFound');
	}

	if (credential.password !== FAKE_USER_PASSWORD) {
		return new Error('InvalidCredential');
	}

	return { user: FAKE_USER, token: FAKE_USER_TOKEN };
}
