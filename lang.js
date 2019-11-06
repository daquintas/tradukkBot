module.exports.languageConvert = languageConvert;

function languageConvert(emoji) {
  let language;
  switch (emoji) {
    case "flag-ae":
      language = "ar";
      break;
    case "flag-am":
      language = "hy";
      break;
    case "flag-az":
      language = "az";
      break;
    case "flag-ba":
      language = "bs";
      break;
    case "flag-bg":
      language = "bg";
      break;
    case "flag-cn":
      language = "zh-CN";
      break;
    case "flag-cz":
      language = "cs";
      break;
    case "flag-de":
      language = "de";
      break;
    case "flag-ee":
      language = "et";
      break;
    case "flag-es":
      language = "es";
      break;
    case "flag-fi":
      language = "fi";
      break;
    case "flag-fr":
      language = "fr";
      break;
    case "flag-gb":
      language = "en";
      break;
    case "flag-hr":
      language = "hr";
      break;
    case "flag-hu":
      language = "hu";
      break;
    case "flag-ie":
      language = "ga";
      break;
    case "flag-it":
      language = "it";
      break;
    case "flag-jp":
      language = "ja";
      break;
    case "flag-kp":
      language = "ko";
      break;
    case "flag-kr":
      language = "ko";
      break;
    case "flag-lt":
      language = "lt";
      break;
    case "flag-nl":
      language = "nl";
      break;
    case "flag-no":
      language = "no";
      break;
    case "flag-pl":
      language = "pl";
      break;
    case "flag-pt":
      language = "pt";
      break;
    case "flag-ro":
      language = "ro";
      break;
    case "flag-rs":
      language = "sr";
      break;
    case "flag-ru":
      language = "ru";
      break;
    case "flag-sa":
      language = "ar";
      break;
    case "flag-sk":
      language = "sk";
      break;
    case "flag-tr":
      language = "tr";
      break;
    case "flag-ua":
      language = "uk";
      break;
    case "flag-us":
      language = "en";
      break;
  }
  return language;
}