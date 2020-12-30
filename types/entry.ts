export interface Category extends SingleItem {
  fields: {
    name: string;
    slug: string;
    sort: number;
  };
}

export interface Author extends SingleItem {
  fields: {
    name: string;
    icon: string;
    at: string;
  };
}

export interface Post extends SingleItem {
  fields: {
    title: string;
    description: string;
    body: string;
    author: Author;
    category: Category;
    slug: string;
    tags: string[];
    postImage: Image;
    public: boolean;
    releaseDate: string;
    latex: boolean;
  };
}

export interface Image extends SingleItem {
  fields: {
    title: string;
    file: File;
  };
}

export interface File {
  url: string;
  detail: any;
  filename: string;
  contentType: string;
}

export interface FileDetail {
  size: number;
  image?: {
    width: number;
    height: number;
  };
}

export interface SingleItem {
  sys: Sys;
  fields: any;
}

export interface MultipleItem<T extends SingleItem> {
  sys: {
    type: string;
  };
  total: number;
  skip: number;
  limit: number;
  items: T[];
}

export interface Sys {
  space: ChildSys;
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  environment: ChildSys;
  revision: number;
  contentType: ChildSys;
  locale: string;
}

interface ChildSys {
  sys: {
    id: string;
    type: string;
    linkType: string;
  };
}
