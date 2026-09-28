import logoTm from "./logoTm.png";
import { webDevelopment } from "./data/webDevelopment";
import { mobileAppDevelopment } from "./data/mobileAppDevelopment";
import { dotnetDevelopment } from "./data/dotnetDevelopment";
import { chatSolution } from "./data/chatSolution";
import { customWebSolution } from "./data/customWebSolution";
import { shopify } from "./data/shopify";

export const images = {
  logoTm,
};

export const project = [
  ...webDevelopment,
  ...mobileAppDevelopment,
  ...dotnetDevelopment,
  ...chatSolution,
  ...customWebSolution,
  ...shopify,
];
