export const formatDate = (date: Date) => {
	return date.toLocaleDateString('en-us', {
		dateStyle: 'medium'
	});
};
