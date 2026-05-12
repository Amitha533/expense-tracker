import { useState, useEffect } from 'react'
import axios from 'axios'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import ExpenseChart from './components/ExpenseChart'
import './App.css'

const API_URL = 'http://localhost:5000/api/expenses'

function App() {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchExpenses = async () => {
    try {
      setLoading(true)
      const res = await axios.get(API_URL)
      setExpenses(res.data.data)
      setError('')
    } catch (err) {
      setError('Failed to load expenses. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExpenses()
  }, [])

  const addExpense = async (formData) => {
    const res = await axios.post(API_URL, formData)
    setExpenses([res.data.data, ...expenses])
  }

  const deleteExpense = async (id) => {
    await axios.delete(`${API_URL}/${id}`)
    setExpenses(expenses.filter((e) => e._id !== id))
  }

  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="app">
      <h1 className="app-title">💸 Expense Tracker</h1>
      <p className="subtitle">Track your spending, understand your patterns</p>

      <div className="total-banner">
        <div>
          <div className="label">Total Expenses</div>
          <div className="amount">${total.toFixed(2)}</div>
        </div>
        <div>
          <div className="label">Transactions</div>
          <div className="amount">{expenses.length}</div>
        </div>
      </div>

      {error && <p className="error-msg" style={{ textAlign: 'center', marginBottom: 20 }}>{error}</p>}

      <div className="grid">
        <div className="card">
          <h2>➕ Add Expense</h2>
          <ExpenseForm onAdd={addExpense} />
        </div>
        <div className="card">
          <h2>📋 Recent Expenses</h2>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <ExpenseList expenses={expenses} onDelete={deleteExpense} />
          )}
        </div>
      </div>

      <div className="card chart-full">
        <h2>📊 Spending by Category</h2>
        <ExpenseChart expenses={expenses} />
      </div>
    </div>
  )
}

export default App