import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";
import DatePicker from "@/components/ui/inputs/DatePicker";
import jemaatService from "@/services/jemaatService";
import klasisService from "@/services/klasisService";
import pernikahanService from "@/services/pernikahanService";
import { showToast } from "@/utils/showToast";
import { ArrowLeft, Calendar, Heart, UserCheck } from "lucide-react";

// Validation schema
const pernikahanSchema = z.object({
  tanggal: z.string().min(1, "Tanggal pernikahan wajib diisi"),
  idKlasis: z.string().min(1, "Klasis wajib dipilih"),
  jemaatIds: z
    .array(z.string())
    .min(1, "Minimal pilih 1 jemaat")
    .max(10, "Maksimal 10 jemaat"),
});

export default function CreatePernikahanPage() {
  const router = useRouter();
  const [selectedJemaats, setSelectedJemaats] = useState([]);

  const form = useForm({
    resolver: zodResolver(pernikahanSchema),
    defaultValues: {
      tanggal: "",
      idKlasis: "",
      jemaatIds: [],
    },
  });

  // Fetch master data
  const { data: klasisData } = useQuery({
    queryKey: ["klasis"],
    queryFn: () => klasisService.getAll(),
  });

  // Fetch jemaat data (yang belum menikah)
  const { data: jemaatData } = useQuery({
    queryKey: ["jemaat-single"],
    queryFn: () => jemaatService.getAll({ limit: 1000 }), // Get all for selection
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: pernikahanService.create,
    onSuccess: () => {
      showToast({
        title: "Berhasil",
        description: "Data pernikahan berhasil dibuat!",
        color: "success",
      });
      router.push("/employee/lainnya/pernikahan");
    },
    onError: (error) => {
      showToast({
        title: "Gagal",
        description:
          error.response?.data?.message || "Gagal membuat data pernikahan",
        color: "error",
      });
    },
  });

  const handleSubmit = (data) => {
    createMutation.mutate({
      tanggal: data.tanggal,
      idKlasis: data.idKlasis,
      jemaatIds: selectedJemaats.map((j) => j.id),
    });
  };

  // Handle jemaat selection
  const handleJemaatSelect = (jemaat) => {
    const isSelected = selectedJemaats.find((j) => j.id === jemaat.id);
    if (isSelected) {
      setSelectedJemaats(selectedJemaats.filter((j) => j.id !== jemaat.id));
    } else {
      setSelectedJemaats([...selectedJemaats, jemaat]);
    }

    // Update form value
    const newIds = isSelected
      ? selectedJemaats.filter((j) => j.id !== jemaat.id).map((j) => j.id)
      : [...selectedJemaats.map((j) => j.id), jemaat.id];
    form.setValue("jemaatIds", newIds);
  };

  // Filter jemaat yang belum menikah
  const availableJemaats =
    jemaatData?.data?.items?.filter((j) => !j.idPernikahan) || [];

  return (
    <>
      <PageHeader
        title="Buat Data Pernikahan"
        description="Tambah data pernikahan jemaat"
        icon={Heart}
        breadcrumb={[
          { label: "Dashboard", href: "/employee/dashboard" },
          { label: "Lainnya", href: "/employee/lainnya" },
          { label: "Data Pernikahan", href: "/employee/lainnya/pernikahan" },
          { label: "Tambah Data" },
        ]}
        actions={[
          {
            label: "Kembali",
            icon: ArrowLeft,
            variant: "outline",
            onClick: () => router.back(),
          },
        ]}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-medium">Informasi Pernikahan</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <DatePicker
                    label="Tanggal Pernikahan"
                    required={true}
                    value={form.watch("tanggal")}
                    onChange={(value) => form.setValue("tanggal", value)}
                    placeholder="Pilih tanggal pernikahan"
                    error={form.formState.errors.tanggal?.message}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Klasis *
                  </label>
                  <select
                    {...form.register("idKlasis", { required: true })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Pilih klasis</option>
                    {klasisData?.data?.items?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nama}
                      </option>
                    ))}
                  </select>
                  {form.formState.errors.idKlasis && (
                    <p className="mt-1 text-sm text-red-600">
                      {form.formState.errors.idKlasis.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Selected Jemaats */}
          {selectedJemaats.length > 0 && (
            <Card>
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Heart className="w-5 h-5 text-red-600" />
                  <h3 className="text-lg font-medium">
                    Jemaat Terpilih ({selectedJemaats.length})
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedJemaats.map((jemaat, index) => (
                    <div
                      key={jemaat.id}
                      className="flex items-center justify-between p-4 bg-rose-50 border border-rose-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                            jemaat.jenisKelamin ? "bg-blue-500" : "bg-pink-500"
                          }`}
                        >
                          {jemaat.jenisKelamin ? "♂" : "♀"}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {jemaat.nama}
                          </p>
                          <p className="text-sm text-gray-600">
                            Bag. {jemaat.keluarga?.noBagungan || "-"} •{" "}
                            {jemaat.keluarga?.rayon?.namaRayon || "-"}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleJemaatSelect(jemaat)}
                        className="text-red-600 hover:text-red-800"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* Jemaat Selection */}
          <Card>
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <UserCheck className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-medium">Pilih Jemaat</h3>
                <span className="text-sm text-gray-500">
                  ({availableJemaats.length} jemaat tersedia)
                </span>
              </div>

              {form.formState.errors.jemaatIds && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">
                    {form.formState.errors.jemaatIds.message}
                  </p>
                </div>
              )}

              <div className="max-h-96 overflow-y-auto space-y-2">
                {availableJemaats.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <UserCheck className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Tidak ada jemaat yang tersedia</p>
                    <p className="text-sm">Semua jemaat sudah menikah</p>
                  </div>
                ) : (
                  availableJemaats.map((jemaat) => {
                    const isSelected = selectedJemaats.find(
                      (j) => j.id === jemaat.id
                    );
                    return (
                      <div
                        key={jemaat.id}
                        onClick={() => handleJemaatSelect(jemaat)}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-blue-50 border-blue-300"
                            : "bg-white border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                              jemaat.jenisKelamin
                                ? "bg-blue-500"
                                : "bg-pink-500"
                            }`}
                          >
                            {jemaat.jenisKelamin ? "♂" : "♀"}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">
                              {jemaat.nama}
                            </p>
                            <p className="text-sm text-gray-600">
                              {jemaat.jenisKelamin ? "Laki-laki" : "Perempuan"}{" "}
                              • Bag. {jemaat.keluarga?.noBagungan || "-"} •
                              {jemaat.keluarga?.rayon?.namaRayon || "-"}
                            </p>
                          </div>
                          {isSelected && <div className="text-blue-600">✓</div>}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </Card>

          {/* Submit Actions */}
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={createMutation.isLoading}
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={
                createMutation.isLoading || selectedJemaats.length === 0
              }
            >
              {createMutation.isLoading
                ? "Menyimpan..."
                : "Simpan Data Pernikahan"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
