<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
>
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Sitemap</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 24px; color: #0f172a; }
          h1 { margin: 0 0 8px; font-size: 28px; }
          p { margin: 0 0 20px; color: #475569; }
          table { width: 100%; border-collapse: collapse; }
          th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
          th { background: #f8fafc; font-size: 13px; text-transform: uppercase; letter-spacing: 0.04em; }
          tr:hover td { background: #f8fafc; }
          .url { word-break: break-all; }
          .meta { color: #64748b; font-size: 13px; }
        </style>
      </head>
      <body>
        <h1>Sitemap</h1>
        <p>Generated URLs for search engines and browser preview.</p>
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Last Modified</th>
              <th>Change Frequency</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="sitemap:urlset/sitemap:url">
              <tr>
                <td class="url"><xsl:value-of select="sitemap:loc" /></td>
                <td class="meta"><xsl:value-of select="sitemap:lastmod" /></td>
                <td class="meta"><xsl:value-of select="sitemap:changefreq" /></td>
                <td class="meta"><xsl:value-of select="sitemap:priority" /></td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>