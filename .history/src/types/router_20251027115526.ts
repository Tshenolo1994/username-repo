export type ReposRouteParams = { username: string }
export type CommitsRouteParams = { username: string; repo: string }
export type CommitRouteParams = { username: string; repo: string; sha: string }

export function getParam<T extends Record<string, string>>(params: any, key: keyof T): string {
  const v = (params?.[key as string] ?? "") as string
  return String(v)
}
