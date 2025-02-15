import { Link, Typography } from "@mui/material";
import Box from "@mui/material/Box";

export const FILE_URL =
  "https://raw.githubusercontent.com/a7i7/smriti/refs/heads/main/dataset/clean/";

export const decodeHtmlEntities = (str: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, "text/html");
  return doc.documentElement.textContent;
};

export const SEARCH_ATTRIBUTES_EXTRACTOR = [
  {
    id: "boardGames",
    extractor: (data) => {
      return [data.name, data.artist];
    },
  },
  {
    id: "birds",
    extractor: (data) => {
      return [data];
    },
  },
  {
    id: "paintings",
    extractor: (data) => {
      return [data.name, data.artist.name];
    },
  },
  {
    id: "movies",
    extractor: (data) => {
      return [data];
    },
  },
  {
    id: "cities",
    extractor: (data) => {
      return [data.name, data.country];
    },
  },
  {
    id: "songs",
    extractor: (data) => {
      return [data.Song, data.Artist];
    },
  },
  {
    id: "people",
    extractor: (data) => {
      return [data.name];
    },
  },
  {
    id: "books",
    extractor: (data) => {
      return [data.Title, data.Authors, data.Publisher];
    },
  },
  {
    id: "recipes",
    extractor: (data) => {
      return [data.title];
    },
  },
];

export const CLASSES = [
  {
    id: "boardGames",
    title: "Board Games",
    files: ["boardGames.json"],
    key: "name",
    length: 10334,
    emoji: "🎲",
    render: (data) => {
      console.log(data);
      return (
        <Box display={"flex"} flexDirection={"column"} gap="16px">
          <Typography variant="h4">{data.name}</Typography>
          <Typography variant="h6">Description</Typography>
          <Typography
            sx={{
              whiteSpace: "pre-wrap",
            }}
            variant="body1"
          >
            {decodeHtmlEntities(data.description)}
          </Typography>
          <Typography variant="h6">Arist</Typography>
          <Typography variant="body1">{data.artist}</Typography>
        </Box>
      );
    },
  },
  {
    id: "birds",
    title: "Birds",
    files: ["birds.json"],
    key: null,
    length: 11503,
    emoji: "🐦",
    render: (data) => {
      return <Typography variant="h4">{data}</Typography>;
    },
  },
  {
    id: "paintings",
    title: "Paintings",
    files: ["paintings.json"],
    key: "name",
    length: 13140,
    emoji: "🎨",
    render: (data) => {
      return (
        <Box display={"flex"} flexDirection={"column"} gap="16px">
          <Typography variant="h4">{data.name}</Typography>
          <Typography variant="h6">Style</Typography>
          <Typography variant="body1">{data.style}</Typography>
          <Typography variant="h6">Arist</Typography>
          <Typography variant="body1">
            {data.artist.name} ({data.artist.birth} - {data.artist.death}) (
            {data.artist.style})
          </Typography>
        </Box>
      );
    },
  },
  {
    id: "movies",
    title: "Movies",
    files: ["movies.json"],
    key: null,
    length: 42840,
    emoji: "🎥",
    render: (data) => {
      return <Typography variant="h4">{data}</Typography>;
    },
  },
  {
    id: "cities",
    title: "Cities",
    files: ["cities.json"],
    key: "name",
    length: 44372,
    emoji: "🌆",
    render: (data) => {
      return (
        <Box display={"flex"} flexDirection={"column"} gap="16px">
          <Typography variant="h4">{data.name}</Typography>
          <Typography variant="h6">Country</Typography>
          <Typography variant="body1">{data.country}</Typography>
          <Typography variant="h6">Location</Typography>
          <Link
            href={`https://maps.google.com/?q=${data.lat},${data.lng}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Google map location
          </Link>
          <Typography variant="body1">{JSON.stringify(data)}</Typography>
        </Box>
      );
    },
  },
  {
    id: "songs",
    title: "Songs",
    files: ["songs.json"],
    key: "Song",
    length: 57623,
    emoji: "🎵",
    render: (data) => {
      return (
        <Box display={"flex"} flexDirection={"column"} gap="16px">
          <Typography variant="h4">{data.Song}</Typography>
          <Typography variant="h6">Artist</Typography>
          <Typography variant="body1">{data.Artist}</Typography>
        </Box>
      );
    },
  },
  {
    id: "people",
    title: "People",
    files: ["people.json"],
    key: "name",
    length: 88146,
    emoji: "👤",
    render: (data) => {
      return (
        <Box display={"flex"} flexDirection={"column"} gap="16px">
          <Typography variant="h4">{data.name}</Typography>
          <Typography variant="h6">Occupation</Typography>
          <Typography variant="body1">{data.occupation}</Typography>
          <Typography variant="h6">Birth year</Typography>
          <Typography variant="body1">{data.birthYear}</Typography>
          <Typography variant="h6">Birth place</Typography>
          <Typography variant="body1">{data.birthPlaceName}</Typography>
          <Typography variant="h6">Birth country</Typography>
          <Typography variant="body1">{data.birthPlaceCountry}</Typography>
          {data.deathYear && <Typography variant="h6">Death year</Typography>}
          {data.deathYear && (
            <Typography variant="body1">{data.deathYear}</Typography>
          )}
          {data.deathPlaceName && (
            <Typography variant="h6">Death place</Typography>
          )}
          {data.deathPlaceName && (
            <Typography variant="body1">{data.deathPlaceName}</Typography>
          )}
          {data.deathPlaceCountry && (
            <Typography variant="h6">Death country</Typography>
          )}
          {data.deathPlaceCountry && (
            <Typography variant="body1">{data.deathPlaceCountry}</Typography>
          )}
        </Box>
      );
    },
  },
  {
    id: "books",
    title: "Books",
    files: ["books.json"],
    key: "Title",
    length: 96608,
    emoji: "📚",
    render: (data) => {
      return (
        <Box display={"flex"} flexDirection={"column"} gap="16px">
          <Typography variant="h4">{data.Title}</Typography>
          <Typography variant="h6">Authors</Typography>
          <Typography variant="body1">{data.Authors}</Typography>
          <Typography variant="h6">Description</Typography>
          <Typography variant="body1">{data.Description}</Typography>
          {data.Category && <Typography variant="h6">Category</Typography>}
          {data.Category && (
            <Typography variant="body1">{data.Category}</Typography>
          )}
          <Typography variant="h6">Publisher</Typography>
          <Typography variant="body1">{data.Publisher}</Typography>
          <Typography variant="h6">Publish Date</Typography>
          <Typography variant="body1">
            {data["Publish Date"].Month} {data["Publish Date"].Year}
          </Typography>
        </Box>
      );
    },
  },
  {
    id: "recipes",
    title: "Recipes",
    files: ["recipes.json"],
    key: "title",
    length: 38879,
    emoji: "🍲",
    render: (data) => {
      return (
        <Box display={"flex"} flexDirection={"column"} gap="16px">
          <Typography variant="h4">{data.title}</Typography>
          <Typography variant="h6">Ingredients</Typography>
          <Box display={"flex"} flexDirection={"column"} gap="8px">
            {data.ingredients.map((ingredient: string, index: number) => (
              <Typography key={index} variant="body1">
                {ingredient}
              </Typography>
            ))}
          </Box>
          <Typography variant="h6">Instructions</Typography>

          <Typography variant="body1">{data.instructions}</Typography>
        </Box>
      );
    },
  },
];
