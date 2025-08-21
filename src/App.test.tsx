import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App Integration", () => {
  it("adds and removes todos correctly", () => {
    render(<App />);
    
    // Lägg till en todo
    const input = screen.getByPlaceholderText("Lägg till en ny todo...");
    const addButton = screen.getByText("Lägg till");
    
    fireEvent.change(input, { target: { value: "Testa integration" } });
    fireEvent.click(addButton);
    
    // Verifiera att todo visas
    expect(screen.getByText("Testa integration")).toBeInTheDocument();
    
    // Ta bort todo
    const deleteButton = screen.getByText("Ta bort");
    fireEvent.click(deleteButton);
    
    // Verifiera att todo är borta
    expect(screen.queryByText("Testa integration")).not.toBeInTheDocument();
  });

  it("toggles todo completion status", () => {
    render(<App />);
    
    // Lägg till en todo
    const input = screen.getByPlaceholderText("Lägg till en ny todo...");
    const addButton = screen.getByText("Lägg till");
    
    fireEvent.change(input, { target: { value: "Testa att markera klar" } });
    fireEvent.click(addButton);
    
    // Markera som klar
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    
    // Verifiera att den är genomförd (genomstruken)
    const todo = screen.getByText("Testa att markera klar");
    expect(todo).toHaveStyle("text-decoration: line-through");
    
    // Markera som oklar igen
    fireEvent.click(checkbox);
    expect(todo).not.toHaveStyle("text-decoration: line-through");
  });
});