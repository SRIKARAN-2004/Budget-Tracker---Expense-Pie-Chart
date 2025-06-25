const ctx = document.getElementById("expenseChart").getContext("2d");
let categories = JSON.parse(localStorage.getItem("categories")) || [];
let amounts = JSON.parse(localStorage.getItem("amounts")) || [];

const expenseChart = new Chart(ctx, {
    type: "pie",
    data: {
        labels: categories,
        datasets: [{
            label: "Expenses",
            data: amounts,
            backgroundColor: [
                "#FF6384", "#36A2EB", "#FFCE56",
                "#4BC0C0", "#9966FF", "#FF9F40"
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});

document.getElementById("expense-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const category = document.getElementById("category").value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (category && !isNaN(amount)) {
        categories.push(category);
        amounts.push(amount);
        localStorage.setItem("categories", JSON.stringify(categories));
        localStorage.setItem("amounts", JSON.stringify(amounts));
        updateChart();
    }

    this.reset();
});

function updateChart() {
    expenseChart.data.labels = categories;
    expenseChart.data.datasets[0].data = amounts;
    expenseChart.update();
}
