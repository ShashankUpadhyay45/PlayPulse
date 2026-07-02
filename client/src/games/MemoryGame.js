import React, { useState, useEffect } from "react";

const baseCards = ["🍎","🍌","🍇","🍒","🍉","🍍"];

function shuffledPairs(){
  const arr = [...baseCards, ...baseCards].sort(()=>Math.random()-0.5);
  return arr.map((v,i)=>({id:i, val:v, flipped:false, matched:false}));
}

export default function MemoryGame(){
  const [cards, setCards] = useState(shuffledPairs);
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [moves, setMoves] = useState(0);
  const [best, setBest] = useState(()=>parseInt(localStorage.getItem("memory_best")||"0",10));

  useEffect(()=>{
    if (first && second){
      if (first.val === second.val){
        setCards(prev => prev.map(c => (c.val === first.val ? {...c, matched:true} : c)));
        setFirst(null); setSecond(null);
      } else {
        setTimeout(()=> {
          setCards(prev => prev.map(c => c.id===first.id || c.id===second.id ? {...c, flipped:false} : c));
          setFirst(null); setSecond(null);
        }, 700);
      }
      setMoves(m => m+1);
    }
  }, [first, second]);

  useEffect(()=>{
    if (cards.every(c=>c.matched)){
      const prevBest = parseInt(localStorage.getItem("memory_best")||"0",10);
      if (!prevBest || moves < prevBest || prevBest===0){
        localStorage.setItem("memory_best", moves.toString());
        setBest(moves);
      }
    }
  }, [cards, moves]);

  const flip = c => {
    if (c.flipped || c.matched || second) return;
    setCards(prev => prev.map(p => p.id===c.id ? {...p, flipped:true} : p));
    if (!first) setFirst(c);
    else if (!second) setSecond(c);
  };

  const reset = () => {
    setCards(shuffledPairs());
    setFirst(null); setSecond(null); setMoves(0);
  };

  return (
    <div className="page game-play">
      <h2>Memory Match</h2>
      <div className="muted">Best (fewest moves): {best || "—"}</div>
      <div className="memory-grid">
        {cards.map(c=>(
          <button key={c.id} className={`mem-card ${c.flipped||c.matched ? "open":"closed"}`} onClick={()=>flip(c)}>
            <span className="card-face">{c.flipped || c.matched ? c.val : "?"}</span>
          </button>
        ))}
      </div>
      <div className="controls">
        <div>Moves: {moves}</div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
