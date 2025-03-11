import 'dotenv/config'
import { DateTime } from "luxon";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { EleventyI18nPlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {

    eleventyConfig.addPassthroughCopy("views/assets/css");
    eleventyConfig.addPassthroughCopy("views/assets/img");
    eleventyConfig.addPassthroughCopy("views/assets/js");

    //SHORTCODES
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`); // current year

    // PLUGINS
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(EleventyI18nPlugin, {
        defaultLanguage: "en",
    });

    // FILTERS
    // Luxon date filter (for JavaScript Date object)
    eleventyConfig.addFilter("dateObject", (dateObj, format = "LLL d") => {
        return DateTime.fromJSDate(dateObj).toFormat(format);
    });

    //luxon date filter (for ISO 8601 date strings)
    eleventyConfig.addFilter("dateString", (dateObj, format = "LLL d") => {
        return DateTime.fromISO(dateObj).toFormat(format);
    });

    // LOCALIZED COLLECTIONS
    // english collection
    eleventyConfig.addCollection("all_en", function (collection) {
        return collection.getFilteredByGlob("views/en/**/*.md");
    });

    // czech collection
    eleventyConfig.addCollection("all_cs", function (collection) {
        return collection.getFilteredByGlob("views/cs/**/*.md");
    });

};

export const config = {

    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",

    dir: {
        input: "views",
        layouts: "_layouts",
        output: "dist"
    }
};