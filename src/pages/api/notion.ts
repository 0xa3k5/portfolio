/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { config } from "../../config";

import { MdStringObject } from "notion-to-md/build/types";
import {
  StaticPage,
  WorkExp,
  NotionPost,
  SideProject,
  Exploration,
  Feedback,
  Craft,
  NotionPageDetail,
  Bookmarks,
  Collaborator,
  Idea,
  BikeVideo,
} from "@/src/types";

export default class NotionService {
  static NOTION_DATABASES = {
    staticPage: config.NOTION_PAGES,
    workExp: config.NOTION_WORK_EXPERIENCES,
    caseStudies: config.NOTION_CASE_STUDIES,
    sideProjects: config.NOTION_SIDE_PROJECTS,
    explorations: config.NOTION_EXPLORATIONS,
    feedbacks: config.NOTION_FEEDBACKS,
    bookmarks: config.NOTION_BOOKMARKS,
    collaborators: config.NOTION_COLLABORATORS,
    ideas: config.NOTION_IDEAS,
    bike: config.NOTION_BIKE,
  };

  client: Client;
  n2m: NotionToMarkdown;

  constructor() {
    this.client = new Client({ auth: config.NOTION_API_KEY });
    this.n2m = new NotionToMarkdown({
      notionClient: this.client,
    });
  }

  async queryDatabase(databaseId: string) {
    const response = await this.client.databases.query({
      database_id: databaseId,
    });

    return response.results;
  }

  transformData<T, R>(data: T[], transformer: (item: T) => R): R[] {
    return data.map((res) => transformer(res));
  }

  async getStaticPage(): Promise<StaticPage[]> {
    const response = await this.queryDatabase(
      NotionService.NOTION_DATABASES.staticPage
    );
    const transformedPages = this.transformData(
      response,
      NotionService.staticPageTransformer
    );

    return transformedPages;
  }

  async getWorkExp(): Promise<WorkExp[]> {
    const response = await this.queryDatabase(
      NotionService.NOTION_DATABASES.workExp
    );
    const transformedPosts = this.transformData(
      response,
      NotionService.workExpTransformer
    ).filter((p) => p.published);

    return transformedPosts;
  }

  async getCaseStudies(): Promise<NotionPost[]> {
    const response = await this.queryDatabase(
      NotionService.NOTION_DATABASES.caseStudies
    );
    const transformedPosts = this.transformData(
      response,
      NotionService.postTransformer
    );

    return transformedPosts;
  }

  async getSideProjects(): Promise<SideProject[]> {
    const response = await this.queryDatabase(
      NotionService.NOTION_DATABASES.sideProjects
    );
    const transformedPosts = this.transformData(
      response,
      NotionService.sideProjectsTransformer
    );

    return transformedPosts;
  }

  async getExplorations(): Promise<Exploration[]> {
    const response = await this.queryDatabase(
      NotionService.NOTION_DATABASES.explorations
    );
    const transformed = this.transformData(
      response,
      NotionService.explorationsTransformer
    );

    return transformed;
  }

  async getFeedbacks(): Promise<Feedback[]> {
    const response = await this.queryDatabase(
      NotionService.NOTION_DATABASES.feedbacks
    );
    const transformedPosts = this.transformData(
      response,
      NotionService.feedbackTransformer
    );

    return transformedPosts;
  }

  async getCraft(): Promise<{
    posts: Craft[];
    md: any;
  }> {
    const response = await this.client.databases.query({
      database_id: config.NOTION_PLAYGROUND,
    });

    const transformedPosts = response.results.map((res) => {
      return NotionService.craftTransformer(res);
    });

    const mdArr: {
      [key: string]: {
        markdown: MdStringObject;
      };
    } = {};

    const getMd = async (res: any) => {
      const mdBlocks = await this.n2m.pageToMarkdown(res.id);
      const markdown = this.n2m.toMarkdownString(mdBlocks);
      return { markdown };
    };

    const mdPromises = response.results.map((res) => getMd(res));
    const mdResults = await Promise.all(mdPromises);

    mdResults.forEach((result, index) => {
      const res = response.results[index];
      const post = transformedPosts.find((p) => p.id === res.id);
      if (post) {
        mdArr[post.slug] = { markdown: result.markdown };
      }
    });

    return { posts: transformedPosts, md: mdArr };
  }

  async getBikeVideos(): Promise<BikeVideo[]> {
    try {
      const response = await this.client.databases.query({
        database_id: NotionService.NOTION_DATABASES.bike,
      });
      console.log(response);

      return response.results.map(NotionService.bikeVideoTransformer);
    } catch (error) {
      console.error("Error fetching bike videos:", error);
      return [];
    }
  }

