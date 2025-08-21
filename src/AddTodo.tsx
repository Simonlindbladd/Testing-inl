import { useState } from 'react';

interface AddTodoProps {
  onAdd: (text: string) => void;
}

function AddTodo({ onAdd }: AddTodoProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', marginBottom: '20px' }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Lägg till en ny todo..."
        style={{
          flex: 1,
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '4px 0 0 4px'
        }}
      />
      <button
        type="submit"
        style={{
          padding: '10px 15px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '0 4px 4px 0',
          cursor: 'pointer'
        }}
      >
        Lägg till
      </button>
    </form>
  );
}

export default AddTodo;