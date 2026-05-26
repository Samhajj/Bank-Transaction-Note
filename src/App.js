import { useState } from "react";
import "./App.css";
// import { isVisible } from "@testing-library/user-event/dist/utils";
const initialtransactions = [
  { name: "Demola", amount: 20000, balance: 100000, status: "withdrawal" },
  { name: "Dupe", amount: 50000, balance: 120000, status: "withdrawal" },
  { name: "James", amount: 30000, balance: 170000, status: "withdrawal" },
  { name: "James", amount: 30000, balance: 200000, status: "deposit" },
];

export default function App() {
  const [user, setUser] = useState("Samson");
  const [transactions, setTransactions] = useState(initialtransactions);
  const [status, setStatus] = useState("withdrawal");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(100000);
  const [isVisible, setIsVisible] = useState(false);

  function handleSetUser(user) {
    setUser(user);
  }

  function handleSetBalance(balance) {
    setBalance(balance);
    //   setBalance(balance);
    //   if (status === "Withdrawal" && balance >= amount) {
    //     setBalance(balance - amount);
    //   } else if (status === "Withdrawal" && balance < amount) {
    //     window.alert(
    //       `You cannot withdraw ${amount} as you have ${balance} Naira left `,
    //     );

    //     setBalance(balance);
    //   } else if (status === "Deposit") {
    //     setBalance(balance + amount);
    //   }
  }

  function handleStatus(e) {
    setStatus(e.target.value);
  }

  function handleName(e) {
    setName(e.target.value);
  }

  function handleAmount(e) {
    setAmount(e.target.value);
  }
  function onTransaction(transaction) {
    setTransactions((transactions) => [transaction, ...transactions]);
  }

  return (
    <div className="App">
      <div className="upper">
        {!isVisible && (
          <User
            onSetUser={handleSetUser}
            isVisible={isVisible}
            onSet={setIsVisible}
          />
        )}
        {isVisible && <AccountBalDisplay user={user} curBalance={balance} />}
      </div>
      {isVisible && (
        <div className="transaction-border">
          <h2>Recent Transactions</h2>
          <NotificationsTab transactions={transactions} />
        </div>
      )}
      {isVisible && (
        <ActionTab
          curBalance={balance}
          // onSetBalance={handleSetBalance}
          name={name}
          amount={amount}
          status={status}
          onChangeStatus={handleStatus}
          onChangeName={handleName}
          onChangeAmount={handleAmount}
          onTransaction={onTransaction}
          onSetBalance={handleSetBalance}
        />
      )}
    </div>
  );
}

function User({ onSetUser, isVisible, onSet }) {
  function onSubmit(e) {
    e.preventDefault();
    onSet(true);
  }
  return (
    <div>
      <form
        className={isVisible ? "user-input-form" : "userInputForm"}
        onSubmit={onSubmit}
      >
        <label>Who is logging in?</label>
        <input type="text" onChange={(e) => onSetUser(e.target.value)}></input>
      </form>
    </div>
  );
}

function AccountBalDisplay({ user, curBalance }) {
  return (
    <div className="account-details-main">
      <div className="account-details">
        <p>{`Welcome ${user}`} </p>
        <h1>{curBalance}</h1>
      </div>
    </div>
  );
}

function NotificationsTab({ transactions }) {
  return (
    <div>
      {transactions.map((transaction) => (
        <TransactionDetail
          transaction={transaction}
          key={crypto.randomUUID()}
        />
      ))}
    </div>
  );
}

function TransactionDetail({ transaction }) {
  return (
    <div className="transactions-details">
      <div className="transactions-details-name">
        <h5>{transaction.name}</h5>
      </div>

      <div
        className={`transactions-details-sub ${transaction.status === "withdrawal" ? "withdrawal" : "deposit"}`}
      >
        <h6>{transaction.amount}</h6>
        <p>{transaction.balance}</p>
      </div>
    </div>
  );
}

function ActionTab({
  curBalance,
  onSetBalance,
  name,
  amount,
  status,
  onChangeStatus,
  onChangeName,
  onChangeAmount,
  onTransaction,
}) {
  // const [transactionType, setTransactionType] =

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !amount) return;
    if (status === "withdrawal" && amount > curBalance) {
      alert("Insufficient balance");
      return;
    }

    const newBalance =
      status === "withdrawal"
        ? Number(curBalance) - Number(amount)
        : Number(curBalance) + Number(amount);

    const newTransaction = {
      name,
      amount,
      balance: newBalance,
      status,
    };

    onSetBalance(newBalance);

    onTransaction(newTransaction);
  }

  return (
    <form className="actionTab" onSubmit={handleSubmit}>
      <h2>Make a Transaction</h2>
      <label>Transaction Type</label>
      <select type="text" value={status} onChange={(e) => onChangeStatus(e)}>
        <option value="withdrawal">Withdrawal</option>
        <option value="deposit">Deposit</option>
      </select>
      <label>Name</label>
      <input type="text" value={name} onChange={(e) => onChangeName(e)}></input>
      <label>Amount</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => onChangeAmount(e)}
      ></input>
      <button className="button">Transact</button>
    </form>
  );
}
// import { useState } from "react";
// import "./App.css";

