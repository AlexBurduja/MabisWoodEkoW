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

// Function to get an instance of IgApiClient for a specific username
async function getIgClient(username, password) {
  const ig = new IgApiClient();
  const sessionFilePath = `${sessionDir}/${username}.json`;
  
  if (fs.existsSync(sessionFilePath)) {
    // Load session state from the file
    const session = JSON.parse(await readFileAsync(sessionFilePath, 'utf8'));
    await ig.state.deserialize(session);
    console.log(`Session loaded successfully for ${username}`);
  } else {
    // Generate device for the specified username
    ig.state.generateDevice(username);

    // Perform login
    await ig.account.login(username, password);
    console.log(`Logged in successfully for ${username}`);

    // Save session state to file
    await saveSession(ig, username);
  }

  // Subscribe to request end event to save the session state
  ig.request.end$.subscribe({
    next: async () => {
      await saveSession(ig, username);
    },
  });

  return ig;
}

// Function to save session state
async function saveSession(ig, username) {
  const serialized = await ig.state.serialize();
  delete serialized.constants; // Remove unnecessary data
  await writeFileAsync(`${sessionDir}/${username}.json`, JSON.stringify(serialized));
  console.log(`Session saved successfully for ${username}`);
}

export default async function handler(req, res) {
  const { username, password } = req.body;

  try {
    const ig = await getIgClient(username, password);

    ig.linkedAccount.getLinkageStatus();

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

    const date = new Date();
    const unixTimeToday = Math.floor(date.getTime() / 1000);

    ///Filtering the posts that are from today to 30 days ago
    const finalData = mediaData.filter((item) => {
      return item.dateTaken < unixTimeToday && item.dateTaken > unixTimeToday - 2592000;
    });

    finalData.


    res.status(200).json({ message: "Media and like counts retrieved successfully", finalData });
  } catch (error) {
    // Handle errors
    console.error("An error occurred:", error);
    res.status(500).json({ error: "An error occurred"});
  }
}
