import { Role } from '$lib/constants/Role';

export function getRoleName(roleId: number) {
	switch (roleId) {
		case Role.ADMIN:
			return 'Admin';
		case Role.USER:
			return 'User';
		default:
			return 'Unknown';
	}
}
