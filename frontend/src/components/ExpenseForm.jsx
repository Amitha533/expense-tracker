import { useState } from 'react'

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Entertainment', 'Other']

export default function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    note: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!form.title.trim()) return setError('Please enter a title')
    if (!form.amount || Number(form.amount) <= 0) return setError('Enter a valid amount')

    try {
      setLoading(true)
      await onAdd({ ...form, amount: Number(form.amount) })
      setForm({
        title: '',
        amount: '',
        category: 'Food',
        date: new Date().toISOString().split('T')[0],
        note: '',
      })
      setSuccess('Expense added successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError('Failed to add expense. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          name="title"
          placeholder="e.g. Lunch at restaurant"
          value={form.title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Amount ($)</label>
        <input
          name="amount"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={form.amount}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select name="category" value={form.category} onChange={handleChange}>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Date</label>
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Note (optional)</label>
        <textarea
          name="note"
          rows="2"
          placeholder="Any extra details..."
          value={form.note}
          onChange={handleChange}
        />
      </div>

      {error && <p className="error-msg">{error}</p>}
      {success && <p className="success-msg">{success}</p>}

      <button type="submit" className="btn-submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Expense'}
      </button>
    </form>
  )
}