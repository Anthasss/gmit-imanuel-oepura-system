import prisma from "@/lib/prisma";
import { apiResponse } from "@/lib/apiHelper";
import { parseQueryParams } from "@/lib/queryParams";
import { createApiHandler } from "@/lib/apiHandler";
import { staffOnly } from "@/lib/apiMiddleware";

async function handleGet(req, res) {
  try {
    const { pagination, sort, where } = parseQueryParams(req.query, {
      searchField: "nama",
      defaultSortBy: "nama",
    });

    const total = await prisma.jemaat.count({ where });

    const items = await prisma.jemaat.findMany({
      where,
      skip: pagination.skip,
      take: pagination.take,
      orderBy: {
        [sort.sortBy]: sort.sortOrder,
      },
      include: {
        keluarga: {
          include: {
            alamat: {
              include: {
                kelurahan: {
                  include: {
                    kecamatan: {
                      include: {
                        kotaKab: {
                          include: {
                            provinsi: true
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            statusKeluarga: true,
            rayon: true
          }
        },
        statusDalamKeluarga: true,
        suku: true,
        pendidikan: true,
        pekerjaan: true,
        pendapatan: true,
        jaminanKesehatan: true,
        User: true
      }
    });

    const totalPages = Math.ceil(total / pagination.limit);

    const result = {
      items,
      pagination: {
        ...pagination,
        total,
        totalPages,
        hasNext: pagination.page < totalPages,
        hasPrev: pagination.page > 1,
      },
    };

    return res
      .status(200)
      .json(apiResponse(true, result, "Data berhasil diambil"));
  } catch (error) {
    console.error("Error fetching jemaat:", error);
    return res
      .status(500)
      .json(
        apiResponse(
          false,
          null,
          "Gagal mengambil data jemaat",
          error.message
        )
      );
  }
}

async function handlePost(req, res) {
  try {
    const data = req.body;

    const newJemaat = await prisma.jemaat.create({
      data,
      include: {
        keluarga: {
          include: {
            alamat: {
              include: {
                kelurahan: true
              }
            },
            statusKeluarga: true,
            rayon: true
          }
        },
        statusDalamKeluarga: true,
        suku: true,
        pendidikan: true,
        pekerjaan: true,
        pendapatan: true,
        jaminanKesehatan: true
      }
    });

    return res
      .status(201)
      .json(apiResponse(true, newJemaat, "Data berhasil ditambahkan"));
  } catch (error) {
    console.error("Error creating jemaat:", error);
    return res
      .status(500)
      .json(
        apiResponse(
          false,
          null,
          "Gagal menambahkan data jemaat",
          error.message
        )
      );
  }
}

// Apply staff-only middleware - data jemaat sensitif
export default staffOnly(createApiHandler({
  GET: handleGet,
  POST: handlePost,
}));