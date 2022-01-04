interface Image {
  name: string;
  width: number;
  height: number;
  size: number;
  url: string;
}
export type EventData = {
  id: string;
  attributes: {
    name: string;
    slug: string;
    venue: string;
    address: string;
    performers: string;
    date: string;
    time: string;
    description: string;
    image: {
      data: {
        attributes: {
          formats: {
            thumbnail: Image;
            large: Image;
            medium: Image;
            small: Image;
          };
        };
      };
    };
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
  };
};
