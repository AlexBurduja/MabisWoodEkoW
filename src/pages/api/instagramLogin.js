import { IgApiClient } from 'instagram-private-api';

export default async function handler(req, res) {
  const { username, password, mediaId } = req.body;

  // Create a new instance of IgApiClient
  const ig = new IgApiClient();

  // Generate a device for the specified username
  ig.state.generateDevice(username);

  try {
    // Login to Instagram
    await ig.account.login(username, password);
    console.log("Logged in successfully");

    const userFeed = ig.feed.user(ig.state.cookieUserId)
    let mediaData = [];
    let hasNextPage = true;
    let maxId = null;

    // Fetch all pages of user's media
    while (hasNextPage) {
        const userMedia = await userFeed.items({ maxId });
        if (userMedia.length === 0) {
            // No more media available, break the loop
            break;
        }
        
        // Process each page of media
        mediaData = mediaData.concat(userMedia.map(media => ({
            mediaId: media.id,
            totalLikes: media.like_count,
            totalComments: media.comment_count,
            dateTaken: media.taken_at
        })));

        // Check if there's another page
        hasNextPage = userFeed.isMoreAvailable();
        if (hasNextPage) {
            // Update maxId for the next page
            maxId = userMedia[userMedia.length - 1].id;
        }
    }

    res.status(200).json({ message: "Media and like counts retrieved successfully", mediaData });
  } catch (error) {
    // Handle login failure
    console.error("Failed to log in:", error);
    res.status(500).json({ error: "Failed to log in" });
  }
}
