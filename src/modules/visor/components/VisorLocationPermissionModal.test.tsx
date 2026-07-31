import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { VisorLocationPermissionModal } from "./VisorLocationPermissionModal";

describe("VisorLocationPermissionModal Component", () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    onAllowAlways: jest.fn(),
    onAllowOnce: jest.fn(),
    onDeny: jest.fn(),
    domain: "isocronas.com",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly when isOpen is true", () => {
    render(<VisorLocationPermissionModal {...defaultProps} />);

    expect(screen.getByText("isocronas.com quiere")).toBeInTheDocument();
    expect(screen.getByText("Conocer tu ubicación")).toBeInTheDocument();
    expect(screen.getByText("Permitir mientras visito el sitio")).toBeInTheDocument();
    expect(screen.getByText("Permitir esta vez")).toBeInTheDocument();
    expect(screen.getByText("No permitir nunca")).toBeInTheDocument();
  });

  it("should not render anything when isOpen is false", () => {
    const { container } = render(
      <VisorLocationPermissionModal {...defaultProps} isOpen={false} />
    );

    expect(container.firstChild).toBeNull();
  });

  it("should call onAllowAlways when 'Permitir mientras visito el sitio' is clicked", () => {
    render(<VisorLocationPermissionModal {...defaultProps} />);

    fireEvent.click(screen.getByText("Permitir mientras visito el sitio"));
    expect(defaultProps.onAllowAlways).toHaveBeenCalledTimes(1);
  });

  it("should call onAllowOnce when 'Permitir esta vez' is clicked", () => {
    render(<VisorLocationPermissionModal {...defaultProps} />);

    fireEvent.click(screen.getByText("Permitir esta vez"));
    expect(defaultProps.onAllowOnce).toHaveBeenCalledTimes(1);
  });

  it("should call onDeny when 'No permitir nunca' is clicked", () => {
    render(<VisorLocationPermissionModal {...defaultProps} />);

    fireEvent.click(screen.getByText("No permitir nunca"));
    expect(defaultProps.onDeny).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when close button is clicked", () => {
    render(<VisorLocationPermissionModal {...defaultProps} />);

    const closeBtn = screen.getByRole("button", { name: /cerrar/i });
    fireEvent.click(closeBtn);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });
});
