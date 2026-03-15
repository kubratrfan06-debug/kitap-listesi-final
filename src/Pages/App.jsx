import { useState } from 'react';

function App() {
  const [kitaplar, setKitaplar] = useState([]);
  const [input, setInput] = useState("");
  const [duzenlemeId, setDuzenlemeId] = useState(null);

  const ekleVeyaGuncelle = () => {
    if (!input.trim()) return;
    if (duzenlemeId) {
      setKitaplar(kitaplar.map(k => k.id === duzenlemeId ? { ...k, ad: input } : k));
      setDuzenlemeId(null);
    } else {
      setKitaplar([...kitaplar, { id: Date.now(), ad: input }]);
    }
    setInput("");
  };

  const duzenleModunaGec = (kitap) => {
    setInput(kitap.ad);
    setDuzenlemeId(kitap.id);
  };

  const sil = (id) => {
    setKitaplar(kitaplar.filter(k => k.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-100 p-10 flex flex-col items-center font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">Kitap Listem</h1>
        
        <div className="flex gap-2 mb-8">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow border-2 border-gray-200 rounded-lg p-3 outline-none focus:border-indigo-500"
            placeholder="Kitap adı..."
          />
          <button onClick={ekleVeyaGuncelle} className={`px-6 py-3 rounded-lg text-white font-bold ${duzenlemeId ? 'bg-orange-500' : 'bg-indigo-600'}`}>
            {duzenlemeId ? 'GÜNCELLE' : 'EKLE'}
          </button>
        </div>

        <ul className="space-y-3">
          {kitaplar.map((kitap) => (
            <li key={kitap.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-200">
              <span className="text-gray-800 font-medium">{kitap.ad}</span>
              <div className="flex gap-3">
                <button onClick={() => duzenleModunaGec(kitap)} className="text-amber-600 font-bold text-sm">DÜZENLE</button>
                <button onClick={() => sil(kitap.id)} className="text-red-500 font-bold text-sm">SİL</button>
              </div>
            </li>
          ))}
        </ul>
        {kitaplar.length === 0 && <p className="text-center text-gray-400 mt-5 italic">Liste boş.</p>}
      </div>
    </div>
  );
}

export default App;