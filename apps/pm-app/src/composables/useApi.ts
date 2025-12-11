import { ref } from "vue";
import { useRouter } from "vue-router";

export function useApi() {
  const router = useRouter();
  const error = ref<string | null>(null);
  const loading = ref(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const request = async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T | null> => {
    loading.value = true;
    error.value = null;

    const token = localStorage.getItem("accessToken");

    // 1. Determine Headers
    const headers: Record<string, string> = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      // Only merge custom headers if provided
      ...(options.headers as Record<string, string>),
    };

    // 2. Handle Content-Type for JSON vs FormData
    // If body is NOT FormData, default to application/json
    if (!(options.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }
    // If it IS FormData, DO NOT set Content-Type (browser sets it with boundary)

    try {
      const res = await fetch(`${apiUrl}${endpoint}`, {
        ...options,
        headers,
      });

      if (res.status === 401) {
        localStorage.removeItem("accessToken");
        router.push("/auth/login");
        return null;
      }

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "API Error");
      }

      return await res.json();
    } catch (err: any) {
      error.value = err.message;
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    request,
    error,
    loading,
  };
}
