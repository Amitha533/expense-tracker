export default function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return <div className="empty-state">No expenses yet. Add your first one! 💰</div>
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this expense?')) {
      try {
        await onDelete(id)
      } catch {
        alert('Failed to delete. Try again.')
      }
    }
  }

  return (
    <div>
      {expenses.map((expense) => (
        <div key={expense._id} className="expense-item">
          <div className="expense-left">
            <div>
              <div className="expense-title">{expense.title}</div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>
                <span className={`category-badge badge-${expense.category}`}>
                  {expense.category}
                </span>
                <span className="expense-date">
                  {new Date(expense.date).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric', year: 'numeric'
                  })}
                </span>
              </div>
              {expense.note && (
                <div style={{ fontSize: '0.8rem', color: '#999', marginTop: 2 }}>
                  {expense.note}
                </div>
              )}
            </div>
          </div>
          <div className="expense-right">
            <span className="expense-amount">${expense.amount.toFixed(2)}</span>
            <button
              className="btn-delete"
              onClick={() => handleDelete(expense._id)}
              title="Delete expense"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}