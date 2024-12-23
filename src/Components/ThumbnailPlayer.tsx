import { IMovie } from "../api/movie";

interface IThumbnailPlayerProps {
  item: IMovie;
}

const ThumbnailPlayer = ({ item }: IThumbnailPlayerProps) => {
  return <h1>{item.id}</h1>;
};

export default ThumbnailPlayer;
