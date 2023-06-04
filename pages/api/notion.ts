import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import {
  NotionPost,
  WorkExp,
  NotionPageDetail,
  Feedback,
  StaticPage,
  SideProject,
} from "../../src/types";
import { config } from "../../config";
import { Exploration } from "../../src/types";

export default class NotionService {
  client: Client;
  n2m: NotionToMarkdown;

  notionConfig = config.notion();

  constructor() {
    this.client = new Client({ auth: this.notionConfig.apiKey });
    this.n2m = new NotionToMarkdown({ notionClient: this.client });
  }

  async getStaticPage(): Promise<StaticPage[]> {
    const response = await this.client.databases.query({
      database_id: this.notionConfig.pages,
    });

    const transformedPages = response.results.map((res) => {
      return NotionService.staticPageTransformer(res);
    });

    return transformedPages;
  }

  async getWorkExp(): Promise<WorkExp[]> {
    const response = await this.client.databases.query({
      database_id: this.notionConfig.workExperiences,
    });

    const transformedPosts = response.results
      .map((res) => {
        return NotionService.workExpTransformer(res);
      })
      .filter((p) => p.published);

    return transformedPosts;
  }

  async getCaseStudies(): Promise<NotionPost[]> {
    const response = await this.client.databases.query({
      database_id: this.notionConfig.caseStudies,
    });

    const transformedPosts = response.results.map((res) => {
      return NotionService.postTransformer(res);
    });

    return transformedPosts;
  }

  async getSideProjects(): Promise<SideProject[]> {
    const response = await this.client.databases.query({
      database_id: this.notionConfig.sideProjects,
    });

    const transformedPosts = response.results.map((res) => {
      return NotionService.sideProjectsTransformer(res);
    });

    return transformedPosts;
  }

  async getExplorations(): Promise<Exploration[]> {
    const resp = await this.client.databases.query({
      database_id: this.notionConfig.explorations,
    });

    const transformed = resp.results.map((res) => {
      return NotionService.explorationsTransformer(res);
    });

    return transformed;
  }

  async getFeedbacks(): Promise<Feedback[]> {
    const response = await this.client.databases.query({
      database_id: this.notionConfig.feedbacks,
    });

    const transformedPosts = response.results.map((res) => {
      return NotionService.feedbackTransformer(res);
    });

    return transformedPosts;
  }

  async getNotionPageDetail(
    slug: string,
    database_id: string,
    pageType: "post" | "page"
  ): Promise<NotionPageDetail> {
    const response = await this.client.databases.query({
      database_id: database_id,
      filter: {
        property: "Slug",
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

    if (pageType === "post") {
      const post = NotionService.postTransformer(detail);
      return { markdown, post };
    }

    return {
      markdown,
    };
  }

  private static staticPageTransformer(page): StaticPage {
    return {
      name: page.properties.Name.rich_text[0].plain_text,
      title: page.properties.Title.title[0].plain_text,
      description: page.properties.Description.rich_text[0]?.plain_text || "",
      heroText: page.properties.HeroText.rich_text[0]?.plain_text || "",
      heroTitle: page.properties.HeroTitle.rich_text[0]?.plain_text || "",
      id: page.id,
      slug: page.properties.Slug.formula.string,
    };
  }

  private static explorationsTransformer(page): Exploration {
    return {
      id: page.id,
      type: page.properties.Video.checkbox === true ? "video" : "image",
      name: page.properties.Name.title[0].plain_text,
      img: page.properties.Image.files[0].external.url,
    };
  }

  private static postTransformer(page): NotionPost {
    let cover = page.cover;
    if (!page.cover) {
      cover = "";
    }

    switch (cover.type) {
      case "file":
        cover = page.cover.file.url;
        break;
      case "external":
        cover = page.cover.external.url;
        break;
      default:
        cover = "";
    }

    const transformedPost = {
      properties: {
        id: page.id,
        slug: page.properties.Slug.formula.string,
        number: page.properties.Sort.number,
        published: page.properties.Published.checkbox === true,
        password: page.properties.Password.checkbox === true,
        bgColor: page.properties.BgColor.rich_text[0]?.plain_text || "000000",
        color: page.properties.TextColor.rich_text[0]?.plain_text || "ffffff",
        tag: page.properties.Tag.select?.name || null,
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
        overviewImg:
          page.properties.OverviewImg.files[0]?.external?.url || cover,
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
    return transformedPost;
  }

  private static feedbackTransformer(page): Feedback {
    return {
      id: page.id,
      relationId: page.properties.Relation.relation[0]?.id || null,
      name: page.properties.Name.title[0].plain_text,
      img: page.properties.Photo.files[0].external.url,
      orgName: page.properties.Company.multi_select[0].name,
      project: page.properties.Project.rich_text[0].plain_text,
      role: page.properties.Role.rich_text[0].plain_text,
      feedback: page.properties.Feedback.rich_text[0].plain_text,
    };
  }

  private static workExpTransformer(page): WorkExp {
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

  private static sideProjectsTransformer(page): SideProject {
    let cover = page.cover;
    if (!page.cover) {
      cover = "";
    }

    switch (cover.type) {
      case "file":
        cover = page.cover.file.url;
        break;
      case "external":
        cover = page.cover.external.url;
        break;
      default:
        cover = "";
    }

    return {
      id: page.id,
      img: cover,
      logo: page.properties.Logo.files[0].external?.url ?? page.properties.Logo.files[0].file.url ?? null,
      title: page.properties.Name.title[0].plain_text,
      website: page.properties.Website.rich_text[0]?.plain_text ?? null,
      description: page.properties.Description.rich_text[0].plain_text,
      date: page.properties.Date.rich_text[0].plain_text,
      number: page.properties.Sort.number,
    };
  }
}
