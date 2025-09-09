import { createClient } from '@/utils/supabase/server'
// import { createAdminClient } from '@/utils/supabase/admin'
import { revalidatePath } from 'next/cache'

export const metadata = { title: '관리자 · 사이트 설정' }

async function getSettings() {
  const supabase = await createClient()
  const { data } = await supabase.from('site_settings').select('*').single()
  return data || {}
}

async function saveSettings(formData: FormData) {
  'use server'
  const supabase = await createClient()
  const fields = Object.fromEntries(formData)
  // normalize pre-wrap strings
  const payload = {
    main_slogan: (fields.main_slogan as string) ?? null,
    welcome_message: (fields.welcome_message as string) ?? null,
    vision_statement: (fields.vision_statement as string) ?? null,
  }
  // upsert to single row (id = 1)
  const { error } = await supabase.from('site_settings').upsert({ id: 1, ...payload })
  if (error) {
    console.error('settings save error:', error)
    throw new Error('설정 저장 실패: ' + error.message)
  }
  revalidatePath('/')
  revalidatePath('/about')
}

export default async function ManageSettingsPage() {
  const settings = await getSettings()
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-gray-900">사이트 설정</h1>
        <p className="mt-2 text-sm text-gray-600">히어로/인사말 문구를 수정하고 저장하세요. 줄바꿈(Enter) 그대로 반영됩니다.</p>

        <form action={saveSettings} className="mt-6 rounded-xl bg-white p-4 shadow border border-gray-100">
          <div className="grid gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">메인 슬로건 (히어로 제목)</label>
              <textarea name="main_slogan" defaultValue={settings.main_slogan || ''} rows={2} className="mt-1 w-full rounded-md border-gray-300 focus:border-yellow-500 focus:ring-yellow-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">환영 문구 (히어로 부제)</label>
              <textarea name="welcome_message" defaultValue={settings.welcome_message || ''} rows={3} className="mt-1 w-full rounded-md border-gray-300 focus:border-yellow-500 focus:ring-yellow-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">비전 문구 (About/비전 섹션)</label>
              <textarea name="vision_statement" defaultValue={settings.vision_statement || ''} rows={3} className="mt-1 w-full rounded-md border-gray-300 focus:border-yellow-500 focus:ring-yellow-500" />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black">저장</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}


