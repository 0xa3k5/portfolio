export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  videoType: "youtube";
  thumbnail: string;
  date: string; // Use consistent field name
  duration: string;
  viewCount: string;
  channelTitle: string;
}

export class YouTubeAPIService {
  private apiKey: string;
  private baseUrl = "https://www.googleapis.com/youtube/v3";

  constructor() {
    this.apiKey = process.env.YOUTUBE_API_KEY || "";
  }

  // Extract video ID from YouTube URL
  private extractVideoId(url: string): string | null {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }

  // Convert ISO 8601 duration to seconds
  private parseDuration(duration: string): string {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return "0:00";

    const hours = (match[1] || "").replace("H", "");
    const minutes = (match[2] || "").replace("M", "");
    const seconds = (match[3] || "").replace("S", "");

    const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
    const totalSeconds = parseInt(seconds);

    if (totalMinutes > 0) {
      return `${totalMinutes}:${totalSeconds.toString().padStart(2, "0")}`;
    }
    return `${totalSeconds}`;
  }

  // Fetch video details from YouTube API
  async getVideoDetails(videoUrl: string): Promise<YouTubeVideo | null> {
    const videoId = this.extractVideoId(videoUrl);
    if (!videoId || !this.apiKey) {
      return null;
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${this.apiKey}`
      );

      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.items || data.items.length === 0) {
        return null;
      }

      const video = data.items[0];
      const snippet = video.snippet;
      const statistics = video.statistics;
      const contentDetails = video.contentDetails;

      return {
        id: videoId,
        title: snippet.title,
        description: snippet.description,
        videoUrl: videoUrl,
        videoType: "youtube",
        thumbnail:
          snippet.thumbnails.high?.url || snippet.thumbnails.medium?.url || "",
        date: snippet.publishedAt,
        duration: this.parseDuration(contentDetails.duration),
        viewCount: statistics.viewCount || "0",
        channelTitle: snippet.channelTitle,
      };
    } catch (error) {
      console.error("Error fetching YouTube video details:", error);
      return null;
    }
  }

  // Fetch multiple video details
  async getMultipleVideoDetails(videoUrls: string[]): Promise<YouTubeVideo[]> {
    const videoPromises = videoUrls.map((url) => this.getVideoDetails(url));
    const results = await Promise.all(videoPromises);
    return results.filter((video): video is YouTubeVideo => video !== null);
  }
}
