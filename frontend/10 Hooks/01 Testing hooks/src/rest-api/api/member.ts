import { Member } from '../model/member';

const fetchMemberListUrl = 'https://api.github.com/orgs/lemoncode/members';
const fetchMemberUrl = 'https://api.github.com/users/';

export const fetchMembers = (): Promise<Member[]> =>
  fetch(fetchMemberListUrl).then(extractPayload);

export const fetchMember = (name: string): Promise<Member> =>
  fetch(`${fetchMemberUrl}${name}`).then(extractPayload);

const extractPayload = (response: Response): Promise<any> =>
  response.ok ? response.json() : responseError(response);

const responseError = (response: Response): Promise<any> =>
  response.json().then(error => Promise.reject(error.message));
