import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { 
  Database, 
  Trash2, 
  Download, 
  Info, 
  AlertTriangle,
  CheckCircle 
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

export default function KeuanganSetupPage() {
  const queryClient = useQueryClient();
  const [showClearDialog, setShowClearDialog] = useState(false);

  // Query untuk cek status data
  const { data: statusData, isLoading } = useQuery({
    queryKey: ["keuangan-status"],
    queryFn: async () => {
      const [kategoriRes, itemRes, periodeRes] = await Promise.all([
        axios.get("/api/keuangan/kategori"),
        axios.get("/api/keuangan/item"),
        axios.get("/api/keuangan/periode")
      ]);
      
      return {
        kategori: kategoriRes.data.data?.pagination?.total || 0,
        items: itemRes.data.data?.pagination?.total || 0,
        periode: periodeRes.data.data?.pagination?.total || 0
      };
    }
  });

  // Mutation untuk seed data
  const seedMutation = useMutation({
    mutationFn: async (force = false) => {
      const response = await axios.post("/api/keuangan/seed", { force });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["keuangan-status"] });
      queryClient.invalidateQueries({ queryKey: ["kategori-keuangan"] });
      queryClient.invalidateQueries({ queryKey: ["item-keuangan"] });
      toast.success("Data seed berhasil dibuat");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Gagal membuat seed data");
    }
  });

  // Mutation untuk clear data
  const clearMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.delete("/api/keuangan/seed");
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["keuangan-status"] });
      queryClient.invalidateQueries({ queryKey: ["kategori-keuangan"] });
      queryClient.invalidateQueries({ queryKey: ["item-keuangan"] });
      toast.success("Semua data keuangan berhasil dihapus");
      setShowClearDialog(false);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Gagal menghapus data");
      setShowClearDialog(false);
    }
  });

  const hasData = statusData && (statusData.kategori > 0 || statusData.items > 0);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Setup Sistem Keuangan</h1>
        <p className="text-gray-600">
          Kelola setup dan konfigurasi data master keuangan
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Kategori Keuangan
            </CardTitle>
            <Database className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusData?.kategori || 0}</div>
            <p className="text-xs text-muted-foreground">
              Total kategori terdaftar
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Item Keuangan
            </CardTitle>
            <Database className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusData?.items || 0}</div>
            <p className="text-xs text-muted-foreground">
              Total item dalam sistem
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Periode Anggaran
            </CardTitle>
            <Database className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusData?.periode || 0}</div>
            <p className="text-xs text-muted-foreground">
              Total periode aktif
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Status Info */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          {hasData ? (
            <>
              <strong>Status:</strong>{" "}
              <Badge variant="success" className="mr-2">
                <CheckCircle className="w-3 h-3 mr-1" />
                Data Tersedia
              </Badge>
              Sistem keuangan sudah memiliki data master. Anda dapat menambah kategori dan item baru sesuai kebutuhan.
            </>
          ) : (
            <>
              <strong>Status:</strong>{" "}
              <Badge variant="secondary" className="mr-2">
                Data Kosong
              </Badge>
              Sistem belum memiliki data master keuangan. Silahkan buat data seed atau tambah manual.
            </>
          )}
        </AlertDescription>
      </Alert>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Aksi Data Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Seed Data Section */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">Data Seed (Contoh)</h3>
            <p className="text-gray-600 text-sm mb-4">
              Buat data contoh untuk memulai. Akan membuat kategori PENERIMAAN & PENGELUARAN 
              beserta beberapa item standar seperti Perpuluhan, Operasional, dll.
            </p>
            
            <div className="flex gap-3">
              <Button
                onClick={() => seedMutation.mutate(false)}
                disabled={seedMutation.isPending}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                {seedMutation.isPending ? "Membuat..." : "Buat Data Seed"}
              </Button>
              
              {hasData && (
                <Button
                  variant="outline"
                  onClick={() => seedMutation.mutate(true)}
                  disabled={seedMutation.isPending}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Force Seed (Timpa)
                </Button>
              )}
            </div>
          </div>

          {/* Manual Setup Section */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">Setup Manual</h3>
            <p className="text-gray-600 text-sm mb-4">
              Buat kategori dan item keuangan sesuai kebutuhan gereja Anda secara manual.
            </p>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => window.open('/admin/data-master/keuangan/kategori', '_blank')}
                className="flex items-center gap-2"
              >
                <Database className="w-4 h-4" />
                Kelola Kategori
              </Button>
              
              <Button
                variant="outline"
                onClick={() => window.open('/admin/data-master/keuangan/item', '_blank')}
                className="flex items-center gap-2"
              >
                <Database className="w-4 h-4" />
                Kelola Item
              </Button>
            </div>
          </div>

          {/* Danger Zone */}
          {hasData && (
            <div className="border-red-200 border rounded-lg p-4 bg-red-50">
              <h3 className="font-semibold text-lg mb-2 text-red-800">Danger Zone</h3>
              <p className="text-red-700 text-sm mb-4">
                <AlertTriangle className="w-4 h-4 inline mr-1" />
                Aksi ini akan menghapus SEMUA data keuangan (kategori, item, transaksi, dll). 
                Data yang sudah dihapus tidak dapat dikembalikan!
              </p>
              
              <Button
                variant="destructive"
                onClick={() => setShowClearDialog(true)}
                disabled={clearMutation.isPending}
                className="flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Hapus Semua Data
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={showClearDialog}
        onClose={() => setShowClearDialog(false)}
        onConfirm={() => clearMutation.mutate()}
        title="Hapus Semua Data Keuangan"
        message={
          <>
            <p className="mb-2">
              Anda akan menghapus <strong>SEMUA</strong> data keuangan termasuk:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Semua kategori keuangan</li>
              <li>Semua item keuangan</li>
              <li>Semua periode anggaran</li>
              <li>Semua transaksi penerimaan & pengeluaran</li>
              <li>Semua data rekap dan anggaran</li>
            </ul>
            <p className="mt-2 font-semibold text-red-600">
              Data yang dihapus tidak dapat dikembalikan!
            </p>
          </>
        }
        variant="danger"
        isLoading={clearMutation.isPending}
        confirmText="Ya, Hapus Semua"
      />
    </div>
  );
}