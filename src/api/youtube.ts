import axios from "axios";
const { REACT_APP_YOUTUBE_API_KEY: YOUTUBE_API_KEY } = process.env;
const basePATH = "https://www.googleapis.com/youtube/v3";

const youtubeConfig = {
  baseURL: basePATH,
  params: {
    key: YOUTUBE_API_KEY,
  },
};

export const getMovieThumbnail = async () => {
  return await axios
    .get(`/videos?part=snippet&id=041KTRpr0XU&key=${YOUTUBE_API_KEY}`, {
      ...youtubeConfig,
      //   params: { ...youtubeConfig.params, id: "041KTRpr0XU" },
    })
    .then((res) => res.data.items[0].snippet.thumbnails);
};

function parseISO8601Duration(duration: string) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = (match && parseInt(match[1])) || 0;
  const minutes = (match && parseInt(match[2])) || 0;
  const seconds = (match && parseInt(match[3])) || 0;
  return hours * 3600 + minutes * 60 + seconds;
}

export const getDuration = async (videoId: string) => {
  return await axios
    .get(`/videos?part=contentDetails`, {
      ...youtubeConfig,
      params: { ...youtubeConfig.params, id: videoId },
    })
    .then((res) => {
      return parseISO8601Duration(res.data.items[0].contentDetails.duration);
    });
};
