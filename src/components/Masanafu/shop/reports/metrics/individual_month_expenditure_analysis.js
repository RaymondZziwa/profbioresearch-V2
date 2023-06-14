import { useState } from "react"
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

const IndividualMonthExpenditureAnalysis = ({ expensesData }) => {
    const [selectedMonth, setSelectedMonth] = useState('') 

    const months = Array.from(
        new Set(expensesData.map((sale) => {
          const [day, month, year] = sale.date.split('/');
          return parseInt(month);
        }))
    ).sort()

    const filteredExpensesData = expensesData.filter((expense) => {
        const [day, month, year] = expense.date.split('/');
        return parseInt(month) === parseInt(selectedMonth);
    })

    const monthNames = Array.from({ length: 12 }, (_, index) =>
        new Date(0, index).toLocaleString('default', { month: 'long' })
    )

    const chartData = {
        labels: filteredExpensesData.map((expense) => expense.expenditureid),
        datasets: [
          {
            label: 'Total Expenditure',
            data: filteredExpensesData.map((expense) => expense.expenditurecost),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
    }

    const renderDropdown = (
        <select class="form-select" aria-label="Default select example" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            <option value="">Select a month</option>
            {months.map((month) => (
                <option key={month} value={month}>
                    {monthNames[month - 1]}
                </option>
            ))}
        </select>
    )

    const renderLineGraph = (
        <Line data={chartData} options={{ responsive: true }} />
    )


    const date = new Date()
    const currentYear = date.getFullYear()

    return (
        <div style={{height:'400px'}}>
          <h5 style={{textAlign:'center'}}>Year: {currentYear}</h5>
          <p style={{textAlign:'center'}}>{renderDropdown}</p>
          {selectedMonth && renderLineGraph}
        </div>
    )
}

export default IndividualMonthExpenditureAnalysis