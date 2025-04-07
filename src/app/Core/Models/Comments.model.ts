

export interface Comments{
  id: string,
  comments: {
    user: string,
    title: string,
    body: string
  }[]
}
