import 'dotenv/config'
import { DateTime } from "luxon";

export default function (eleventyConfig) {
    
    eleventyConfig.addPassthroughCopy("views/assets/css");
    eleventyConfig.addPassthroughCopy("views/assets/img");
    eleventyConfig.addPassthroughCopy("views/assets/js");

    // FILTERS
    // Luxon date filter (for JavaScript Date object)
    eleventyConfig.addFilter("dateObject", (dateObj, format = "LLL d") => {
        return DateTime.fromJSDate(dateObj).toFormat(format);
    });

    //luxon date filter (for ISO 8601 date strings)
    eleventyConfig.addFilter("dateString", (dateObj, format = "LLL d") => {
        return DateTime.fromISO(dateObj).toFormat(format);
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