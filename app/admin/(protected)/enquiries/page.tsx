import { getEnquiries } from '@/lib/actions/enquiries'
import MarkReadButton from '@/components/admin/MarkReadButton'

export default async function AdminEnquiriesPage() {
  const enquiries = await getEnquiries()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-earth-900">Enquiries</h1>
        <p className="text-sm text-earth-500">{enquiries.length} total · {enquiries.filter((e: any) => !e.read).length} unread</p>
      </div>

      {enquiries.length === 0 ? (
        <div className="bg-white border border-beige-200 rounded-lg p-12 text-center">
          <p className="text-earth-500">No enquiries yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {enquiries.map((enq: any) => (
            <div
              key={enq.id}
              className={`bg-white border rounded-lg p-5 ${!enq.read ? 'border-amber-300' : 'border-beige-200'}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-earth-900">{enq.name}</p>
                    {!enq.read && <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">New</span>}
                    {enq.source && <span className="text-xs text-earth-400">{enq.source}</span>}
                  </div>
                  <div className="flex gap-4 text-sm text-earth-600 mb-3">
                    <a href={`mailto:${enq.email}`} className="hover:text-earth-900 underline">{enq.email}</a>
                    {enq.phone && <a href={`tel:${enq.phone}`} className="hover:text-earth-900">{enq.phone}</a>}
                    {enq.product_ref && <span className="text-earth-500">Re: {enq.product_ref}</span>}
                  </div>
                  <p className="text-sm text-earth-700 whitespace-pre-wrap">{enq.message}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-earth-400 mb-2">
                    {new Date(enq.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                  {!enq.read && <MarkReadButton id={enq.id} />}
                  <div className="flex gap-2 mt-2 justify-end">
                    <a
                      href={`mailto:${enq.email}?subject=Re: Maatir Maanush Enquiry`}
                      className="text-xs px-2 py-1 border border-beige-300 rounded text-earth-700 hover:bg-beige-50 transition"
                    >
                      Reply via Email
                    </a>
                    {enq.phone && (
                      <a
                        href={`https://wa.me/${enq.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi ${enq.name}, thank you for enquiring about Maatir Maanush!`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                      >
                        Reply on WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
