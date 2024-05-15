import { IgApiClient } from 'instagram-private-api';
import fs from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

// Ensure session directory exists
const sessionDir = './sessions';
if (!fs.existsSync(sessionDir)) {
  fs.mkdirSync(sessionDir);
}

export default async function handler(req, res) {
  const { username, password } = req.body;

  const ig = new IgApiClient();
  const sessionFilePath = `${sessionDir}/${username}.json`;

  async function saveSession() {
    const serialized = await ig.state.serialize();
    delete serialized.constants; // Remove unnecessary data
    await writeFileAsync(sessionFilePath, JSON.stringify(serialized));
    console.log("Session saved successfully");
  }

  try {
    if (fs.existsSync(sessionFilePath)) {
      // Load session state from the file
      const session = JSON.parse(await readFileAsync(sessionFilePath, 'utf8'));
      await ig.state.deserialize(session);
      console.log("Session loaded successfully");
    } else {
      // Generate device for the specified username
      ig.state.generateDevice(username);

      // Perform login
      await ig.account.login(username, password);
      console.log("Logged in successfully");

      // Save session state to file
      await saveSession();
    }

    // Subscribe to request end event to save the session state
    const subscription = ig.request.end$.subscribe({
      next: async () => {
        await saveSession();
        // Unsubscribe after saving to prevent multiple saves in a single request
        subscription.unsubscribe();
      },
    });

    const userFeed = ig.feed.user(ig.state.cookieUserId);
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
    // Handle errors
    console.error("An error occurred:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}
