module.exports = {
  layout: "case-study.njk",
  tags: "caseStudies",
  eleventyComputed: {
    permalink(data) {
      if (data.published === false) {
        return false;
      }

      return `/case-studies/${data.slug}/`;
    }
  }
};
