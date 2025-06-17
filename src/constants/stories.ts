export interface Story {
  id: number;
  imageUrl?: string;
  videoUrl?: string;
  username: string;
  avatarUrl: string;
  type: "image" | "video";
}

export const stories: Story[] = [
  {
    id: 1,
    imageUrl: "https://picsum.photos/400/800?random=1",
    username: "sarah_j",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    type: "image",
  },
  {
    id: 2,
    videoUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    username: "mike_travels",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
    type: "video",
  },
  {
    id: 3,
    imageUrl: "https://picsum.photos/400/800?random=3",
    username: "foodie_lisa",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    type: "image",
  },
  {
    id: 4,
    videoUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    username: "tech_dave",
    avatarUrl: "https://i.pravatar.cc/150?img=4",
    type: "video",
  },
  {
    id: 5,
    imageUrl: "https://picsum.photos/400/800?random=5",
    username: "art_emma",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    type: "image",
  },
  {
    id: 6,
    videoUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    username: "fitness_john",
    avatarUrl: "https://i.pravatar.cc/150?img=6",
    type: "video",
  },
  {
    id: 7,
    imageUrl: "https://picsum.photos/400/800?random=7",
    username: "music_anna",
    avatarUrl: "https://i.pravatar.cc/150?img=7",
    type: "image",
  },
  {
    id: 8,
    videoUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    username: "travel_mark",
    avatarUrl: "https://i.pravatar.cc/150?img=8",
    type: "video",
  },
];
