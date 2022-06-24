import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import {
  Post,
  WorkExp,
  PostDetail,
} from '../../@types/schema';
import { config } from '../../config';

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

    return response.results.map((res) => {
      return NotionService.workExpTransformer(res);
    });
  }

  async getCareerHighlights(): Promise<Post[]> {
    const response = await this.client.databases.query({
      database_id: config.notion.careerHighlights,
    });

    return response.results.map((res) => {
      return NotionService.postTransformer(res);
    });
  }

  async getSideProjects(): Promise<Post[]> {
    const response = await this.client.databases.query({
      database_id: config.notion.sideProjects,
    });

    return response.results.map((res) => {
      return NotionService.postTransformer(res);
    });
  }

  async getPostDetail(slug: string, db: string): Promise<PostDetail> {
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

    if (!response.results[0]) {
      throw 'no results';
    }

    const detail = response.results[0];

    const mdBlocks = await this.n2m.pageToMarkdown(detail.id);
    const markdown = this.n2m.toMarkdownString(mdBlocks);

    const post = NotionService.postTransformer(detail);

    return {
      markdown,
      post,
    };
  }

  private static postTransformer(page: any): Post {
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
      img: cover,
      title: page.properties.Name.title[0].plain_text,
      description: page.properties.Description.rich_text[0].plain_text,
      period: page.properties.Period.rich_text[0].plain_text,
      slug: page.properties.Slug.formula.string,
      logo: page.properties.Logo.files[0].file.url,
      website: page.properties.Website.rich_text[0].plain_text,
    };
  }

  private static workExpTransformer(page: any): WorkExp {
    return {
      id: page.id,
      company: page.properties.Company.title[0].plain_text,
      period: page.properties.Period.rich_text[0].plain_text,
      role: page.properties.Role.rich_text[0].plain_text,
      logo: page.properties.Logo.files[0].file.url,
      website: page.properties.Website.rich_text[0].plain_text,
      description: page.properties.Description.rich_text[0].plain_text,
    };
  }
}
