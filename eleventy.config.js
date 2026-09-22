const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("uploads");
  eleventyConfig.addPassthroughCopy("admin");

  eleventyConfig.addFilter("absoluteUrl", function (url, base) {
    return new URL(url, base).href;
  });

  eleventyConfig.addFilter("encodeUrlPath", function (url) {
    return url.split("/").map((segment) => encodeURIComponent(segment)).join("/");
  });

  eleventyConfig.addFilter("readableDate", function (date) {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC"
    }).format(date);
  });

  eleventyConfig.addFilter("htmlDateString", function (date) {
    return date.toISOString().slice(0, 10);
  });

  eleventyConfig.addCollection("publishedCaseStudies", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("caseStudies")
      .filter((item) => item.data.published !== false);
  });

  eleventyConfig.addCollection("sitemapPages", function (collectionApi) {
    return collectionApi.getAll().filter((item) => {
      if (!item.url || item.data.sitemap === false || item.data.published === false) {
        return false;
      }

      return item.url === "/" || item.url.endsWith("/");
    });
  });

  eleventyConfig.setLibrary(
    "md",
    markdownIt({
      html: true,
      linkify: true
    })
  );

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
