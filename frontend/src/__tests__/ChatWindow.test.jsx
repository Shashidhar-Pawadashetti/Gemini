import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act } from 'react';
import ChatWindow from '../ChatWindow';
import { MyContext } from '../MyContext';

const mockContextValue = {
    prompt: '',
    setPrompt: vi.fn(),
    reply: null,
    setReply: vi.fn(),
    currThreadId: '123',
    setCurrThreadId: vi.fn(),
    prevChats: [],
    setPrevChats: vi.fn(),
    newChat: true,
    setNewChat: vi.fn()
};

describe('ChatWindow Component', () => {
    beforeEach(() => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ csrfToken: 'test-token' })
            })
        );
    });

    it('renders greeting text for new chat', async () => {
        await act(async () => {
            render(
                <MyContext.Provider value={mockContextValue}>
                    <ChatWindow />
                </MyContext.Provider>
            );
        });
        await waitFor(() => {
            expect(screen.getByText(/Hello Shashidhar/i)).toBeInTheDocument();
        });
    });

    it('renders textarea input', async () => {
        await act(async () => {
            render(
                <MyContext.Provider value={mockContextValue}>
                    <ChatWindow />
                </MyContext.Provider>
            );
        });
        await waitFor(() => {
            expect(screen.getByPlaceholderText(/Ask Gemini/i)).toBeInTheDocument();
        });
    });
});