  async getNotionPageDetail(
    slug: string,
    databaseId: string,
    pageType: string
  ): Promise<NotionPageDetail> {
    const response = await this.client.databases.query({
      database_id: databaseId,
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

  async getBookmarks(): Promise<Bookmarks[]> {
    const response = await this.queryDatabase(
      NotionService.NOTION_DATABASES.bookmarks
    );
    return this.transformData(response, NotionService.bookmarksTransformer);
  }

  async getCollaborators(): Promise<Collaborator[]> {
    const response = await this.queryDatabase(
      NotionService.NOTION_DATABASES.collaborators
    );

    return this.transformData(response, NotionService.collaboratorTransformer);
  }

  async getIdeas(): Promise<{
    posts: Idea[];
    md: {
      [key: string]: {
        markdown: MdStringObject;
      };
    };
  }> {
    const response = await this.client.databases.query({
      database_id: config.NOTION_IDEAS,
    });

    const transformedPosts = response.results.map((res) => {
      return NotionService.ideaTransformer(res);
    });

    const mdArr: {
      [key: string]: {
        markdown: MdStringObject;
      };
    } = {};

    const getMd = async (res: any) => {
      const mdBlocks = await this.n2m.pageToMarkdown(res.id);
      const markdown = this.n2m.toMarkdownString(mdBlocks);
      return { markdown };
    };

    const mdPromises = response.results.map((res) => getMd(res));
    const mdResults = await Promise.all(mdPromises);

    mdResults.forEach((result, index) => {
      const res = response.results[index];
      const post = transformedPosts.find((p) => p.id === res.id);
      if (post) {
        mdArr[post.slug] = { markdown: result.markdown };
      }
    });

    return { posts: transformedPosts, md: mdArr };
  }

  private static staticPageTransformer(page: any): StaticPage {
    return {
      name: page.properties.Name.rich_text[0].plain_text,
      title: page.properties.Title.title[0].plain_text,
      description: page.properties.Description.rich_text[0]?.plain_text || "",
      heroText: page.properties.HeroText.rich_text[0]?.plain_text || "",
      heroTitle: page.properties.HeroTitle.rich_text[0]?.plain_text || "",
      id: page.id,
      slug: page.properties.Slug.formula.string,
      extra: page.properties.Extra?.rich_text[0]?.plain_text ?? null,
    };
  }

  private static explorationsTransformer(page: any): Exploration {
    return {
      id: page.id,
      type: page.properties.Video.checkbox === true ? "video" : "image",
      name: page.properties.Name.title[0].plain_text,
      img: page.properties.Image.files[0].external.url,
    };
  }

  private static postTransformer(page: any): NotionPost {
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
        collaborators: {
          id: page.properties.Collaborators.id,
          relationIds:
            page.properties.Collaborators.relation.map((obj: any) => obj.id) ||
            null,
        },
        categories: page.properties.Categories.multi_select.map(
          (cat: any) => cat.name
        ),
      },
      org: {
        logo: page.properties.Logo.files[0]?.external?.url,
        website: page.properties.Website.rich_text[0].plain_text,
        orgName: page.properties.Client.rich_text[0]?.plain_text || null,
      },
      feedbacks: {
        id: page.properties.Feedbacks.id,
        relationIds:
          page.properties.Feedbacks.relation.map((obj: any) => obj.id) || null,
      },
    };

    return transformedPost;
  }

  private static feedbackTransformer(page: any): Feedback {
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

  private static workExpTransformer(page: any): WorkExp {
    return {
      id: page.id,
      num: page.properties.Num.number,
      published: page.properties.Published.checkbox === true,
      company: page.properties.Company.title[0].plain_text,
      tagline: page.properties.Tagline.rich_text[0].plain_text,
      period: page.properties.Period.rich_text[0].plain_text,
      logo: page.properties.Logo.files[0].external.url,
      website: page.properties.Website.rich_text[0].plain_text,
      collaborators: {
        id: page.properties.Teammates.id,
        relationIds:
          page.properties.Teammates.relation.map((obj: any) => obj.id) || null,
      },
    };
  }

  private static sideProjectsTransformer(page: any): SideProject {
    return {
      id: page.id,
      logo:
        page.properties.Logo.files[0]?.external?.url ??
        page.properties.Logo.files[0]?.file?.url ??
        null,
      title: page.properties.Name.title[0].plain_text,
      website: page.properties.Website.rich_text[0]?.plain_text ?? null,
      description: page.properties.Description.rich_text[0].plain_text,
      date: page.properties.Date.number,
      thumbnail:
        page.properties.Thumbnails?.files.map(
          (thumbnail: any) => thumbnail.external.url
        ) ?? null,
    };
  }
  private static craftTransformer(page: any): Craft {
    return {
      id: page.id,
      slug: page.properties.Slug?.formula.string || "",
      title: page.properties.Name.title[0].plain_text,
      date: page.properties.Date.rich_text[0].plain_text,
    };
  }

  private static bookmarksTransformer(page: any): Bookmarks {
    return {
      name: page.properties.Name.title[0].plain_text,
      url: page.properties.URL.url,
      isTool: page.properties.isTool.checkbox,
      createdAt: page.created_time,
      tags: page.properties.Tags.multi_select.map((tag: any) => tag.name),
    };
  }

  private static collaboratorTransformer(page: any): Collaborator {
    return {
      id: page.id,
      name: page.properties.Name.title[0].plain_text,
      url: page.properties.URL.url,
      role: page.properties.Role.rich_text[0].plain_text,
      image: page.properties.Image.files[0].external.url,
    };
  }

  private static ideaTransformer(page: any): Idea {
    return {
      id: page.id,
      slug: page.properties.Slug.formula.string,
      private: page.properties.Private.checkbox,
      name: page.properties.Name.title[0].plain_text,
      date: page.properties.Date.date.start,
      killedBy: page.properties.KilledBy?.rich_text[0]?.plain_text ?? null,
      killedByLink: page.properties.KilledByLink?.url ?? null,
      tags: page.properties.Tags.multi_select.map((tag: any) => tag.name),
    };
  }

  private static bikeVideoTransformer(page: any): BikeVideo {
    const videoUrl = page.properties.video_url.url || "";
    const isYouTube =
      videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be");

    return {
      id: page.id,
      title: page.properties.name.title[0]?.plain_text || "",
      description: page.properties.description.rich_text[0]?.plain_text || "",
      videoUrl: videoUrl,
      videoType: isYouTube ? "youtube" : "dropbox",
      thumbnail: page.properties.thumbnail?.files[0]?.external?.url || "",
      date: page.properties.date.date?.start || "",
      tags:
        page.properties.tags?.multi_select?.map((tag: any) => tag.name) || [],
      duration: page.properties.duration?.number || 0,
    };
  }
}
