export function load({ locals }) {
	console.log(locals);
	return {
		user: locals.user
	};
}
