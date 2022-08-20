export interface PostbackRepositoryInterface {
  addPostback: (uuid: string, lineId: string) => Promise<void>
  existPostback: (uuid: string) => Promise<boolean>
}
