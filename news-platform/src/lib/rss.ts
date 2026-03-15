import Parser from 'rss-parser';
import { Article } from '@/types/article';

const parser = new Parser({
    customFields: {
        item: ['media:content'],
    }
});

// Indian Express Feed Map
const EXPRESS_FEED_MAP: Record<string, string> = {
    "": "https://indianexpress.com/feed/", // Home
    "epaper": "https://indianexpress.com/feed/", // fallback
    "india": "https://indianexpress.com/section/india/feed/",
    "cities": "https://indianexpress.com/section/cities/feed/",
    "upsc": "https://indianexpress.com/section/education/feed/",
    "premium": "https://indianexpress.com/section/premium/feed/",
    "entertainment": "https://indianexpress.com/section/entertainment/feed/",
    "politics": "https://indianexpress.com/section/political-pulse/feed/",
    "sports": "https://indianexpress.com/section/sports/feed/",
    "world": "https://indianexpress.com/section/world/feed/",
    "explained": "https://indianexpress.com/section/explained/feed/",
    "opinion": "https://indianexpress.com/section/opinion/feed/",
    "business": "https://indianexpress.com/section/business/feed/",
    "lifestyle": "https://indianexpress.com/section/lifestyle/feed/",
    "tech": "https://indianexpress.com/section/technology/feed/",
};

// Times of India Feed Map
const TOI_FEED_MAP: Record<string, string> = {
    "": "https://timesofindia.indiatimes.com/rssfeedstopstories.cms",
    "india": "https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms",
    "world": "https://timesofindia.indiatimes.com/rssfeeds/296589292.cms",
    "business": "https://timesofindia.indiatimes.com/rssfeeds/1898055.cms",
    "sports": "https://timesofindia.indiatimes.com/rssfeeds/4719148.cms",
    "tech": "https://timesofindia.indiatimes.com/rssfeeds/66949542.cms",
    "entertainment": "https://timesofindia.indiatimes.com/rssfeeds/1081479906.cms",
    "lifestyle": "https://timesofindia.indiatimes.com/rssfeeds/2886704.cms",
};

// The Hindu Feed Map
const HINDU_FEED_MAP: Record<string, string> = {
    "": "https://www.thehindu.com/feeder/default.rss",
    "india": "https://www.thehindu.com/news/national/feeder/default.rss",
    "world": "https://www.thehindu.com/news/international/feeder/default.rss",
    "business": "https://www.thehindu.com/business/feeder/default.rss",
    "sports": "https://www.thehindu.com/sport/feeder/default.rss",
    "entertainment": "https://www.thehindu.com/entertainment/feeder/default.rss",
    "lifestyle": "https://www.thehindu.com/life-and-style/feeder/default.rss",
};

async function fetchGenericRSS(
    feedUrl: string,
    sourceId: string,
    sourceName: string,
    categorySlug: string
): Promise<Article[]> {
    try {
        const feed = await parser.parseURL(feedUrl);
        return feed.items.map((item, index) => {
            let imageUrl = "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&q=80"; // fallback

            if (item.enclosure && item.enclosure.url) {
                imageUrl = item.enclosure.url;
            } else if (item['media:content'] && item['media:content'].$) {
                imageUrl = item['media:content'].$.url || imageUrl;
            } else {
                const imgMatch = item.content?.match(/<img[^>]+src="([^">]+)"/);
                if (imgMatch && imgMatch[1]) {
                    imageUrl = imgMatch[1];
                }
            }

            return {
                id: `rss-${sourceId}-${categorySlug || 'home'}-${index}-${Date.now()}`,
                title: `[${sourceName}] ${item.title || "Untitled News"}`,
                content: item.contentSnippet || item.content || "",
                category: {
                    id: `cat-${categorySlug || 'rss'}`,
                    name: feed.title || (categorySlug ? categorySlug.toUpperCase() : "News"),
                    slug: categorySlug || "news"
                },
                created_at: item.isoDate || item.pubDate || new Date().toISOString(),
                image_url: imageUrl,
                author_id: `${sourceId}-bot`,
                category_id: `cat-${categorySlug || 'rss'}`,
            };
        });
    } catch (error) {
        console.error(`Error fetching RSS feed from ${sourceName}:`, error);
        return [];
    }
}

export async function fetchAllRSSNews(categorySlug: string = ""): Promise<Article[]> {
    const expressUrl = EXPRESS_FEED_MAP[categorySlug] || EXPRESS_FEED_MAP[""];
    const toiUrl = TOI_FEED_MAP[categorySlug] || TOI_FEED_MAP[""];
    const hinduUrl = HINDU_FEED_MAP[categorySlug] || HINDU_FEED_MAP[""];

    const [expressNews, toiNews, hinduNews] = await Promise.all([
        fetchGenericRSS(expressUrl, "express", "Indian Express", categorySlug),
        fetchGenericRSS(toiUrl, "toi", "Times of India", categorySlug),
        fetchGenericRSS(hinduUrl, "hindu", "The Hindu", categorySlug)
    ]);

    const combined = [...expressNews, ...toiNews, ...hinduNews];

    // Sort by newest first
    combined.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return combined;
}
