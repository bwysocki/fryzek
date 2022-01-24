const logger = require("../config/logger");
const client = require("../config/elastic");
const BaseMappingClass = require("../common/base_mapping_class");

const indexName = "analyzer_index";

/*
When you insert a new text to ElasticSearch - it is analysed: new doc -> analysis -> stored doc (inverted index)

Analysis consists of 3 steps:
- character filter: some important value => some important value
- tokenizer: My wife's birthday => [My, wife, birthday] - tokenizer remembers also position of the words
- token filter => [My, wife, birthday] => [wife, birthday] - very popular is synonym token filter

In many scenarios the standard analyser works fine.
Standard analyser has no character filter.
The tokenizer breaks words mainly by whitespace (also uses some break characters).
As token filter, standard analyser uses only lowercase token filter.

Character Filters:
- html_strip
- mapping - replaces values based on a supplied list of values and their replacements
- pattern_replace - like above but uses regex

Tokenizers:
- word oriented
  - standard
  - letter - tokenize when encounter not letter: i'm in => i, m, in
  - lowercase - as above + lowercase
  - whitespace - when encounter whitespace
  - uax_url_email - like standard but treats URLs and emails as signle tokens
- partial word oriented
  - ngram - break text into words when encountering certain character and them emits N-grams of specific length. Red wine => Re, Red, ed, wi, win, wine, in, ine, ne
  - edge_ngram - like above but generates ngram only for the beginning. Red wine => Re, Red, wi, win, wine
- structured text - used for structured text such as email, zip codes, identifiers etc
  - keyword - doesnt do anything :)
  - pattern - regex to split text into terms
  - path_hierarchy - splits hierarchical values and emits a term for each component in the tree: /a/b/c => /a, /a/b, /a/b/c

Token filters:
- lowercase
- uppercase
- nGream: Red => [R, Re, Red, e, ed] - the same as tokenizer - for flexibility
- edgeNGram
- stop - removes stop words
- word_delimeter - splits words into subwords Wi-Fi => [Wi, Fi]
- stemmer - drinking => drink
- keyword_marker - protects some words from being modified by stemmer
- snowball - stem words like stemmer but based on other algorithm (Snowball)
- synonym - happy -> happy/delighted
- trim


Analysis API:

 standard - This divides the text using a standard tokenizer: normalize tokens, lowercase tokens, and remove unwanted tokens
 simple - This splits text at non-letter and converts them into lowercase
 whitespace - This divides text on space separators
 stop - This processes the text with the standard analyzer, then applies custom stopwords
 keyword - This considers all text as a token
 pattern - This divides text using a regular expression
 snowball - This works as a standard analyzer, as well as a stemming at the end of processing


 Text analysis occurs at two times:

- Index time - When a document is indexed, any text field values are analyzed.
- Search time - When running a full-text search on a text field, the query string (the text the user is searching for) is analyzed.

 In most cases, the same analyzer should be used at index and search time (despite ngrams)

*/
const mappings = {
  mappings: {
    properties: {
      id: { type: "integer" },
      name: {
        type: "text",
        analyzer: "whitespace",
        search_analyzer: "whitespace"
      }
    }
  }
};
const silent = true;

class AnalyzerMappings extends BaseMappingClass {}

module.exports = new AnalyzerMappings(indexName, mappings, silent);
