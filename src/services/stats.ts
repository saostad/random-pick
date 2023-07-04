import { getDomainUrl } from '$helpers/utils';

type SendStatsInput = {
	targetUrl?: string;
	sourceUrl: string;
	eventName?: string;
	eventValue?: string;
	locale?: string;
};

/** send post request to stats api */
export async function sendStatsToApi({
	sourceUrl,
	targetUrl,
	eventName,
	eventValue,
	locale
}: SendStatsInput) {
	const response = await fetch(`${getDomainUrl()}/api/stats`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ targetUrl, sourceUrl, eventName, eventValue, locale })
	}).catch((error) => {
		console.error(`error adding stats:`, { error });
	});

	return response;
}
