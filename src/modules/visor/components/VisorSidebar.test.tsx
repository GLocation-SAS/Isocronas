import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { VisorSidebar } from "./VisorSidebar";

describe("VisorSidebar Component - Collapse and Info feature", () => {
  const defaultProps = {
    profile: "ciudadano",
    transportMode: "walk",
    onTransportChange: jest.fn(),
    travelTime: 15,
    onTimeChange: jest.fn(),
    origin: "Plaza de Bolívar",
    onOriginChange: jest.fn(),
    destination: "",
    onDestinationChange: jest.fn(),
    onGenerate: jest.fn(),
    onReset: jest.fn(),
    isGenerating: false,
    lastQueryTime: 116,
    activeServices: [],
    onServicesChange: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders in expanded state by default with options and collapse button", () => {
    render(<VisorSidebar {...defaultProps} />);

    expect(screen.getByText("Parámetros de Isócrona")).toBeInTheDocument();
    expect(screen.getByText("1. ¿Dónde estás? (Origen A)")).toBeInTheDocument();
    expect(screen.getByText("GENERAR ISÓCRONA")).toBeInTheDocument();
  });

  it("collapses when clicking the collapse button", () => {
    render(<VisorSidebar {...defaultProps} />);

    const collapseBtn = screen.getByTitle("Colapsar menú");
    fireEvent.click(collapseBtn);

    // Options should be hidden and the uncollapse button should appear
    expect(screen.queryByText("1. ¿Dónde estás? (Origen A)")).not.toBeInTheDocument();
    expect(screen.getByTitle("Abrir / Descolapsar menú")).toBeInTheDocument();
    expect(screen.getByTitle("Ver resumen / Información")).toBeInTheDocument();
  });

  it("uncollapses when clicking the uncollapse (descolapsar) button", () => {
    render(<VisorSidebar {...defaultProps} />);

    // Collapse
    fireEvent.click(screen.getByTitle("Colapsar menú"));
    expect(screen.getByTitle("Abrir / Descolapsar menú")).toBeInTheDocument();

    // Uncollapse
    fireEvent.click(screen.getByTitle("Abrir / Descolapsar menú"));
    expect(screen.getByText("Parámetros de Isócrona")).toBeInTheDocument();
    expect(screen.getByText("1. ¿Dónde estás? (Origen A)")).toBeInTheDocument();
  });

  it("shows info popover when clicking the Info button", () => {
    render(<VisorSidebar {...defaultProps} />);

    // Click Info button in expanded mode
    const infoBtn = screen.getByTitle("Información rápida");
    fireEvent.click(infoBtn);

    expect(screen.getByText("MODO CIUDADANO")).toBeInTheDocument();
    expect(screen.getByText("La ciudad de los 15 minutos")).toBeInTheDocument();
  });
});
