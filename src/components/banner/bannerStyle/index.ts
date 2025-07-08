import { bannerFooter } from "./bannerFooter";
import { bannerMain } from "./BannerMain";
import { bannerSubOrange, bannerSubYellow } from "./BannerSub";

export const getBannerStyleByType = (
  type: string,
  content: any,
  variant?: string
) => {
  switch (type) {
    case "banner_main":
      return bannerMain(content);
    case "banner_sub":
      if (variant == "orange-text") return bannerSubOrange(content);
      if (variant == "yellow-text") return bannerSubYellow(content);
      break;
    case "banner_footer":
      return bannerFooter(content);
  }

  throw new Error(
    `No style found for type "${type}" with variant "${variant}"`
  );
};
