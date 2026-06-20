import { useState, useEffect } from 'react';
import { CreditCard, ArrowUpRight, ArrowDownLeft, Users, Settings, Home, Bell } from 'lucide-react';

const CHASE_BLUE = '#117ACA';
const CHASE_NAVY = '#005EB8';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user] = useState({ name: "Alex Rivera" });
  const [activeTab, setActiveTab] = useState('home');
  const [accounts, setAccounts] = useState([
    { id: 1, type: 'Chase Checking', balance: 12456.78, available: 12456.78 },
    { id: 2, type: 'Chase Savings', balance: 8750.00, available: 8750.00 },
    { id: 3, type: 'Chase Freedom Unlimited', balance: -245.67, available: 4875.00 },
  ]);
  const [transactions, setTransactions] = useState([
    { id: 1, date: 'Jun 19', merchant: 'Whole Foods', amount: -87.43 },
    { id: 2, date: 'Jun 18', merchant: 'Direct Deposit - ACME Corp', amount: 3250.00 },
    { id: 3, date: 'Jun 17', merchant: 'Amazon', amount: -45.99 },
  ]);
  const [newTrans, setNewTrans] = useState({ merchant: '', amount: '' });

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  const handleLogin = (e) => { e.preventDefault(); setIsLoggedIn(true); };

  const addTransaction = () => {
    if (!newTrans.merchant || !newTrans.amount) return;
    const amount = parseFloat(newTrans.amount);
    setTransactions([{
      id: Date.now(),
      date: 'Jun 19',
      merchant: newTrans.merchant,
      amount
    }, ...transactions]);
    setNewTrans({ merchant: '', amount: '' });
  };

  const transfer = (amount) => {
    alert(`$${amount} transferred successfully (LARP simulation)`);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
          <div className="bg-[#117ACA] p-8 text-white text-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Chase_logo_2007.svg/512px-Chase_logo_2007.svg.png" alt="Chase" className="h-12 mx-auto mb-4" />
            <h1 className="text-3xl font-bold">Chase Mobile</h1>
          </div>
          <form onSubmit={handleLogin} className="p-8 space-y-6">
            <input type="text" defaultValue="alex.rivera@chase.com" className="w-full border rounded-xl px-4 py-3" placeholder="Username" />
            <input type="password" defaultValue="password123" className="w-full border rounded-xl px-4 py-3" placeholder="Password" />
            <button type="submit" className="w-full bg-[#117ACA] text-white py-4 rounded-2xl font-semibold text-lg">Sign In</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto shadow-2xl overflow-hidden" style={{ fontFamily: 'system-ui' }}>
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Chase_logo_2007.svg/512px-Chase_logo_2007.svg.png" alt="Chase" className="h-8" />
          <div className="font-semibold">Hi, {user.name.split(' ')[0]}</div>
        </div>
        <div className="flex gap-4">
          <Bell className="w-6 h-6" />
          <Settings className="w-6 h-6 cursor-pointer" onClick={() => setActiveTab('settings')} />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white border-b sticky top-16 z-40">
        {['home', 'activity', 'transfer', 'settings'].map(t => (
          <button key={t} onClick={() => setActiveTab(t)} className={`flex-1 py-4 text-sm font-medium ${activeTab === t ? 'border-b-4 border-[#117ACA] text-[#117ACA]' : 'text-gray-500'}`}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === 'home' && (
          <>
            <div className="bg-white rounded-3xl p-6 mb-6 shadow">
              <div className="text-sm text-gray-500">Total Available</div>
              <div className="text-4xl font-bold mt-1">${totalBalance.toFixed(2)}</div>
            </div>

            {/* Card */}
            <div className="bg-gradient-to-br from-[#117ACA] to-[#005EB8] rounded-3xl p-6 text-white mb-8 shadow-xl">
              <div className="flex justify-between mb-12">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Chase_logo_2007.svg/512px-Chase_logo_2007.svg.png" alt="Chase" className="h-8 opacity-90" />
                <div>Visa Debit</div>
              </div>
              <div className="text-2xl tracking-[3px]">•••• •••• •••• 4242</div>
              <div className="mt-8 flex justify-between text-sm">
                <div>{user.name}</div>
                <div>12/28</div>
              </div>
            </div>

            {accounts.map(a => (
              <div key={a.id} className="bg-white rounded-2xl p-5 mb-4 flex justify-between shadow-sm">
                <div>
                  <div className="font-semibold">{a.type}</div>
                  <div className="text-sm text-gray-500">Available ${a.available}</div>
                </div>
                <div className="font-mono text-xl font-semibold">${a.balance.toFixed(2)}</div>
              </div>
            ))}
          </>
        )}

        {activeTab === 'activity' && (
          <div>
            <h2 className="font-semibold text-xl mb-6">Activity</h2>
            {transactions.map(t => (
              <div key={t.id} className="bg-white p-5 rounded-2xl mb-4 flex justify-between shadow-sm">
                <div>
                  <div>{t.merchant}</div>
                  <div className="text-sm text-gray-500">{t.date}</div>
                </div>
                <div className={t.amount < 0 ? 'text-red-600' : 'text-green-600'}>
                  {t.amount < 0 ? '' : '+'}${Math.abs(t.amount).toFixed(2)}
                </div>
              </div>
            ))}

            {/* Add fake trans */}
            <div className="mt-8 bg-white p-6 rounded-3xl">
              <input placeholder="Merchant" value={newTrans.merchant} onChange={e => setNewTrans({...newTrans, merchant: e.target.value})} className="w-full border rounded-xl px-4 py-3 mb-3" />
              <input placeholder="Amount" type="number" value={newTrans.amount} onChange={e => setNewTrans({...newTrans, amount: e.target.value})} className="w-full border rounded-xl px-4 py-3 mb-4" />
              <button onClick={addTransaction} className="w-full bg-[#117ACA] text-white py-4 rounded-2xl">Add Transaction</button>
            </div>
          </div>
        )}

        {activeTab === 'transfer' && (
          <div className="bg-white rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-8">Transfer</h2>
            <input type="number" id="amount" placeholder="Amount" className="w-full border rounded-2xl p-4 mb-6" />
            <button onClick={() => transfer(document.getElementById('amount').value)} className="w-full bg-[#117ACA] text-white py-5 rounded-2xl text-lg">Send Money</button>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white p-6 rounded-3xl space-y-4">
            <button className="w-full text-left py-4 border-b">Card Controls →</button>
            <button className="w-full text-left py-4 border-b">Notifications →</button>
            <button className="w-full text-left py-4" onClick={() => setIsLoggedIn(false)}>Log Out</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
