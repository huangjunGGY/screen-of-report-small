import mockMediaCategory from '@/mock/type/paper_media_category.js';
import mockProvincial from '@/mock/type/paper_provincial.js';
import mockNational from '@/mock/type/paper_national.js';
import mockMunicipal from '@/mock/type/paper_municipal.js';
import mockArticlePage from '@/mock/article/page.js';

export function getMockFallback(config) {
  const url = config?.url || '';

  if (url.includes('/dict/type/paper_media_category')) {
    return mockMediaCategory;
  }
  if (url.includes('/dict/type/paper_provincial')) {
    return mockProvincial;
  }
  if (url.includes('/dict/type/paper_national')) {
    return mockNational;
  }
  if (url.includes('/dict/type/paper_municipal')) {
    return mockMunicipal;
  }

  if (url.includes('/article/page')) {
    let keyword = '';
    if (config.data) {
      try {
        const parsed = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
        if (parsed?.keyword) keyword = parsed.keyword;
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
    return {
      code: 0,
      msg: null,
      data: {
        ...mockArticlePage.data,
        total: records.length,
        records
      }
    };
  }

  const articleIdMatch = url.match(/\/article\/(\d+)/);
  if (articleIdMatch) {
    const articleId = Number(articleIdMatch[1]);
    const targetArticle = mockArticlePage.data.records.find(item => item.id === articleId) || mockArticlePage.data.records[0];
    return {
      code: 0,
      msg: null,
      data: targetArticle
    };
  }

  return null;
}
