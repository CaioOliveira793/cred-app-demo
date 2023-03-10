export const DateTimeFormatter = new Intl.DateTimeFormat('pt-BR', {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	second: '2-digit',
});

export const ShortDateFormatter = new Intl.DateTimeFormat('pt-BR', {
	dateStyle: 'short',
});
