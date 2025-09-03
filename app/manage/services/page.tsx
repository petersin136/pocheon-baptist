import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export const metadata = {
  title: '관리자 · 예배시간 관리',
}

const serviceSchema = z.object({
  id: z.string().optional(),
  service_name: z.string().min(1, '서비스명을 입력하세요.'),
  day_of_week: z.string().min(1, '요일을 입력하세요.'),
  time: z.string().min(1, '시간을 입력하세요.'),
  location: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  display_order: z.coerce.number().int().default(999),
  is_active: z.coerce.boolean().default(true),
})

async function getData() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('service_times')
    .select('*')
    .order('display_order')
  if (error) {
    console.error('Failed to fetch service_times:', error)
  }
  return data ?? []
}

async function upsertAction(formData: FormData) {
  'use server'
  const parsed = serviceSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    console.error(parsed.error.flatten())
    return
  }

  const values = parsed.data
  const supabase = await createClient()
  type ServiceTimeUpsert = {
    service_name: string
    day_of_week: string
    time: string
    location: string | null
    description: string | null
    display_order: number
    is_active: boolean
  }
  const payload: ServiceTimeUpsert = {
    service_name: values.service_name,
    day_of_week: values.day_of_week,
    time: values.time,
    location: values.location ?? null,
    description: values.description ?? null,
    display_order: values.display_order,
    is_active: values.is_active,
  }

  let resp
  if (values.id) {
    resp = await supabase
      .from('service_times')
      .update(payload)
      .eq('id', values.id)
  } else {
    resp = await supabase
      .from('service_times')
      .insert(payload)
  }

  if (resp.error) {
    console.error('Upsert error:', resp.error)
  }
  revalidatePath('/manage/services')
}

async function deleteAction(formData: FormData) {
  'use server'
  const id = String(formData.get('id') || '')
  if (!id) return
  const supabase = await createClient()
  const { error } = await supabase.from('service_times').delete().eq('id', id)
  if (error) {
    console.error('Delete error:', error)
  }
  revalidatePath('/manage/services')
}

export default async function ManageServicesPage() {
  const rows = await getData()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-gray-900">예배시간 관리</h1>
        <p className="mt-2 text-sm text-gray-600">행을 수정 후 저장을 누르거나, 아래에서 새 항목을 추가하세요.</p>

        <div className="mt-8 grid gap-6">
          {rows.map((row) => (
            <form key={row.id} action={upsertAction} className="rounded-xl bg-white p-4 shadow border border-gray-100">
              <input type="hidden" name="id" defaultValue={row.id} />
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">서비스명</label>
                  <input name="service_name" defaultValue={row.service_name ?? ''} className="mt-1 w-full rounded-md border-gray-300 focus:border-yellow-500 focus:ring-yellow-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">요일</label>
                  <input name="day_of_week" defaultValue={row.day_of_week ?? ''} className="mt-1 w-full rounded-md border-gray-300 focus:border-yellow-500 focus:ring-yellow-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">시간</label>
                  <input name="time" defaultValue={row.time ?? ''} className="mt-1 w-full rounded-md border-gray-300 focus:border-yellow-500 focus:ring-yellow-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">장소</label>
                  <input name="location" defaultValue={row.location ?? ''} className="mt-1 w-full rounded-md border-gray-300 focus:border-yellow-500 focus:ring-yellow-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">정렬</label>
                  <input type="number" name="display_order" defaultValue={row.display_order ?? 999} className="mt-1 w-full rounded-md border-gray-300 focus:border-yellow-500 focus:ring-yellow-500" />
                </div>

                <div className="md:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">설명</label>
                  <textarea name="description" defaultValue={row.description ?? ''} className="mt-1 w-full rounded-md border-gray-300 focus:border-yellow-500 focus:ring-yellow-500" />
                </div>

                <div className="flex items-center gap-4 md:col-span-6">
                  <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" name="is_active" defaultChecked={row.is_active} className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500" />
                    표시함
                  </label>

                  <button type="submit" className="ml-auto inline-flex items-center rounded-md bg-yellow-500 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-600">저장</button>

                  <button formAction={deleteAction} className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">삭제</button>
                </div>
              </div>
            </form>
          ))}

          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

          <form action={upsertAction} className="rounded-xl bg-white p-4 shadow border border-gray-100">
            <h2 className="text-base font-semibold text-gray-900">새 항목 추가</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">서비스명</label>
                <input name="service_name" className="mt-1 w-full rounded-md border-gray-300 focus:border-yellow-500 focus:ring-yellow-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">요일</label>
                <input name="day_of_week" className="mt-1 w-full rounded-md border-gray-300 focus:border-yellow-500 focus:ring-yellow-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">시간</label>
                <input name="time" className="mt-1 w-full rounded-md border-gray-300 focus:border-yellow-500 focus:ring-yellow-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">장소</label>
                <input name="location" className="mt-1 w-full rounded-md border-gray-300 focus:border-yellow-500 focus:ring-yellow-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">정렬</label>
                <input type="number" name="display_order" defaultValue={999} className="mt-1 w-full rounded-md border-gray-300 focus:border-yellow-500 focus:ring-yellow-500" />
              </div>

              <div className="md:col-span-6 flex items-center justify-between">
                <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" name="is_active" defaultChecked className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500" />
                  표시함
                </label>
                <button type="submit" className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black">추가</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


