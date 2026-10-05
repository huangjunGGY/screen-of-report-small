import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import path from 'path';

// 引入本地 Mock 数据
import mockMediaCategory from './src/mock/type/paper_media_category.js';
import mockProvincial from './src/mock/type/paper_provincial.js';
import mockNational from './src/mock/type/paper_national.js';
import mockMunicipal from './src/mock/type/paper_municipal.js';
import mockArticlePage from './src/mock/article/page.js';

// 本地开发 Mock 服务插件（确保离线/无独立后端时功能满血运转）
function localMockPlugin() {
  return {
    name: 'vite-plugin-local-mock',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const urlObj = new URL(req.url, 'http://localhost');
        const pathname = urlObj.pathname;

        // 占位图片处理（如 search.vue / 报刊预览中的 filePath 动态请求）
        if (pathname.includes('/fileInfoLocation') || pathname.includes('/newspaperInfo/')) {
          // 返回 1x1 透明 PNG 避免图片加载红标报错
          const transparentPng = Buffer.from(
            'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
            'base64'
          );
          res.setHeader('Content-Type', 'image/png');
          res.end(transparentPng);
          return;
        }

        // 拦截 /api/admin/* 系列接口
        if (pathname.startsWith('/api/admin/')) {
          res.setHeader('Content-Type', 'application/json;charset=utf-8');

          // 媒体分类字典
          if (pathname.includes('/dict/type/paper_media_category')) {
            res.end(JSON.stringify(mockMediaCategory));
            return;
          }
          if (pathname.includes('/dict/type/paper_provincial')) {
            res.end(JSON.stringify(mockProvincial));
            return;
          }
          if (pathname.includes('/dict/type/paper_national')) {
            res.end(JSON.stringify(mockNational));
            return;
          }
          if (pathname.includes('/dict/type/paper_municipal')) {
            res.end(JSON.stringify(mockMunicipal));
            return;
          }

          // 文章列表与搜索
          if (pathname === '/api/admin/article/page') {
            // 获取请求体（如搜索参数）
            let body = '';
            req.on('data', chunk => {
              body += chunk;
            });
            req.on('end', () => {
              let keyword = urlObj.searchParams.get('keyword') || '';
              if (body) {
                try {
                  const parsed = JSON.parse(body);
                  if (parsed.keyword) keyword = parsed.keyword;
                } catch (e) {}
              }

              let records = [...mockArticlePage.data.records];
              if (keyword) {
                records = records.filter(item => 
                  (item.title && item.title.includes(keyword)) ||
                  (item.summary && item.summary.includes(keyword)) ||
                  (item.newspaperInfoTags && item.newspaperInfoTags.includes(keyword))
                );
              }

              const responseData = {
                code: 0,
                msg: null,
                data: {
                  ...mockArticlePage.data,
                  total: records.length,
                  records
                }
              };
              res.end(JSON.stringify(responseData));
            });
            return;
          }

          // 文章详情 /api/admin/article/:id
          const articleIdMatch = pathname.match(/\/api\/admin\/article\/(\d+)/);
          if (articleIdMatch) {
            const articleId = Number(articleIdMatch[1]);
            const targetArticle = mockArticlePage.data.records.find(item => item.id === articleId) || mockArticlePage.data.records[0];
            res.end(JSON.stringify({
              code: 0,
              msg: null,
              data: targetArticle
            }));
            return;
          }
        }

        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 将 uni- 开头的标签识别为自定义元素，防止 Vue 抛出未注册组件警告
          isCustomElement: (tag) => tag.startsWith('uni-')
        }
      }
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia'
      ],
      dts: false
    }),
    localMockPlugin()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '/image': path.resolve(__dirname, 'public/image')
    }
  },
  server: {
    port: 3000,
    open: false,
    host: '0.0.0.0'
  }
});
