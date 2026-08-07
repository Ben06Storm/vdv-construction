const API_URL =
  import.meta.env.VITE_API_URL;

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
};

export const apiClient = async <T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> => {
  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      method: options.method ?? 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: options.body
        ? JSON.stringify(options.body)
        : undefined,
    },
  );

  if (!response.ok) {
    throw new Error(
      'Something went wrong. Please try again.',
    );
  }

  return response.json();
};