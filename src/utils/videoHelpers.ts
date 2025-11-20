export const isYouTubeUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    return (
      parsed.hostname.includes("youtube.com") ||
      parsed.hostname.includes("youtu.be")
    );
  } catch {
    return false;
  }
};

export const getYouTubeId = (url: string) => {
  try {
    const parsed = new URL(url);

    // https://www.youtube.com/watch?v=VIDEO_ID
    if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v");
    }

    // https://youtu.be/VIDEO_ID
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "");
    }

    return null;
  } catch {
    return null;
  }
};