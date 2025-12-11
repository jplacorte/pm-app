import { ref } from "vue";
import { useRouter } from "vue-router";

export function useApi() {
  const router = useRouter();
  const error = ref<string | null>(null);
  const loading = ref(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Generic request handler
  const request = async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T | null> => {
    loading.value = true;
    error.value = null;

    // Get token from local storage
    const token = localStorage.getItem("accessToken");

    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    try {
      const res = await fetch(`${apiUrl}${endpoint}`, { ...options, headers });

      // Handle Unauthorized (401) - Clear token and redirect to login
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
