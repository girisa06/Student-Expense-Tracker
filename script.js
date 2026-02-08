let expense = [];
const expenseList = document.getElementById("expenseList");
expenseList.innerHTML = ""; //clears old content before re-reading - avoids duplicates - list is redrawn fresh every time
let totalSpent = 0;

function addExpense() {
  const name = document.getElementById("expenseName").value;
  const category = document.getElementById("category").value;
  const amount = Number(document.getElementById("amount").value);

  expense.push({
    name: name,
    category: category,
    amount: amount
  });
  displayExpenses();
  calculateTotal();
  calculateWalletBalance();
}
function displayExpenses(){
    expenseList.innerHTML = ""; //clears old content before re-reading - avoids duplicates - list is redrawn fresh every time
    expense.forEach(function(expense,index){
      const div = document.createElement("div");
      div.innerText = 
          expense.name + " | " +expense.category + " | " + expense.amount;
      
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText="🗑️";
      deleteBtn.onclick = function(){
        deleteExpense(index);
      };
      div.appendChild(deleteBtn);
      expenseList.appendChild(div); //display on page /append to page
    });
}
function calculateTotal(){
  let sum=0;
  expense.forEach(function(expense){
    sum = sum + expense.amount;
  });
  totalSpent = sum;
  document.getElementById("totalSpent").innerText = totalSpent;
}
function calculateWalletBalance() {
  const initial =
    Number(document.getElementById("initialBalance").value);

  const allowance =
    Number(document.getElementById("allowance").value);

  const wallet = initial + allowance - totalSpent;

  document.getElementById("walletBalance").innerText = wallet;
}

function deleteExpense(index){
  expense.splice(index,1);
  displayExpenses();
  calculateTotal();
  calculateWalletBalance();
}
document.getElementById("initialBalance").addEventListener("input",calculateWalletBalance);
document.getElementById("allowance").addEventListener("input",calculateWalletBalance);
