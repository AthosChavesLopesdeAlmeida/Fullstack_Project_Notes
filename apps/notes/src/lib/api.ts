const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

type ApiResponse<T> = {
  data: T | null;
  status: number;
  ok: boolean;
};

export async function apiFetch<T = unknown>(
  path: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    const data = res.status !== 204 ? await res.json().catch(() => null) : null;

    return {
      data: data as T,
      status: res.status,
      ok: res.ok,
    };
  } catch {
    return {
      data: null,
      status: 0,
      ok: false,
    };
  }
}