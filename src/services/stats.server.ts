import { getPageSectionFromUrl, getBizIdFromUrl, getLocaleFromUrl } from '$helpers/utils';
import { sendStatsToDb } from './biz-stats-to-db.server';

export async function pageStatsToDb(sourceUrl: string) {
	// if no source url, return
	if (!sourceUrl) {
		console.log(`serve hook: no source url found`);
	}

	const eventName = 'pageview';

	const pageSection = getPageSectionFromUrl(sourceUrl);

	if (pageSection === 'biz') {
		const bizId = getBizIdFromUrl(sourceUrl);
		const locale = getLocaleFromUrl(sourceUrl);

		sendStatsToDb({
			biz_id: bizId,
			stat_key: eventName,
			stat_value: sourceUrl,
			locale: locale
		});
	}
}
