var monthlyBudget = 0;
var expenses = [];

function budgetAdd() {
  var budgetInput = document.getElementById('budgetInp');
  monthlyBudget = parseInt(budgetInput.value);
  budgetInput.value = '';

  showBudget();
  calculateRemainingBudget();
}

function addExpense() {
  var descriptionInput = document.getElementById('descriptionInp');
  var amountInput = document.getElementById('amountInp');
  var dateInput = document.getElementById('dateInp');

  var expense = {
    description: descriptionInput.value,
    amount: parseFloat(amountInput.value),
    date: dateInput.value
  };

  expenses.push(expense);

  descriptionInput.value = '';
  amountInput.value = '';
  dateInput.value = '';

  showExpenses();
  calculateRemainingBudget();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  showExpenses();
  calculateRemainingBudget();
}

function showBudget() {
  var budgetValue = document.getElementById('valbudget');
  budgetValue.textContent = 'Monthly Budget: $' + monthlyBudget;
}

function showExpenses() {
  var expensesTableBody = document.getElementById('tableExpense');
  expensesTableBody.innerHTML = '';

  expenses.forEach((expense, index) => {
    var line = document.createElement('tr');

    var descriptionCell = document.createElement('td');
    descriptionCell.textContent = expense.description;

    var amountCell = document.createElement('td');
    amountCell.textContent = expense.amount;

    var dateCell = document.createElement('td');
    dateCell.textContent = expense.date;

    var actionsCell = document.createElement('td');
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {
      deleteExpense(index);
    };

    var editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = function () {
      editExpense(index);
    };

    actionsCell.appendChild(deleteButton);
    actionsCell.appendChild(editButton);

    line.appendChild(descriptionCell);
    line.appendChild(amountCell);
    line.appendChild(dateCell);
    line.appendChild(actionsCell);

    expensesTableBody.appendChild(line);
  });
}

function editExpense(index) {
  var expense = expenses[index];

  var newDescription = prompt('Enter the new description:', expense.description);

  if (newDescription === null || newDescription === '') {
    alert('Please enter a valid description');
    return;
  }

  var newAmount = prompt('Enter the new amount:', expense.amount);

  if (newAmount === null || newAmount === '' || isNaN(newAmount)) {
    alert('Please enter a valid amount');
    return;
  }

  expense.description = newDescription;
  expense.amount = parseFloat(newAmount);

  showExpenses();
  calculateRemainingBudget();
}

function calculateRemainingBudget() {
  var remainingBudgetValue = document.getElementById('budgetBaqaya');
  var totalExpenses = expenses.reduce(function (total, expense) {
    return total + expense.amount;
  }, 0);
  var remainingBudget = monthlyBudget - totalExpenses;

  remainingBudgetValue.textContent = 'Your Remaining Budget: $' + remainingBudget;

  if (remainingBudget < 0) {
    remainingBudgetValue.style.color = 'red';
  } else {
    remainingBudgetValue.style.color = 'green';
  }
}
