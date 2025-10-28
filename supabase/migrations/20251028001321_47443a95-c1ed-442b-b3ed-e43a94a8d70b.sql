-- Add robots_txt column to site_settings to store robots.txt content
ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS robots_txt TEXT;

-- Set default value from the actual robots.txt file
UPDATE site_settings 
SET robots_txt = 'User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

# AI Crawlers for AEO/GEO Optimization
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: *
Allow: /

# Sitemap
Sitemap: https://ascentgroupconstruction.com/sitemap.xml

# Block access to admin pages
User-agent: *
Disallow: /admin
Disallow: /auth'
WHERE robots_txt IS NULL;