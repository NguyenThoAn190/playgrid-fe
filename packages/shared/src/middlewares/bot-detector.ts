import { NextRequest, NextResponse } from "next/server";

/**
 * Whitelisted Search Engines and Social Preview Crawlers
 * These bots must be allowed for SEO ranking and social media link previews (Facebook, Zalo, Twitter, etc.)
 */
export const WHITELISTED_BOT_PATTERNS = [
  "googlebot",
  "google-inspectiontool",
  "google-structured-data-testing-tool",
  "googleother",
  "bingbot",
  "msnbot",
  "bingpreview",
  "duckduckbot",
  "baiduspider",
  "yandexbot",
  "facebookexternalhit",
  "facebot",
  "twitterbot",
  "telegrambot",
  "whatsapp",
  "zalo-bot",
  "zalobot",
  "linkedinbot",
  "slackbot",
  "discordbot",
  "skypeuripreview",
  "pinterestbot",
  "applebot",
];

/**
 * Blacklisted Scraping Frameworks, Automated HTTP Clients, and Headless Browsers
 */
export const BLACKLISTED_BOT_PATTERNS = [
  // HTTP Libraries & Scripting tools
  "python-requests",
  "python-urllib",
  "aiohttp",
  "httpx",
  "requests/",
  "scrapy",
  "colly",
  "go-http-client",
  "curl/",
  "wget/",
  "httpclient",
  "postmanruntime",
  "insomnia",
  "axios/",
  "node-fetch",
  "undici",
  "got/",
  "superagent",
  "java/",
  "apache-httpclient",
  "guzzlehttp",
  "restsharp",
  "ruby",
  "faraday",
  "libwww-perl",
  "php/",
  "okhttp",

  // Headless & Automation Browsers
  "headlesschrome",
  "phantomjs",
  "selenium",
  "puppeteer",
  "playwright",
  "webdriver",
  "nightwatch",
  "casperjs",
  "cypress",

  // Aggressive / Content Scraping Bots
  "bytespider",
  "petalbot",
  "ahrefsbot",
  "semrushbot",
  "mj12bot",
  "dotbot",
  "megaindex",
  "archive.org_bot",
  "grapeshot",
  "dataforseobot",
  "zoominfobot",
  "screaming frog",
  "sitebulb",
];

export interface BotDetectionResult {
  isBot: boolean;
  isAllowed: boolean;
  reason?: string;
}

/**
 * Inspects an incoming NextRequest for automated bot signatures and scraping tools.
 */
export function detectBot(request: NextRequest): BotDetectionResult {
  const userAgent = request.headers.get("user-agent")?.trim().toLowerCase() || "";

  // 1. Missing or empty User-Agent is almost always an automated script
  if (!userAgent || userAgent.length < 5) {
    return {
      isBot: true,
      isAllowed: false,
      reason: "Missing or invalid User-Agent header",
    };
  }

  // 2. Check if the bot belongs to Whitelisted Search Engines or Social Sharers
  const isWhitelisted = WHITELISTED_BOT_PATTERNS.some((pattern) =>
    userAgent.includes(pattern)
  );

  if (isWhitelisted) {
    return {
      isBot: true,
      isAllowed: true,
      reason: "Whitelisted Search Engine or Social Bot",
    };
  }

  // 3. Check against known Scraping & Automation Blacklist
  const matchedBlacklist = BLACKLISTED_BOT_PATTERNS.find((pattern) =>
    userAgent.includes(pattern)
  );

  if (matchedBlacklist) {
    return {
      isBot: true,
      isAllowed: false,
      reason: `Blocked crawler signature: ${matchedBlacklist}`,
    };
  }

  // 4. Check for suspicious automation headers
  if (
    request.headers.get("x-crawler") ||
    request.headers.get("x-scraper") ||
    request.headers.get("x-bot")
  ) {
    return {
      isBot: true,
      isAllowed: false,
      reason: "Suspicious crawler header detected",
    };
  }

  return {
    isBot: false,
    isAllowed: true,
  };
}

/**
 * Generates a standard blocked response for crawlers
 */
export function createBotBlockedResponse(reason?: string) {
  return new NextResponse(
    JSON.stringify({
      statusCode: 403,
      error: "Forbidden",
      message: "Automated scraping and bot access is prohibited on PlayGrid.",
      reason: reason || "Bot Signature Detected",
    }),
    {
      status: 403,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "X-Robots-Tag": "noindex, nofollow, noarchive",
      },
    }
  );
}
