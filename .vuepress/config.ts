import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import { seriesConfig } from "./config/seriesconfig";
import { navbarConfig } from "./config/navconfig";
import { bulletinConfig } from "./config/bulletinconfig";
import { commentConfig } from "./config/commentconfig";
import { friendLinkConfig } from "./config/friendlinkconfig";
import { searchConfig } from "./config/searchconfig";

export default defineUserConfig({
  title: '冰洛博客',
  theme: recoTheme({
    repo: 'iceloX/vue-new-blog',
    author: "icelo",
    authorAvatar: "/head.jpg",
    docsBranch: "main",
    sourceDir: '/docs',
    logo:'logo.png',
    lastUpdatedText: "上次更新",
    // 自定义目录标题
    catalogTitle: '自定义目录标题',
    // 自动设置分类
    autoSetBlogCategories: true,
    // 自动设置文档
    autoSetSeries: true,
    // 文档侧边栏
    series: seriesConfig,
    // 顶部设置
    navbar: navbarConfig,
    // 搜索
    algolia:searchConfig,
    // 插件
    // 公告栏设置
    // bulletin: bulletinConfig,
    // 评论配置
    commentConfig: commentConfig,
    // 友链
    friendshipLinks: friendLinkConfig,
    // 插件
    plugins:[
      // ["vuepress-plugin-nuggets-style-copy", {
      //   copyText: "复制代码",
      //   tip: {
      //       content: "复制成功!"
      //   }
      // }]
    ]
  }),
  // debug: true,
});
