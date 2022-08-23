import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { NotionPost, WorkExp, NotionPageDetail } from '../../@types/schema';
import { config } from '../../config';

import { StaticPages } from '../../@types/schema';
export default class NotionService {
  client: Client;
  n2m: NotionToMarkdown;

  constructor() {
    this.client = new Client({ auth: config.notion.apiKey });
    this.n2m = new NotionToMarkdown({ notionClient: this.client });
  }

  async getWorkExp(): Promise<WorkExp[]> {
    const response = await this.client.databases.query({
      database_id: config.notion.workExp,
    });

    const transformedPosts = response.results
      .map((res) => {
        return NotionService.workExpTransformer(res);
      })
      .filter((p) => p.published);

    return transformedPosts;
  }

  async getPortfolioPosts(): Promise<NotionPost[]> {
    const response = await this.client.databases.query({
      database_id: config.notion.portfolioPosts,
    });

    const transformedPosts = response.results
      .map((res) => {
        return NotionService.postTransformer(res);
      })
      .filter((p) => p.published);

    return transformedPosts;
  }

  async getStaticPages(): Promise<StaticPages[]> {
    const response = await this.client.databases.query({
      database_id: config.notion.staticPages,
    });

    const transformedPages = response.results.map((res) => {
      return NotionService.staticPageTransformer(res);
    });

    return transformedPages;
  }

  async getNotionPageDetail(
    slug: string,
    db: string
  ): Promise<NotionPageDetail> {
    const response = await this.client.databases.query({
      database_id: db,
      filter: {
        property: 'Slug',
        formula: {
          string: {
            equals: slug,
          },
        },
      },
    });

    const detail = response.results[0];

    const mdBlocks = await this.n2m.pageToMarkdown(detail.id);
    const markdown = this.n2m.toMarkdownString(mdBlocks);

    const post = NotionService.postTransformer(detail);

    return {
      markdown,
      post,
    };
  }

  private static staticPageTransformer(page: any): StaticPages {
    return {
      title: page.properties.Title.title[0].plain_text,
      description: page.properties.Description.rich_text[0]?.plain_text || '',
      heroText: page.properties.HeroText.rich_text[0]?.plain_text || '',
      heroTitle: page.properties.HeroTitle.rich_text[0]?.plain_text || '',
    };
  }

  private static postTransformer(page: any): NotionPost {
    let cover = page.cover;

    switch (cover.type) {
      case 'file':
        cover = page.cover.file.url;
        break;
      case 'external':
        cover = page.cover.external.url;
        break;
      default:
        // placeholder
        cover = '';
    }
    return {
      id: page.id,
      published: page.properties.Published.checkbox === true,
      vertical: page.properties.Vertical?.checkbox === true,
      password: page.properties.Password?.checkbox === true || false,
      img: cover,
      bgColor: page.properties.BgColor?.rich_text[0]?.plain_text || '000000',
      color: page.properties.TextColor?.rich_text[0]?.plain_text || 'ffffff',
      title: page.properties.Name.title[0].plain_text,
      description: page.properties.Description.rich_text[0].plain_text,
      period: page.properties.Period.rich_text[0].plain_text,
      slug: page.properties.Slug.formula.string,
      logo: page.properties.Logo.files[0].file.url,
      website: page.properties.Website.rich_text[0].plain_text,
      client: page.properties.Client?.rich_text[0]?.plain_text || null,
      contributions:
        page.properties.Contributions?.rich_text[0]?.plain_text || null,
      position: page.properties.Position?.rich_text[0]?.plain_text || null,
      type: page.properties.Type?.multi_select[0]?.name || null,
      overviewImg: page.properties.OverviewImg?.files[0]?.file?.url || null,
    };
  }

  private static workExpTransformer(page: any): WorkExp {
    return {
      id: page.id,
      num: page.properties.Num.number,
      published: page.properties.Published.checkbox === true,
      company: page.properties.Company.title[0].plain_text,
      tagline: page.properties.Tagline.rich_text[0].plain_text,
      period: page.properties.Period.rich_text[0].plain_text,
      role: page.properties.Role.rich_text[0].plain_text,
      logo: page.properties.Logo.files[0].file.url,
      website: page.properties.Website.rich_text[0].plain_text,
      description: page.properties.Description.rich_text[0].plain_text,
    };
  }
}
