"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMarkdownContent = void 0;
function parseMarkdownContent(article, choice = { option: "1" }) {
    const coverImageBanner = article.cover_image
        ? `<img src="${article.cover_image}" alt="Cover Image" />`
        : "";
    const formattedTimestamp = formatTimestamp(article.published_timestamp);
    // the api response of article fetched using id has different fields compared to api response of user's article.
    const formattedTags = choice && choice.option === "2"
        ? article.tags.join(", ")
        : article.tag_list.map((tag) => `\`${tag}\``).join(", ");
    return `\
  ${coverImageBanner}
  <hr />
  
  # ${article.title}
  
  **Tags:** ${formattedTags}

  **Published At:** ${formattedTimestamp}

  **URL:** [${article.url}](${article.url})

  <hr />
  ${article.body_markdown}    
  `;
}
exports.parseMarkdownContent = parseMarkdownContent;
const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
};
