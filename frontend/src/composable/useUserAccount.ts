import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import { useRouter, type NavigationFailure } from 'vue-router';
import { LOGIN_PAGE_PATH } from '@/config/constant';
import type { User, UserAuthentication, UserCredential } from '@/resource/IAM';
import { authenticateUser } from '@/service/UserService';

export const ACCOUNT_STORE_KEY = 'user_account';

export interface UseUserAccountReturn {
	user: Ref<User | null>;

	/**
	 * Authenticate the user updating the current user account.
	 * @param credential User credential
	 * @returns A UserAuthentication result or a AuthenticationError
	 */
	authenticate(credential: UserCredential): Promise<UserAuthentication | Error>;

	/**
	 * Sign out exiting the user session and navigating to the login page.
	 * @param redirectPath pathname to redirect from the login page after a user authentication.
	 */
	signOut(redirectPath?: string): Promise<void | NavigationFailure>;
}

function useUserAccountComposable(): UseUserAccountReturn {
	const initialUser: User | null = null; // load persisted/authenticated user
	const user = ref<User | null>(initialUser);

	const router = useRouter();

	async function authenticate(credential: UserCredential): Promise<UserAuthentication | Error> {
		const result = await authenticateUser(credential);
		if (!(result instanceof Error)) {
			user.value = result.user;
		}

		return result;
	}

	async function signOut(redirectPath?: string): Promise<void | NavigationFailure> {
		user.value = null;
		return router.push({
			path: LOGIN_PAGE_PATH,
			replace: false,
			query: { redirect_to: redirectPath },
		});
	}

	return { user, authenticate, signOut };
}

export const useUserAccount = defineStore<typeof ACCOUNT_STORE_KEY, UseUserAccountReturn>(
	ACCOUNT_STORE_KEY,
	useUserAccountComposable
);
