import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Sidebar from '../Sidebar';
import { MyContext } from '../MyContext';

const mockContextValue = {
    allThreads: [
        { threadId: '1', title: 'Test Chat 1' },
        { threadId: '2', title: 'Test Chat 2' }
    ],
    setAllThreads: vi.fn(),
    currThreadId: '1',
    setNewChat: vi.fn(),
    setPrompt: vi.fn(),
    setReply: vi.fn(),
    setCurrThreadId: vi.fn(),
    setPrevChats: vi.fn()
};

describe('Sidebar Component', () => {
    beforeEach(() => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([])
            })
        );
    });

    it('renders new chat button', () => {
        render(
            <MyContext.Provider value={mockContextValue}>
                <Sidebar />
            </MyContext.Provider>
        );
        expect(screen.getByText(/New chat/i)).toBeInTheDocument();
    });

    it('renders chat history', () => {
        render(
            <MyContext.Provider value={mockContextValue}>
                <Sidebar />
            </MyContext.Provider>
        );
        expect(screen.getByText('Test Chat 1')).toBeInTheDocument();
        expect(screen.getByText('Test Chat 2')).toBeInTheDocument();
    });
});
