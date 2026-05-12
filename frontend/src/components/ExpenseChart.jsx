import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

const COLORS = [
  '#5b6abf', '#e07b54', '#54c0e8', '#5cb85c',
  '#f0ad4e', '#d9534f', '#9b59b6'
]

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Entertainment', 'Other']

export default function ExpenseChart({ expenses }) {
  if (expenses.length === 0) {
    return (
      <div className="empty-state" style={{ padding: '40px 0' }}>
        Add expenses to see charts 📊
      </div>
    )
  }

  // Aggregate by category
  const byCategory = CATEGORIES.map((cat) => ({
    category: cat,
    total: expenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0),
  })).filter((c) => c.total > 0)

  const doughnutData = {
    labels: byCategory.map((c) => c.category),
    datasets: [{
      data: byCategory.map((c) => c.total),
      backgroundColor: COLORS.slice(0, byCategory.length),
      borderWidth: 2,
      borderColor: '#fff',
    }]
  }

  const barData = {
    labels: byCategory.map((c) => c.category),
    datasets: [{
      label: 'Amount ($)',
      data: byCategory.map((c) => c.total),
      backgroundColor: COLORS.slice(0, byCategory.length),
      borderRadius: 6,
    }]
  }

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (v) => `$${v}`
        }
      }
    }
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}>
      <div>
        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#888', marginBottom: 12 }}>
          By Category (Doughnut)
        </p>
        <Doughnut data={doughnutData} />
      </div>
      <div>
        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#888', marginBottom: 12 }}>
          By Category (Bar Chart)
        </p>
        <Bar data={barData} options={barOptions} />
      </div>
    </div>
  )
}