// const initialtransactions = [
//   { name: "Demola", amount: 20000, balance: 100000, status: "withdrawal" },
//   { name: "Dupe", amount: 50000, balance: 120000, status: "withdrawal" },
//   { name: "James", amount: 30000, balance: 170000, status: "withdrawal" },
//   { name: "James", amount: 30000, balance: 200000, status: "deposit" },
// ];

// export default function App() {
//   const [user, setUser] = useState("Samson");

//   const [transactions, setTransactions] = useState(initialtransactions);

//   const [balance, setBalance] = useState(200000);

//   function handleSetUser(user) {
//     setUser(user);
//   }

//   function handleTransaction(newTransaction) {
//     setTransactions((transactions) => [
//       newTransaction,
//       ...transactions,
//     ]);

//     setBalance(newTransaction.balance);
//   }

//   return (
//     <div className="App">
//       <div className="upper">
//         <User onSetUser={handleSetUser} />

//         <AccountBalDisplay user={user} balance={balance} />
//       </div>

//       <div className="transaction-border">
//         <h2>Recent Transactions</h2>

//         <NotificationsTab transactions={transactions} />
//       </div>

//       <ActionTab
//         balance={balance}
//         onTransaction={handleTransaction}
//       />
//     </div>
//   );
// }

// function User({ onSetUser }) {
//   return (
//     <div>
//       <form className="user-input-form">
//         <label>Who is logging in?</label>

//         <input
//           type="text"
//           onChange={(e) => onSetUser(e.target.value)}
//         />
//       </form>
//     </div>
//   );
// }

// function AccountBalDisplay({ user, balance }) {
//   return (
//     <div className="account-details-main">
//       <div className="account-details">
//         <p>{`Welcome ${user}`}</p>

//         <h1>{balance}</h1>
//       </div>
//     </div>
//   );
// }

// function NotificationsTab({ transactions }) {
//   return transactions.map((transaction, index) => (
//     <TransactionDetail
//       key={index}
//       transaction={transaction}
//     />
//   ));
// }

// function TransactionDetail({ transaction }) {
//   return (
//     <div className="transactions-details">
//       <div className="transactions-details-name">
//         <h5>{transaction.name}</h5>
//       </div>

//       <div
//         className={`transactions-details-sub ${
//           transaction.status === "withdrawal"
//             ? "withdrawal"
//             : "deposit"
//         }`}
//       >
//         <h6>{transaction.amount}</h6>

//         <p>{transaction.balance}</p>
//       </div>
//     </div>
//   );
// }

// function ActionTab({ balance, onTransaction }) {
//   const [status, setStatus] = useState("withdrawal");
//   const [name, setName] = useState("");
//   const [amount, setAmount] = useState("");

//   function handleSubmit(e) {
//     e.preventDefault();

//     const numericAmount = Number(amount);

//     // Prevent overdraft
//     if (
//       status === "withdrawal" &&
//       numericAmount > balance
//     ) {
//       alert("Insufficient balance");
//       return;
//     }

//     const newBalance =
//       status === "withdrawal"
//         ? balance - numericAmount
//         : balance + numericAmount;

//     const newTransaction = {
//       name,
//       amount: numericAmount,
//       balance: newBalance,
//       status,
//     };

//     onTransaction(newTransaction);

//     // reset form
//     setName("");
//     setAmount("");
//   }

//   return (
//     <form className="actionTab" onSubmit={handleSubmit}>
//       <h2>Make a Transaction</h2>

//       <label>Transaction Type</label>

//       <select
//         value={status}
//         onChange={(e) => setStatus(e.target.value)}
//       >
//         <option value="withdrawal">Withdrawal</option>

//         <option value="deposit">Deposit</option>
//       </select>

//       <label>Name</label>

//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />

//       <label>Amount</label>

//       <input
//         type="number"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />

//       <button className="button">
//         Transact
//       </button>
//     </form>
//   );
// }
