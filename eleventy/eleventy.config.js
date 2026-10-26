export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/components");
  eleventyConfig.addPassthroughCopy("src/site.css");

  return {
    dir: { input: "src", output: "_site" },
  };
}
