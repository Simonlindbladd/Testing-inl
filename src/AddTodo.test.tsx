import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AddTodo from "./AddTodo";

describe("AddTodo", () => {
  it("renders input and button", () => {
    render(<AddTodo onAdd={vi.fn()} />);
    
    expect(screen.getByPlaceholderText("Lägg till en ny todo...")).toBeInTheDocument();
    expect(screen.getByText("Lägg till")).toBeInTheDocument();
  });

  it("calls onAdd with input value when form is submitted", () => {
    const mockOnAdd = vi.fn();
    render(<AddTodo onAdd={mockOnAdd} />);
    
    const input = screen.getByPlaceholderText("Lägg till en ny todo...");
    const button = screen.getByText("Lägg till");
    
    fireEvent.change(input, { target: { value: "Ny todo" } });
    fireEvent.click(button);
    
    expect(mockOnAdd).toHaveBeenCalledWith("Ny todo");
  });

  it("does not call onAdd when input is empty", () => {
    const mockOnAdd = vi.fn();
    render(<AddTodo onAdd={mockOnAdd} />);
    
    const button = screen.getByText("Lägg till");
    fireEvent.click(button);
    
    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  it("clears input after submission", () => {
    const mockOnAdd = vi.fn();
    render(<AddTodo onAdd={mockOnAdd} />);
    
    const input = screen.getByPlaceholderText("Lägg till en ny todo...");
    const button = screen.getByText("Lägg till");
    
    fireEvent.change(input, { target: { value: "Ny todo" } });
    fireEvent.click(button);
    
    expect(input).toHaveValue("");
  });
});