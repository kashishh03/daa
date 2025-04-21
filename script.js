// let items = [];

// function addItem() {
//   const name = document.getElementById("item-name").value;
//   const weight = parseInt(document.getElementById("item-weight").value);
//   const value = parseInt(document.getElementById("item-value").value);

//   if (!name || isNaN(weight) || isNaN(value)) {
//     alert("Please fill in all item details.");
//     return;
//   }

//   items.push({ name, weight, value });

//   const ul = document.getElementById("items-ul");
//   const li = document.createElement("li");
//   li.textContent = `${name} - Weight: ${weight}, Value: ${value}`;
//   ul.appendChild(li);

//   // Clear inputs
//   document.getElementById("item-name").value = '';
//   document.getElementById("item-weight").value = '';
//   document.getElementById("item-value").value = '';
// }

// function solveKnapsack() {
//   const capacity = parseInt(document.getElementById("capacity").value);
//   if (isNaN(capacity) || capacity <= 0) {
//     alert("Please enter a valid knapsack capacity.");
//     return;
//   }

//   const n = items.length;
//   const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

//   // Build the DP table
//   for (let i = 1; i <= n; i++) {
//     for (let w = 0; w <= capacity; w++) {
//       if (items[i - 1].weight <= w) {
//         dp[i][w] = Math.max(
//           items[i - 1].value + dp[i - 1][w - items[i - 1].weight],
//           dp[i - 1][w]
//         );
//       } else {
//         dp[i][w] = dp[i - 1][w];
//       }
//     }
//   }

//   // Backtrack to find selected items
//   let w = capacity;
//   const selected = [];
//   for (let i = n; i > 0 && w > 0; i--) {
//     if (dp[i][w] !== dp[i - 1][w]) {
//       selected.push(items[i - 1]);
//       w -= items[i - 1].weight;
//     }
//   }

//   // Display selected items and total value
//   const ul = document.getElementById("selected-items");
//   ul.innerHTML = "";
//   selected.reverse().forEach(item => {
//     const li = document.createElement("li");
//     li.textContent = `${item.name} (Weight: ${item.weight}, Value: ${item.value})`;
//     ul.appendChild(li);
//   });

//   document.getElementById("total-value").textContent = dp[n][capacity];
// }
let items = [];

function addItem() {
  const name = document.getElementById("item-name").value;
  const weight = parseInt(document.getElementById("item-weight").value);
  const value = parseInt(document.getElementById("item-value").value);

  if (!name || isNaN(weight) || isNaN(value)) {
    alert("Please fill in all item details.");
    return;
  }

  items.push({ name, weight, value });

  const ul = document.getElementById("items-ul");
  const li = document.createElement("li");
  li.textContent = `${name} - Weight: ${weight}, Value: ${value}`;
  ul.appendChild(li);

  // Clear input fields
  document.getElementById("item-name").value = '';
  document.getElementById("item-weight").value = '';
  document.getElementById("item-value").value = '';
}

function solveKnapsack() {
  const capacity = parseInt(document.getElementById("capacity").value);
  if (isNaN(capacity) || capacity <= 0) {
    alert("Please enter a valid knapsack capacity.");
    return;
  }

  const n = items.length;

  // Initialize memoization table with -1
  const memo = Array.from({ length: capacity + 1 }, () => Array(n + 1).fill(-1));

  // Recursive function like the C++ version
  function KS(W, N) {
    if (W == 0 || N == 0) return 0;

    if (memo[W][N] !== -1) return memo[W][N];

    const currentItem = items[N - 1];

    let result;
    if (currentItem.weight > W) {
      result = KS(W, N - 1);
    } else {
      result = Math.max(
        KS(W, N - 1),
        currentItem.value + KS(W - currentItem.weight, N - 1)
      );
    }

    memo[W][N] = result;
    return result;
  }

  // Get maximum value
  const maxProfit = KS(capacity, n);

  // Backtracking to find selected items
  const selected = [];
  let W = capacity, N = n;
  while (W > 0 && N > 0) {
    if (memo[W][N] !== memo[W][N - 1]) {
      const currentItem = items[N - 1];
      selected.push(currentItem);
      W -= currentItem.weight;
    }
    N--;
  }

  // Display selected items
  const ul = document.getElementById("selected-items");
  ul.innerHTML = "";
  selected.reverse().forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} (Weight: ${item.weight}, Value: ${item.value})`;
    ul.appendChild(li);
  });

  // Show total value
  document.getElementById("total-value").textContent = maxProfit;
}
