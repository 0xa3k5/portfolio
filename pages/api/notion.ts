import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { PortfolioPost, WorkExperience, PortfolioDetail } from './schema';

export default class NotionService {
  client: Client;
  n2m: NotionToMarkdown;

  constructor() {
    this.client = new Client({ auth: process.env.NOTION_API_KEY as string });
    this.n2m = new NotionToMarkdown({ notionClient: this.client });
  }

  async getPortfolioPosts(): Promise<PortfolioPost[]> {
    const response = await this.client.databases.query({
      database_id: process.env.NOTION_PORTFOLIO_DATABASE_ID as string,
    });

    return response.results.map((res) => {
      return NotionService.portfolioPostTransformer(res);
    });
  }

  async getWorkExperiences(): Promise<WorkExperience[]> {
    const response = await this.client.databases.query({
      database_id: process.env.NOTION_WORK_DATABASE_ID as string,
      // sorts: [
      //   {
      //     property: 'created_time',
      //     direction: 'descending',
      //   },
      // ],
    });

    return response.results.map((res) => {
      return NotionService.workExperienceTransformer(res);
    });
  }

  async getPortfolioDetail(slug: string): Promise<PortfolioDetail> {
    const response = await this.client.databases.query({
      database_id: process.env.NOTION_PORTFOLIO_DATABASE_ID as string,
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

    const portfolioPost = NotionService.portfolioPostTransformer(detail);

    return {
      markdown,
      portfolioPost,
    };
  }

  private static portfolioPostTransformer(page: any): PortfolioPost {
    let cover = page.cover;

    switch (cover.type) {
      case 'file':
        cover = page.cover.file;
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
    };
  }

  private static workExperienceTransformer(page: any): WorkExperience {
    return {
      id: page.id,
      company: page.properties.Company.title[0].plain_text,
      period: page.properties.Period.rich_text[0].plain_text,
      role: page.properties.Role.rich_text[0].plain_text,
      img: page.properties.Logo.files[0].file.url,
      description: page.properties.Description.rich_text[0].plain_text,
    };
  }
}
