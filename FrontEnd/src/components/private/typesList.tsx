import { EnlaceData } from "./RepositoryList";

export interface RepositoryListProps {
  repository: RepositoriesResponse;
  setRepository: React.Dispatch<React.SetStateAction<RepositoriesResponse>>;
  setSelectedLinkName: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedRepoName: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedRepoDesc: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedTags: React.Dispatch<React.SetStateAction<string[] | null>>;
  openIndex: number | null;
  setOpenIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedRepoId: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedEnlace: React.Dispatch<React.SetStateAction<EnlaceData | null>>;
}

export type RepositoriesResponse = {
  repositories: {
    [category: string]: CategoryRepository;
  };
};

export type CategoryRepository = {
  repository: RepositoryMetadata;
  enlaces: RepositoryItem[];
};

export type RepositoryMetadata = {
  id: number;
  user_id: number;
  name: string;
  description: string;
  visibility: "public" | "private";
  shared: boolean;
  tags: string[];
  created_at: string;
  updated_at: string;
};

export type RepositoryItem = {
  id: number;
  repository_id: number;
  url: string;
  name: string;
  visibility: "public" | "private";
  shared: boolean;
  public_link: string;
  private_link: string;
  created_at: string;
  updated_at: string;
};