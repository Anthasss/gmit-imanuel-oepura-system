import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Eye, Trash, Plus, Crown, Users, Pen } from "lucide-react";

import masterService from "@/services/masterService";
import { jenisJabatanSchema } from "@/validations/masterSchema";
import useModalForm from "@/hooks/useModalForm";
import CreateOrEditModal from "@/components/common/CreateOrEditModal";
import ListGrid from "@/components/ui/ListGrid";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import useConfirm from "@/hooks/useConfirm";

const jenisJabatanFields = [
  {
    type: "text",
    name: "namaJabatan",
    label: "Nama Jenis Jabatan",
    placeholder: "Masukkan nama jenis jabatan",
    required: true,
  },
];

export default function JenisJabatanPage() {
  const modal = useModalForm();
  const confirm = useConfirm();
  const [viewData, setViewData] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["jenis-jabatan"],
    queryFn: () => masterService.getJenisJabatan(),
  });

  const columns = [
    {
      key: "id",
      label: "ID",
      type: "text",
      render: (value) => (
        <span className="font-mono text-sm text-gray-600">{value}</span>
      ),
    },
    {
      key: "namaJabatan",
      label: "Nama Jenis Jabatan",
      type: "text",
      render: (value) => (
        <span className="flex items-center text-sm font-medium">
          <Crown className="w-4 h-4 mr-2 text-purple-500" />
          {value}
        </span>
      ),
    },
  ];

  const handleJenisJabatanSuccess = () => {
    refetch();
    modal.close();
  };

  const handleJenisJabatanSubmit = async (formData, isEdit) => {
    if (isEdit) {
      return await masterService.updateJenisJabatan(
        modal.editData.id,
        formData
      );
    }
    return await masterService.createJenisJabatan(formData);
  };

  const handleDelete = (item) => {
    confirm.showConfirm({
      title: "Hapus Jenis Jabatan",
      message: `Apakah Anda yakin ingin menghapus jenis jabatan "${item.namaJabatan}"? Data yang sudah dihapus tidak dapat dikembalikan.`,
      confirmText: "Ya, Hapus",
      cancelText: "Batal",
      variant: "danger",
      onConfirm: async () => {
        try {
          await masterService.deleteJenisJabatan(item.id);
          refetch();
        } catch (error) {
          console.error("Error deleting jenis jabatan:", error);
        }
      },
    });
  };

  const handleView = (item) => {
    setViewData(item);
    setIsViewModalOpen(true);
  };

  return (
    <>
      <ListGrid
        breadcrumb={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Data Master", href: "/admin/data-master" },
          { label: "Jenis Jabatan", href: "/admin/data-master/jenis-jabatan" },
        ]}
        columns={columns}
        data={data?.data?.items || []}
        description="Kelola data jenis-jenis jabatan dalam gereja"
        isLoading={isLoading}
        rowActionType="horizontal"
        rowActions={[
          {
            icon: Pen,
            onClick: (item) => modal.open(item),
            variant: "outline",
            tooltip: "Edit jenis jabatan",
          },
          {
            icon: Eye,
            onClick: handleView,
            variant: "outline",
            tooltip: "Lihat detail lengkap",
          },
          {
            icon: Trash,
            onClick: handleDelete,
            variant: "outline",
            tooltip: "Hapus jenis jabatan",
          },
        ]}
        searchPlaceholder="Cari nama jenis jabatan..."
        title="Manajemen Jenis Jabatan"
        onAdd={() => modal.open()}
        onExport={() => {}}
      />

      <CreateOrEditModal
        defaultValues={{
          namaJabatan: "",
        }}
        editData={modal.editData}
        fields={jenisJabatanFields}
        isOpen={modal.isOpen}
        schema={jenisJabatanSchema}
        title="Jenis Jabatan"
        onClose={modal.close}
        onSubmit={handleJenisJabatanSubmit}
        onSuccess={handleJenisJabatanSuccess}
      />

      <ConfirmDialog
        isOpen={confirm.isOpen}
        onClose={confirm.hideConfirm}
        onConfirm={confirm.handleConfirm}
        title={confirm.config.title}
        message={confirm.config.message}
        confirmText={confirm.config.confirmText}
        cancelText={confirm.config.cancelText}
        variant={confirm.config.variant}
      />

      {isViewModalOpen && viewData && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/10 backdrop-blur-sm transition-opacity"></div>

          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  Detail Jenis Jabatan
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      ID
                    </label>
                    <p className="text-sm text-gray-900">{viewData.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Nama Jenis Jabatan
                    </label>
                    <p className="text-sm text-gray-900">
                      {viewData.namaJabatan}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-auto"
                  onClick={() => setIsViewModalOpen(false)}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
