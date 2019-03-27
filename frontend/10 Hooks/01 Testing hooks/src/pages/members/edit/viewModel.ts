export interface Member {
  id: number;
  name: string;
  avatarUrl: string;
}

export const createEmptyMember = (): Member => ({
  id: -1,
  name: '',
  avatarUrl: '',
});
