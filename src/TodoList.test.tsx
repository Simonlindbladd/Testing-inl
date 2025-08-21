import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TodoList from "./TodoList";

describe("TodoList", () => {
  const mockTodos = [
    { id: 1, text: "Lära sig React", completed: false },
    { id: 2, text: "Skriva tester", completed: true }
  ];

  it("renders todos correctly", () => {
    render(
      <TodoList 
        todos={mockTodos} 
        onToggle={vi.fn()} 
        onDelete={vi.fn()} 
      />
    );
    
    expect(screen.getByText("Lära sig React")).toBeInTheDocument();
    expect(screen.getByText("Skriva tester")).toBeInTheDocument();
  });

  it("calls onToggle when checkbox is clicked", () => {
    const mockOnToggle = vi.fn();
    render(
      <TodoList 
        todos={mockTodos} 
        onToggle={mockOnToggle} 
        onDelete={vi.fn()} 
      />
    );
    
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);
    
    expect(mockOnToggle).toHaveBeenCalledWith(1);
  });

  it("calls onDelete when delete button is clicked", () => {
    const mockOnDelete = vi.fn();
    render(
      <TodoList 
        todos={mockTodos} 
        onToggle={vi.fn()} 
        onDelete={mockOnDelete} 
      />
    );
    
    const deleteButtons = screen.getAllByText("Ta bort");
    fireEvent.click(deleteButtons[0]);
    
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it("shows message when no todos", () => {
    render(
      <TodoList 
        todos={[]} 
        onToggle={vi.fn()} 
        onDelete={vi.fn()} 
      />
    );
    
    expect(screen.getByText("Inga todos att visa. Lägg till en ny!")).toBeInTheDocument();
  });
});