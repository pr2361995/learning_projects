import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  const setup = (currentPage = 1, totalItems = 50, itemsPerPage = 10, onPageChange = jest.fn()) => {
    render(
      <Pagination 
        totalItems={totalItems} 
        itemsPerPage={itemsPerPage} 
        currentPage={currentPage} 
        onPageChange={onPageChange} 
      />
    );
    return { onPageChange };
  };

  test('renders correct number of page buttons', () => {
    setup();
    const totalPages = Math.ceil(50 / 10);  
    const pageButtons = screen.getAllByRole('button', { name: /^\d+$/ });  
    expect(pageButtons).toHaveLength(totalPages);
  });

  test('highlights the current page', () => {
    setup(2);  
    const currentPageButton = screen.getByRole('button', { name: '2' });
    expect(currentPageButton).toHaveClass('activePage');
  });

  test('calls onPageChange when a page number is clicked', () => {
    const { onPageChange } = setup();
    const page3Button = screen.getByRole('button', { name: '3' });
    fireEvent.click(page3Button);
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  test('Previous button is disabled on the first page', () => {
    setup(1);
    const prevButton = screen.getByRole('button', { name: 'Previous' });
    expect(prevButton).toBeDisabled();
  });

  test('Next button is disabled on the last page', () => {
    setup(5);  
    const nextButton = screen.getByRole('button', { name: 'Next' });
    expect(nextButton).toBeDisabled();
  });

  test('navigates to the previous page when Previous is clicked', () => {
    const { onPageChange } = setup(3);
    const prevButton = screen.getByRole('button', { name: 'Previous' });
    fireEvent.click(prevButton);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  test('navigates to the next page when Next is clicked', () => {
    const { onPageChange } = setup(2);
    const nextButton = screen.getByRole('button', { name: 'Next' });
    fireEvent.click(nextButton);
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  test('does not call onPageChange if Previous clicked on first page', () => {
    const { onPageChange } = setup(1);
    const prevButton = screen.getByRole('button', { name: 'Previous' });
    fireEvent.click(prevButton);
    expect(onPageChange).not.toHaveBeenCalled();
  });

  test('does not call onPageChange if Next clicked on last page', () => {
    const { onPageChange } = setup(5);
    const nextButton = screen.getByRole('button', { name: 'Next' });
    fireEvent.click(nextButton);
    expect(onPageChange).not.toHaveBeenCalled();
  });
});
