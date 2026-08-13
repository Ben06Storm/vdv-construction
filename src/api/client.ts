const API_URL =
  import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error('VITE_API_URL is not defined');
}

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
};

export const apiClient = async <T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> => {
  try {
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
        `Request failed with status ${response.status}`,
      );
    }

    return response.json();
  } catch (error) {
    console.error(
      `API request failed: ${endpoint}`,
      error,
    );

    throw new Error(
      'Something went wrong. Please try again.',
      {
        cause: error,
      },
    );
  }
};