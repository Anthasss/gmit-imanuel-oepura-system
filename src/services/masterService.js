import axios from "@/lib/axios";

const masterService = {
  // =================== PENDIDIKAN ===================

  getPendidikan: async (params = {}) => {
    const res = await axios.get("/pendidikan", { params });

    return res.data;
  },

  getPendidikanById: async (id) => {
    const res = await axios.get(`/pendidikan/${id}`);

    return res.data;
  },

  createPendidikan: async (data) => {
    const res = await axios.post("/pendidikan", data);

    return res.data;
  },

  updatePendidikan: async (id, data) => {
    const res = await axios.patch(`/pendidikan/${id}`, data);

    return res.data;
  },

  deletePendidikan: async (id) => {
    const res = await axios.delete(`/pendidikan/${id}`);

    return res.data;
  },

  // =================== PEKERJAAN ===================

  getPekerjaan: async (params = {}) => {
    const res = await axios.get("/pekerjaan", { params });

    return res.data;
  },

  getPekerjaanById: async (id) => {
    const res = await axios.get(`/pekerjaan/${id}`);

    return res.data;
  },

  createPekerjaan: async (data) => {
    const res = await axios.post("/pekerjaan", data);

    return res.data;
  },

  updatePekerjaan: async (id, data) => {
    const res = await axios.patch(`/pekerjaan/${id}`, data);

    return res.data;
  },

  deletePekerjaan: async (id) => {
    const res = await axios.delete(`/pekerjaan/${id}`);

    return res.data;
  },

  // =================== SUKU ===================

  getSuku: async (params = {}) => {
    const res = await axios.get("/suku", { params });

    return res.data;
  },

  getSukuById: async (id) => {
    const res = await axios.get(`/suku/${id}`);

    return res.data;
  },

  createSuku: async (data) => {
    const res = await axios.post("/suku", data);

    return res.data;
  },

  updateSuku: async (id, data) => {
    const res = await axios.patch(`/suku/${id}`, data);

    return res.data;
  },

  deleteSuku: async (id) => {
    const res = await axios.delete(`/suku/${id}`);

    return res.data;
  },

  // =================== JAMINAN KESEHATAN ===================

  getJaminanKesehatan: async (params = {}) => {
    const res = await axios.get("/jaminan-kesehatan", { params });

    return res.data;
  },

  getJaminanKesehatanById: async (id) => {
    const res = await axios.get(`/jaminan-kesehatan/${id}`);

    return res.data;
  },

  createJaminanKesehatan: async (data) => {
    const res = await axios.post("/jaminan-kesehatan", data);

    return res.data;
  },

  updateJaminanKesehatan: async (id, data) => {
    const res = await axios.patch(`/jaminan-kesehatan/${id}`, data);

    return res.data;
  },

  deleteJaminanKesehatan: async (id) => {
    const res = await axios.delete(`/jaminan-kesehatan/${id}`);

    return res.data;
  },

  // =================== STATUS DALAM KELUARGA ===================

  getStatusDalamKeluarga: async (params = {}) => {
    const res = await axios.get("/status-dalam-keluarga", { params });

    return res.data;
  },

  getStatusDalamKeluargaById: async (id) => {
    const res = await axios.get(`/status-dalam-keluarga/${id}`);

    return res.data;
  },

  createStatusDalamKeluarga: async (data) => {
    const res = await axios.post("/status-dalam-keluarga", data);

    return res.data;
  },

  updateStatusDalamKeluarga: async (id, data) => {
    const res = await axios.patch(`/status-dalam-keluarga/${id}`, data);

    return res.data;
  },

  deleteStatusDalamKeluarga: async (id) => {
    const res = await axios.delete(`/status-dalam-keluarga/${id}`);

    return res.data;
  },

  // =================== STATUS KEPEMILIKAN RUMAH ===================

  getStatusKepemilikanRumah: async (params = {}) => {
    const res = await axios.get("/status-kepemilikan-rumah", { params });

    return res.data;
  },

  getStatusKepemilikanRumahById: async (id) => {
    const res = await axios.get(`/status-kepemilikan-rumah/${id}`);

    return res.data;
  },

  createStatusKepemilikanRumah: async (data) => {
    const res = await axios.post("/status-kepemilikan-rumah", data);

    return res.data;
  },

  updateStatusKepemilikanRumah: async (id, data) => {
    const res = await axios.patch(`/status-kepemilikan-rumah/${id}`, data);

    return res.data;
  },

  deleteStatusKepemilikanRumah: async (id) => {
    const res = await axios.delete(`/status-kepemilikan-rumah/${id}`);

    return res.data;
  },

  // =================== KEADAAN RUMAH ===================

  getKeadaanRumah: async (params = {}) => {
    const res = await axios.get("/keadaan-rumah", { params });

    return res.data;
  },

  getKeadaanRumahById: async (id) => {
    const res = await axios.get(`/keadaan-rumah/${id}`);

    return res.data;
  },

  createKeadaanRumah: async (data) => {
    const res = await axios.post("/keadaan-rumah", data);

    return res.data;
  },

  updateKeadaanRumah: async (id, data) => {
    const res = await axios.patch(`/keadaan-rumah/${id}`, data);

    return res.data;
  },

  deleteKeadaanRumah: async (id) => {
    const res = await axios.delete(`/keadaan-rumah/${id}`);

    return res.data;
  },

  // =================== STATUS KELUARGA ===================

  getStatusKeluarga: async (params = {}) => {
    const res = await axios.get("/status-keluarga", { params });

    return res.data;
  },

  getStatusKeluargaById: async (id) => {
    const res = await axios.get(`/status-keluarga/${id}`);

    return res.data;
  },

  createStatusKeluarga: async (data) => {
    const res = await axios.post("/status-keluarga", data);

    return res.data;
  },

  updateStatusKeluarga: async (id, data) => {
    const res = await axios.patch(`/status-keluarga/${id}`, data);

    return res.data;
  },

  deleteStatusKeluarga: async (id) => {
    const res = await axios.delete(`/status-keluarga/${id}`);

    return res.data;
  },

  // =================== STATUS KEANGGOTAAN ===================

  getStatusKeanggotaan: async (params = {}) => {
    const res = await axios.get("/status-keanggotaan", { params });

    return res.data;
  },

  getStatusKeanggotaanById: async (id) => {
    const res = await axios.get(`/status-keanggotaan/${id}`);

    return res.data;
  },

  createStatusKeanggotaan: async (data) => {
    const res = await axios.post("/status-keanggotaan", data);

    return res.data;
  },

  updateStatusKeanggotaan: async (id, data) => {
    const res = await axios.patch(`/status-keanggotaan/${id}`, data);

    return res.data;
  },

  deleteStatusKeanggotaan: async (id) => {
    const res = await axios.delete(`/status-keanggotaan/${id}`);

    return res.data;
  },

  // =================== PENDAPATAN ===================

  getPendapatan: async (params = {}) => {
    const res = await axios.get("/pendapatan", { params });

    return res.data;
  },

  getPendapatanById: async (id) => {
    const res = await axios.get(`/pendapatan/${id}`);

    return res.data;
  },

  createPendapatan: async (data) => {
    const res = await axios.post("/pendapatan", data);

    return res.data;
  },

  updatePendapatan: async (id, data) => {
    const res = await axios.patch(`/pendapatan/${id}`, data);

    return res.data;
  },

  deletePendapatan: async (id) => {
    const res = await axios.delete(`/pendapatan/${id}`);

    return res.data;
  },

  //GEOGRAFIS//
  // =================== Provinsi =================== //
  getProvinsi: async (params = {}) => {
    const res = await axios.get("/geografi/provinsi", { params });

    return res.data;
  },

  getProvinsiById: async (id) => {
    const res = await axios.get(`/geografi/provinsi/${id}`);

    return res.data;
  },

  createProvinsi: async (data) => {
    const res = await axios.post("/geografi/provinsi", data);

    return res.data;
  },

  updateProvinsi: async (id, data) => {
    const res = await axios.patch(`/geografi/provinsi/${id}`, data);

    return res.data;
  },

  deleteProvinsi: async (id) => {
    const res = await axios.delete(`/geografi/provinsi/${id}`);

    return res.data;
  },

  // =================== Kota Kabupaten =================== //
  getKotaKabupaten: async (params = {}) => {
    const res = await axios.get("/geografi/kota-kabupaten", { params });

    return res.data;
  },

  getKotaKabupatenById: async (id) => {
    const res = await axios.get(`/geografi/kota-kabupaten/${id}`);

    return res.data;
  },

  createKotaKabupaten: async (data) => {
    const res = await axios.post("/geografi/kota-kabupaten", data);

    return res.data;
  },

  updateKotaKabupaten: async (id, data) => {
    const res = await axios.patch(`/geografi/kota-kabupaten/${id}`, data);

    return res.data;
  },

  getKotaKabupatenByProvinsi: async (idProvinsi) => {
    const res = await axios.get(
      `/geografi/kota-kabupaten/by-provinsi?idProvinsi=${idProvinsi}`
    );

    return res.data;
  },

  deleteKotaKabupaten: async (id) => {
    const res = await axios.delete(`/geografi/kota-kabupaten/${id}`);

    return res.data;
  },

  // =================== Kecamatan =================== //
  getKecamatan: async (params = {}) => {
    const res = await axios.get("/geografi/kecamatan", { params });

    return res.data;
  },

  getKecamatanById: async (id) => {
    const res = await axios.get(`/geografi/kecamatan/${id}`);

    return res.data;
  },

  getKecamatanByKotaKab: async (idKotaKab) => {
    const res = await axios.get(
      `/geografi/kecamatan/by-kota-kab?idKotaKab=${idKotaKab}`
    );

    return res.data;
  },

  createKecamatan: async (data) => {
    const res = await axios.post("/geografi/kecamatan", data);

    return res.data;
  },

  updateKecamatan: async (id, data) => {
    const res = await axios.patch(`/geografi/kecamatan/${id}`, data);

    return res.data;
  },

  deleteKecamatan: async (id) => {
    const res = await axios.delete(`/geografi/kecamatan/${id}`);

    return res.data;
  },

  // =================== Kelurahan Desa =================== //
  getKelurahanDesa: async (params = {}) => {
    const res = await axios.get("/geografi/kelurahan-desa", { params });

    return res.data;
  },

  getKelurahanDesaById: async (id) => {
    const res = await axios.get(`/geografi/kelurahan-desa/${id}`);

    return res.data;
  },

  getKelurahanDesaByKecamatan: async (idKecamatan) => {
    const res = await axios.get(
      `/geografi/kelurahan-desa/by-kecamatan?idKecamatan=${idKecamatan}`
    );

    return res.data;
  },

  createKelurahanDesa: async (data) => {
    const res = await axios.post("/geografi/kelurahan-desa", data);

    return res.data;
  },

  updateKelurahanDesa: async (id, data) => {
    const res = await axios.patch(`/geografi/kelurahan-desa/${id}`, data);

    return res.data;
  },

  deleteKelurahanDesa: async (id) => {
    const res = await axios.delete(`/geografi/kelurahan-desa/${id}`);

    return res.data;
  },

  // =================== KELURAHAN (Alias) ===================
  getKelurahan: async (params = {}) => {
    return masterService.getKelurahanDesa(params);
  },

  // =================== KELUARGA (for dropdown) ===================
  getKeluarga: async (params = {}) => {
    const res = await axios.get("/keluarga", { params });

    return res.data;
  },

  // =================== RAYON ===================
  getRayon: async (params = {}) => {
    const res = await axios.get("/rayon", { params });

    return res.data;
  },

  getRayonById: async (id) => {
    const res = await axios.get(`/rayon/${id}`);

    return res.data;
  },

  createRayon: async (data) => {
    const res = await axios.post("/rayon", data);

    return res.data;
  },

  updateRayon: async (id, data) => {
    const res = await axios.patch(`/rayon/${id}`, data);

    return res.data;
  },

  deleteRayon: async (id) => {
    const res = await axios.delete(`/rayon/${id}`);

    return res.data;
  },

  // =================== KATEGORI JADWAL  ===================

  getKategoriJadwal: async (params = {}) => {
    const res = await axios.get("/kategori-jadwal", { params });

    return res.data;
  },

  getKategoriJadwalById: async (id) => {
    const res = await axios.get(`/kategori-jadwal/${id}`);

    return res.data;
  },

  createKategoriJadwal: async (data) => {
    const res = await axios.post("/kategori-jadwal", data);

    return res.data;
  },

  updateKategoriJadwal: async (id, data) => {
    const res = await axios.patch(`/kategori-jadwal/${id}`, data);

    return res.data;
  },

  getKategoriJadwalById: async (id) => {
    const res = await axios.get(`/kategori-jadwal/${id}`);

    return res.data;
  },

  deleteKategoriJadwal: async (id) => {
    const res = await axios.delete(`/kategori-jadwal/${id}`);

    return res.data;
  },

  // =================== JENIS JABATAN  ===================

  getJenisJabatan: async (params = {}) => {
    const res = await axios.get("/jenis-jabatan", { params });

    return res.data;
  },

  getJenisJabatanById: async (id) => {
    const res = await axios.get(`/jenis-jabatan/${id}`);

    return res.data;
  },

  createJenisJabatan: async (data) => {
    const res = await axios.post("/jenis-jabatan", data);

    return res.data;
  },

  updateJenisJabatan: async (id, data) => {
    const res = await axios.patch(`/jenis-jabatan/${id}`, data);

    return res.data;
  },

  deleteJenisJabatan: async (id) => {
    const res = await axios.delete(`/jenis-jabatan/${id}`);

    return res.data;
  },

  // =================== KATEGORI PENGUMUMAN ===================

  getKategoriPengumuman: async (params = {}) => {
    const res = await axios.get("/kategori-pengumuman", { params });

    return res.data;
  },

  getKategoriPengumumanById: async (id) => {
    const res = await axios.get(`/kategori-pengumuman/${id}`);

    return res.data;
  },

  createKategoriPengumuman: async (data) => {
    const res = await axios.post("/kategori-pengumuman", data);

    return res.data;
  },

  updateKategoriPengumuman: async (id, data) => {
    const res = await axios.patch(`/kategori-pengumuman/${id}`, data);

    return res.data;
  },

  deleteKategoriPengumuman: async (id) => {
    const res = await axios.delete(`/kategori-pengumuman/${id}`);

    return res.data;
  },

  // =================== JENIS PENGUMUMAN ===================

  getJenisPengumuman: async (params = {}) => {
    const res = await axios.get("/jenis-pengumuman", { params });

    return res.data;
  },

  getJenisPengumumanById: async (id) => {
    const res = await axios.get(`/jenis-pengumuman/${id}`);

    return res.data;
  },

  getJenisPengumumanOptions: async (params = {}) => {
    const res = await axios.get("/jenis-pengumuman/options", { params });

    return res.data;
  },

  createJenisPengumuman: async (data) => {
    const res = await axios.post("/jenis-pengumuman", data);

    return res.data;
  },

  updateJenisPengumuman: async (id, data) => {
    const res = await axios.patch(`/jenis-pengumuman/${id}`, data);

    return res.data;
  },

  deleteJenisPengumuman: async (id) => {
    const res = await axios.delete(`/jenis-pengumuman/${id}`);

    return res.data;
  },
};

export default masterService;
