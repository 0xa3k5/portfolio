import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import {
  NotionPost,
  WorkExp,
  NotionPageDetail,
  Feedback,
  StaticPage,
} from '../../@types/schema';
import { config } from '../../config';

export default class NotionService {
  client: Client;
  n2m: NotionToMarkdown;

  constructor() {
    this.client = new Client({ auth: config.notion.apiKey });
    this.n2m = new NotionToMarkdown({ notionClient: this.client });
  }

  async getStaticPage(): Promise<StaticPage[]> {
    const response = await this.client.databases.query({
      database_id: config.notion.staticPages,
    });

    const transformedPages = response.results.map((res) => {
      return NotionService.staticPageTransformer(res);
    });

    return transformedPages;
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
      .filter((p) => p.properties.published);

    return transformedPosts;
  }

  async getFeedbacks(): Promise<Feedback[]> {
    const response = await this.client.databases.query({
      database_id: config.notion.feedbacks,
    });

    const transformedPosts = response.results.map((res) => {
      return NotionService.feedbackTransformer(res);
    });

    return transformedPosts;
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

  private static staticPageTransformer(page: any): StaticPage {
    return {
      name: page.properties.Name.rich_text[0].plain_text,
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

    const transformedPage = {
      properties: {
        id: page.id,
        slug: page.properties.Slug.formula.string,
        number: page.properties.Sort.number,
        published: page.properties.Published.checkbox === true,
        vertical: page.properties.Vertical.checkbox === true,
        password: page.properties.Password.checkbox === true || false,
        bgColor: page.properties.BgColor.rich_text[0]?.plain_text || '000000',
        color: page.properties.TextColor.rich_text[0]?.plain_text || 'ffffff',
      },
      details: {
        img: cover,
        description: page.properties.Description.rich_text[0].plain_text,
        type: page.properties.Type.multi_select[0]?.name || null,
        title: page.properties.Name.title[0].plain_text,
        period: page.properties.Period.rich_text[0].plain_text,
        contributions:
          page.properties.Contributions.rich_text[0]?.plain_text || null,
        position: page.properties.Position.rich_text[0]?.plain_text || null,
        overviewImg: page.properties.OverviewImg.files[0]?.external?.url || cover,
      },
      org: {
        logo: page.properties.Logo.files[0].external.url,
        website: page.properties.Website.rich_text[0].plain_text,
        orgName: page.properties.Client.rich_text[0]?.plain_text || null,
      },
      feedbacks: {
        id: page.properties.Feedbacks.id,
        relationIds:
          page.properties.Feedbacks.relation.map((obj) => obj.id) || null,
      },
    };
    return transformedPage;
  }

  private static feedbackTransformer(page: any): Feedback {
    return {
      id: page.id,
      relationId: page.properties.Relation.relation[0].id,
      name: page.properties.Name.title[0].plain_text,
      img: page.properties.Photo.files[0].external.url,
      orgName: page.properties.Company.multi_select[0].name,
      project: page.properties.Project.rich_text[0].plain_text,
      role: page.properties.Role.rich_text[0].plain_text,
      feedback: page.properties.Feedback.rich_text[0].plain_text,
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
      logo: page.properties.Logo.files[0].external.url,
      website: page.properties.Website.rich_text[0].plain_text,
      description: page.properties.Description.rich_text[0].plain_text,
    };
  }
}
