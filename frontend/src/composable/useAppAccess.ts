import { useUserAccount } from '@/composable/useUserAccount';

export function usePrivatePage(): boolean {
	const { user, signOut } = useUserAccount();

	if (user === null) {
		signOut(globalThis.location.pathname);
		return false;
	}

	return true;
}
