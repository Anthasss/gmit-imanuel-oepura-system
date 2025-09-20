import axios from "@/lib/axios";

// Helper function for API error handling
const handleApiCall = async (apiCall) => {
  try {
    const response = await apiCall();
    return {
      success: true,
      data: response.data,
      message: response.data?.message || "Operasi berhasil"
    };
  } catch (error) {
    console.error("API Error:", error);

    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 409:
          return {
            success: false,
            message: data?.message || "Data sudah ada. Silakan gunakan data yang berbeda.",
            errors: data?.errors || {}
          };
        case 400:
          return {
            success: false,
            message: data?.message || "Data tidak valid. Silakan periksa kembali.",
            errors: data?.errors || {}
          };
        case 404:
          return {
            success: false,
            message: data?.message || "Data tidak ditemukan.",
            errors: data?.errors || {}
          };
        case 422:
          return {
            success: false,
            message: data?.message || "Validasi gagal. Silakan periksa data yang dimasukkan.",
            errors: data?.errors || {}
          };
        case 500:
          return {
            success: false,
            message: "Terjadi kesalahan pada server. Silakan coba lagi nanti.",
            errors: {}
          };
        default:
          return {
            success: false,
            message: data?.message || `Terjadi kesalahan (${status}). Silakan coba lagi.`,
            errors: data?.errors || {}
          };
      }
    } else if (error.request) {
      // Network error
      return {
        success: false,
        message: "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
        errors: {}
      };
    } else {
      // Other errors
      return {
        success: false,
        message: "Terjadi kesalahan tak terduga. Silakan coba lagi.",
        errors: {}
      };
    }
  }
};

const jenisIbadahService = {
  // Get all jenis ibadah with pagination and search
  getAll: async (params = {}) => {
    const response = await axios.get("/jenis-ibadah", { params });

    return response.data;
  },

  // Get jenis ibadah by ID
  getById: async (id) => {
    const response = await axios.get(`/jenis-ibadah/${id}`);

    return response.data;
  },

  // Create new jenis ibadah
  create: async (data) => {
    return handleApiCall(() => axios.post("/jenis-ibadah", data));
  },

  // Update jenis ibadah
  update: async (id, data) => {
    return handleApiCall(() => axios.patch(`/jenis-ibadah/${id}`, data));
  },

  // Delete jenis ibadah
  delete: async (id) => {
    return handleApiCall(() => axios.delete(`/jenis-ibadah/${id}`));
  },
};

export default jenisIbadahService;
