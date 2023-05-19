export type BookType = {
    title: string,
    slug: string,
    author: string,
    description: string,
    picture: {
      secure_url: string,
      public_id: string
    },
    pages: number,
    year:number,
    key: string,
  }